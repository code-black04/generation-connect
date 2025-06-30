package com.generation.connect.service;

import com.generation.connect.dto.PostDTO;

import java.util.List;

public interface PostService {

    PostDTO getPostById(Long postId);

    PostDTO createPost(PostDTO postDTO, String userId);

    PostDTO updatePost(Long postId, PostDTO postDTO, String userId);

    boolean deletePost(Long postId, String userId, Long familyTreeId);

    List<PostDTO> getPostsByPersonId(String personId);

    List<PostDTO> getPostsByFamilyTreeId(Long familyTreeId);
}
