package com.generation.connect.service.implementation;

import com.generation.connect.auth.AuthUtils;
import com.generation.connect.dto.FamilyTreeConverter;
import com.generation.connect.dto.FamilyTreeDTO;
import com.generation.connect.dto.auth.FamilyTreeAccessLevelEnum;
import com.generation.connect.dto.auth.UserAccessRoleEnum;
import com.generation.connect.entity.*;
import com.generation.connect.exception.FamilyTreeNotFoundException;
import com.generation.connect.exception.UnauthorizedAccessException;
import com.generation.connect.repository.FamilyTreeRepository;
import com.generation.connect.repository.ManageUserAccessRepository;
import com.generation.connect.repository.UserRepository;
import com.generation.connect.repository.neo4j.PersonRepository;
import com.generation.connect.service.FamilyTreeAuditEventService;
import com.generation.connect.service.FamilyTreeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static com.generation.connect.service.FamilyTreeAuditEventService.FAMILY_TREE;

@Service
public class FamilyTreeServiceImpl implements FamilyTreeService {


    private final Logger logger = LoggerFactory.getLogger(FamilyTreeServiceImpl.class);

    @Autowired
    private FamilyTreeRepository familyTreeRepository;

    @Autowired
    private ManageUserAccessRepository manageUserAccessRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private FamilyTreeJpaService familyTreeJpaService;

    @Autowired
    private ManageUserAccessServiceImpl manageUserAccessService;

    @Autowired
    private AuthUtils authUtils;

    @Autowired
    private FamilyTreeAuditEventService familyTreeAuditEventService;

    @Override
    public FamilyTreeDTO createFamilyTree(FamilyTreeDTO familyTreeDTO) {
        try {
            boolean isCreate = Objects.isNull(familyTreeDTO.getFamilyTreeId());
            UserEntity userEntity = userRepository.findUserByEmailId(familyTreeDTO.getMemberUserId());

            if (userEntity == null) {
                throw new UnauthorizedAccessException("Unauthenticated member trying to create familyTree..");
            }

            FamilyTreeEntity saved = familyTreeRepository.save(FamilyTreeConverter.getEntity(familyTreeDTO));

            UserAccessManagementEmbeddedId id = new UserAccessManagementEmbeddedId();
            id.setFamilyTreeId(saved.getFamilyTreeId());
            id.setMemberUserId(saved.getCreatedBy());

            UserAccessManagementEntity entity = new UserAccessManagementEntity();
            entity.setId(id);
            entity.setFamilyTree(saved);
            entity.setUser(userEntity);
            entity.setUserAccessRole(UserAccessRoleEnum.OWNER);
            entity.setUserAddedBy(saved.getCreatedBy());

            manageUserAccessRepository.save(entity);

            familyTreeAuditEventService.addEvent(saved.getFamilyTreeId(), FAMILY_TREE,
                    isCreate ? ActionType.ADD : ActionType.UPDATE,
                    saved.getFamilyTreeId().toString(), saved.getFamilyTreeName());

            return FamilyTreeConverter.getDto(saved);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating family tree", e);
        }
    }

    @Override
    public List<FamilyTreeDTO> getAllFamilyTreeByUserIdIncludingPublic(String userId) {
        try {
            List<FamilyTreeEntity> personalTrees = familyTreeRepository.findAllFamilyTreeByCreatedBy(userId);

            List<FamilyTreeEntity> publicTrees = familyTreeRepository.findAllByFamilyTreeAccessLevel(FamilyTreeAccessLevelEnum.PUBLIC);

            List<UserAccessManagementEntity> contributorAccessList = manageUserAccessRepository.findAllById_MemberUserId(userId);

            List<FamilyTreeEntity> contributorPrivateTrees = contributorAccessList.stream()
                    .map(UserAccessManagementEntity::getFamilyTree)
                    .filter(tree -> tree.getFamilyTreeAccessLevel() == FamilyTreeAccessLevelEnum.PRIVATE)
                    .collect(Collectors.toList());

            Set<FamilyTreeEntity> combinedTrees = new HashSet<>(personalTrees);
            combinedTrees.addAll(publicTrees);
            combinedTrees.addAll(contributorPrivateTrees);

            if (combinedTrees.isEmpty()) {
                throw new FamilyTreeNotFoundException("No Family trees found for user ID: " + userId);
            }

            return combinedTrees.stream()
                    .map(tree -> new FamilyTreeDTO(
                            tree.getFamilyTreeId(),
                            tree.getFamilyTreeName(),
                            tree.getCreatedBy(),
                            tree.getFamilyTreeDescription(),
                            tree.getFamilyTreeAccessLevel()))
                    .collect(Collectors.toList());
        } catch (FamilyTreeNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error retrieving family trees", e);
        }
    }

    @Override
    public void deleteFamilyTree(String userId, Long familyTreeId) {
        FamilyTreeEntity tree = familyTreeRepository.findById(familyTreeId)
                .orElseThrow(() -> new FamilyTreeNotFoundException("Family tree not found"));

        if (!tree.getCreatedBy().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this tree.");
        }

        personRepository.deleteAllByFamilyTreeId(familyTreeId);
        familyTreeJpaService.deleteJpaResources(familyTreeId);
        familyTreeAuditEventService.addEvent(tree.getFamilyTreeId(), FAMILY_TREE,
                ActionType.DELETE,
                tree.getFamilyTreeId().toString(), tree.getFamilyTreeName());
    }

    @Override
    public FamilyTreeDTO getFamilyTreeByUserIdAndFamilyTreeId(String userId, Long familyTreeId) {
        try {
            FamilyTreeEntity familyTrees = familyTreeRepository.findFamilyTreeByCreatedByAndFamilyTreeId(userId, familyTreeId);
            if (familyTrees == null) {
                throw new FamilyTreeNotFoundException("No Family tree found for user ID " + userId + " and family tree Id: " + familyTreeId);
            }
            return new FamilyTreeDTO(familyTrees.getFamilyTreeId(), familyTrees.getFamilyTreeName(), familyTrees.getCreatedBy(), familyTrees.getFamilyTreeDescription(), familyTrees.getFamilyTreeAccessLevel());
        } catch (FamilyTreeNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error retrieving family trees", e);
        }
    }
}
