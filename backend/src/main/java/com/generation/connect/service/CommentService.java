package com.generation.connect.service;

import com.generation.connect.dto.CommentDTO;

import java.util.List;

public interface CommentService {

    List<CommentDTO> getCommentsByPostId(Long postId);

    CommentDTO getCommentById(Long commentId);

    CommentDTO createComment(CommentDTO commentDTO, String userId, Long familyTreeId);

    CommentDTO updateComment(Long commentId, CommentDTO commentDTO, String userId, Long familyTreeId);

    boolean deleteComment(Long commentId, String userId, Long familyTreeId);
}
