package com.generation.connect.service.implementation;

import com.generation.connect.dto.PostDTO;
import com.generation.connect.dto.auth.UserAccessRoleEnum;
import com.generation.connect.entity.ActionType;
import com.generation.connect.entity.PostEntity;
import com.generation.connect.mapper.PostConverter;
import com.generation.connect.repository.ManageUserAccessRepository;
import com.generation.connect.repository.PostRepository;
import com.generation.connect.service.FamilyTreeAuditEventService;
import com.generation.connect.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static com.generation.connect.service.FamilyTreeAuditEventService.FAMILY_PROFILE_POST;
import static com.generation.connect.service.FamilyTreeAuditEventService.USER_PROFILE_POST;

@Slf4j
@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostConverter postConverter;

    @Autowired
    private ManageUserAccessRepository manageUserAccessRepository;

    @Autowired
    private ManageUserAccessServiceImpl manageUserAccessService;

    @Autowired
    private FamilyTreeAuditEventService familyTreeAuditEventService;

    public PostDTO getPostById(Long postId) {
        PostEntity postEntity = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return postConverter.toDto(postEntity);
    }

    public PostDTO createPost(PostDTO postDTO, String userId) {

        manageUserAccessService.validateUserRole(postDTO.getFamilyTreeId(), userId, List.of(UserAccessRoleEnum.OWNER, UserAccessRoleEnum.CONTRIBUTOR));

        PostEntity postEntity = postConverter.toEntity(postDTO);
        PostEntity savedPostEntity = postRepository.save(postEntity);
        familyTreeAuditEventService.addEvent(savedPostEntity.getFamilyTreeId(),
                Objects.nonNull(postDTO.getPersonId()) ? USER_PROFILE_POST : FAMILY_PROFILE_POST,
                ActionType.ADD,
                postEntity.getId().toString(),
                null);
        return postConverter.toDto(savedPostEntity);
    }

    public PostDTO updatePost(Long postId, PostDTO postDTO, String userId) {

        manageUserAccessService.validateUserRole(postDTO.getFamilyTreeId(), userId, List.of(UserAccessRoleEnum.OWNER, UserAccessRoleEnum.CONTRIBUTOR));

        PostEntity postEntity = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        if(postDTO.isUserProfilePost()) {
            postEntity.setPersonId(postDTO.getPersonId());
        } else {
            postEntity.setFamilyTreeId(postDTO.getFamilyTreeId());
        }
        postEntity.setPostContent(postDTO.getPostContent());
        postEntity.setCreatedBy(postDTO.getCreatedBy());
        postEntity.setCreatedDate(postDTO.getCreatedDate());
        postEntity.setLastModifiedBy(postDTO.getLastModifiedBy());
        postEntity.setLastModifiedDate(postDTO.getLastModifiedDate());

        PostEntity updatedPostEntity = postRepository.save(postEntity);
        familyTreeAuditEventService.addEvent(postEntity.getFamilyTreeId(),
                Objects.nonNull(postDTO.getPersonId()) ? USER_PROFILE_POST : FAMILY_PROFILE_POST,
                ActionType.UPDATE,
                postEntity.getId().toString(),
                null);
        return postConverter.toDto(updatedPostEntity);
    }

    public boolean deletePost(Long postId, String userId, Long familyTreeId) {
        manageUserAccessService.validateUserRole(familyTreeId, userId, List.of(UserAccessRoleEnum.OWNER, UserAccessRoleEnum.CONTRIBUTOR));

        if (!postRepository.existsById(postId)) {
            log.warn("Post with ID {} not found.", postId);
            return false;
        }
        PostEntity postEntity = postRepository.findById(postId).get();
        postRepository.deleteById(postId);
        familyTreeAuditEventService.addEvent(postEntity.getFamilyTreeId(),
                Objects.nonNull(postEntity.getPersonId()) ? USER_PROFILE_POST : FAMILY_PROFILE_POST,
                ActionType.DELETE,
                postEntity.getId().toString(),
                null);
        return true;
    }

    public List<PostDTO> getPostsByPersonId(String personId) {
        List<PostEntity> postEntities = postRepository.findByPersonIdOrderByCreatedDateDesc(personId);
        return postConverter.toDtoList(postEntities);
    }

    public List<PostDTO> getPostsByFamilyTreeId(Long familyTreeId) {
        List<PostEntity> postEntities = postRepository.findByFamilyTreeIdOrderByCreatedDateDesc(familyTreeId);
        return postConverter.toDtoList(postEntities);
    }
}
