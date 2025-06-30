package com.generation.connect.mapper;

import com.generation.connect.dto.CommentDTO;
import com.generation.connect.entity.CommentEntity;
import com.generation.connect.entity.PostEntity;
import org.springframework.stereotype.Component;

@Component
public class CommentConverter {

    public CommentDTO toDto(CommentEntity commentEntity) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(commentEntity.getId());
        commentDTO.setPostId(commentEntity.getPostEntity().getId());
        commentDTO.setCommentContent(commentEntity.getCommentContent());
        commentDTO.setCreatedBy(commentEntity.getCreatedBy());
        commentDTO.setCreatedDate(commentEntity.getCreatedDate());
        commentDTO.setLastModifiedBy(commentEntity.getLastModifiedBy());
        commentDTO.setLastModifiedDate(commentEntity.getLastModifiedDate());
        return commentDTO;
    }

    public CommentEntity toEntity(CommentDTO commentDTO) {
        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setId(commentDTO.getId());
        PostEntity postEntity = new PostEntity();
        postEntity.setId(commentDTO.getPostId());
        commentEntity.setPostEntity(postEntity);
        commentEntity.setCommentContent(commentDTO.getCommentContent());
        commentEntity.setCreatedBy(commentDTO.getCreatedBy());
        commentEntity.setCreatedDate(commentDTO.getCreatedDate());
        commentEntity.setLastModifiedBy(commentDTO.getLastModifiedBy());
        commentEntity.setLastModifiedDate(commentDTO.getLastModifiedDate());
        return commentEntity;
    }
}
