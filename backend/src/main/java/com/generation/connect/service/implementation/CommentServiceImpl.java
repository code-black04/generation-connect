package com.generation.connect.service.implementation;

import com.generation.connect.dto.CommentDTO;
import com.generation.connect.dto.auth.UserAccessRoleEnum;
import com.generation.connect.entity.CommentEntity;
import com.generation.connect.mapper.CommentConverter;
import com.generation.connect.repository.CommentRepository;
import com.generation.connect.repository.ManageUserAccessRepository;
import com.generation.connect.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentConverter commentConverter;

    @Autowired
    private ManageUserAccessRepository manageUserAccessRepository;

    @Autowired
    private ManageUserAccessServiceImpl manageUserAccessService;

    public List<CommentDTO> getCommentsByPostId(Long postId) {
        List<CommentEntity> commentEntities = commentRepository.findAllByPostEntity_Id(postId);
        return commentEntities.stream()
                .map(commentConverter::toDto)
                .collect(Collectors.toList());
    }

    public CommentDTO getCommentById(Long commentId) {
        CommentEntity commentEntity = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        return commentConverter.toDto(commentEntity);
    }

    public CommentDTO createComment(CommentDTO commentDTO, String userId, Long familyTreeId) {

        manageUserAccessService.validateUserRole(familyTreeId, userId, List.of(UserAccessRoleEnum.OWNER, UserAccessRoleEnum.CONTRIBUTOR));

        CommentEntity commentEntity = commentConverter.toEntity(commentDTO);
        CommentEntity savedCommentEntity = commentRepository.save(commentEntity);
        return commentConverter.toDto(savedCommentEntity);
    }

    public CommentDTO updateComment(Long commentId, CommentDTO commentDTO, String userId, Long familyTreeId) {

        manageUserAccessService.validateUserRole(familyTreeId, userId, List.of(UserAccessRoleEnum.OWNER, UserAccessRoleEnum.CONTRIBUTOR));

        CommentEntity commentEntity = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        commentEntity.setCommentContent(commentDTO.getCommentContent());
        commentEntity.setCreatedBy(commentDTO.getCreatedBy());
        commentEntity.setCreatedDate(commentDTO.getCreatedDate());
        commentEntity.setLastModifiedBy(commentDTO.getLastModifiedBy());
        commentEntity.setLastModifiedDate(commentDTO.getLastModifiedDate());

        CommentEntity updatedCommentEntity = commentRepository.save(commentEntity);
        return commentConverter.toDto(updatedCommentEntity);
    }

    public boolean deleteComment(Long commentId, String userId, Long familyTreeId) {

        manageUserAccessService.validateUserRole(familyTreeId, userId, List.of(UserAccessRoleEnum.OWNER, UserAccessRoleEnum.CONTRIBUTOR));

        if (!commentRepository.existsById(commentId)) {
            log.warn("Comment with ID {} not found.", commentId);
            return false;
        }
        commentRepository.deleteById(commentId);
        return true;
    }
}
