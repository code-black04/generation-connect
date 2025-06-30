package com.generation.connect.mapper;

import com.generation.connect.dto.PostDTO;
import com.generation.connect.entity.PostEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PostConverter {

    public PostDTO toDto(PostEntity postEntity) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(postEntity.getId());
        postDTO.setPersonId(postEntity.getPersonId());
        postDTO.setFamilyTreeId(postEntity.getFamilyTreeId());
        postDTO.setPostContent(postEntity.getPostContent());
        postDTO.setCreatedBy(postEntity.getCreatedBy());
        postDTO.setCreatedDate(postEntity.getCreatedDate());
        postDTO.setLastModifiedBy(postEntity.getLastModifiedBy());
        postDTO.setLastModifiedDate(postEntity.getLastModifiedDate());
        return postDTO;
    }

    public PostEntity toEntity(PostDTO postDTO) {
        PostEntity postEntity = new PostEntity();
        postEntity.setId(postDTO.getId());
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
        return postEntity;
    }

    public List<PostDTO> toDtoList(List<PostEntity> postEntities) {
        return postEntities.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
