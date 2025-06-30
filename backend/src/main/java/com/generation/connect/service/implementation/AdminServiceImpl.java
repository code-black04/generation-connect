package com.generation.connect.service.implementation;

import com.generation.connect.dto.FamilyTreeDTO;
import com.generation.connect.dto.auth.FamilyTreeAccessLevelEnum;
import com.generation.connect.dto.auth.UserAccessRoleEnum;
import com.generation.connect.repository.*;
import com.generation.connect.service.AdminService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final FamilyTreeRepository familyTreeRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final FamilyTreeInviteRepository familyTreeInviteRepository;
    private final ManageUserAccessRepository manageUserAccessRepository;

    public AdminServiceImpl(UserRepository userRepository, FamilyTreeRepository familyTreeRepository, PostRepository postRepository, CommentRepository commentRepository, FamilyTreeInviteRepository familyTreeInviteRepository, ManageUserAccessRepository manageUserAccessRepository) {
        this.userRepository = userRepository;
        this.familyTreeRepository = familyTreeRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.familyTreeInviteRepository = familyTreeInviteRepository;
        this.manageUserAccessRepository = manageUserAccessRepository;
    }

    @Override
    public Map<String, Object> getAdminMetrics() {
        Map<String, Object> metrics = new HashMap<>();

        long totalFamilyTrees = familyTreeRepository.count();
        long totalPosts = postRepository.count();
        long totalComments = commentRepository.count();

        metrics.put("totalNonAdminUsers", userRepository.countByIsGenerationConnectAdminFalse());

        metrics.put("appAdmins", userRepository.countByIsGenerationConnectAdminTrue());

        metrics.put("totalFamilyTrees", totalFamilyTrees);

        metrics.put("publicFamilyTrees", familyTreeRepository.countByFamilyTreeAccessLevel(FamilyTreeAccessLevelEnum.PUBLIC));

        metrics.put("privateFamilyTrees", familyTreeRepository.countByFamilyTreeAccessLevel(FamilyTreeAccessLevelEnum.PRIVATE));

        metrics.put("totalPosts", totalPosts);

        metrics.put("totalComments", commentRepository.count());

        metrics.put("pendingInvites", familyTreeInviteRepository.countByAcceptedFalse());

        Set<String> distinctFamilyTreeOwners = manageUserAccessRepository.findByUserAccessRole(UserAccessRoleEnum.OWNER)
                .stream()
                .map(entity -> entity.getId().getMemberUserId())
                .collect(Collectors.toSet());

        metrics.put("familyTreeOwners", distinctFamilyTreeOwners.size());

        metrics.put("activeUsersLast30Days", userRepository.countByLastSignedInAtAfter(LocalDateTime.now().minusDays(30)) - 1);

        metrics.put("recentFamilyTreesLast30Days", familyTreeRepository.countByCreatedDateAfter(LocalDateTime.now().minusDays(30)));

        metrics.put("averagePostsPerTree", totalFamilyTrees > 0 ? (double) totalPosts / totalFamilyTrees : 0.0);

        metrics.put("averageCommentsPerTree", totalFamilyTrees > 0 ? (double) totalComments / totalFamilyTrees : 0.0);

        return metrics;
    }

    @Override
    public List<FamilyTreeDTO> getAllFamilyTrees() {
        return this.familyTreeRepository.findAll(Sort.by("familyTreeId")).stream()
                .map(tree -> new FamilyTreeDTO(
                        tree.getFamilyTreeId(),
                        tree.getFamilyTreeName(),
                        tree.getCreatedBy(),
                        tree.getFamilyTreeDescription(),
                        tree.getFamilyTreeAccessLevel()))
                .collect(Collectors.toList());
    }
}
