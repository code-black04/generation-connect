package com.generation.connect.controller;

import com.generation.connect.auth.AuthUtils;
import com.generation.connect.dto.CommentDTO;
import com.generation.connect.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private AuthUtils authUtils;

    @GetMapping("/{id}")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable Long id) {
        Optional<CommentDTO> comment = Optional.ofNullable(commentService.getCommentById(id));
        return comment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/post/{postId}")
    public List<CommentDTO> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @PostMapping(path = "{familyTreeId}")
    public ResponseEntity<CommentDTO> createComment(
            @RequestBody CommentDTO commentDTO,
            @PathVariable Long familyTreeId) {
        String userId = authUtils.getCurrentUserId();
        CommentDTO createdComment = commentService.createComment(commentDTO, userId, familyTreeId);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @PutMapping("/{familyTreeId}/{id}")
    public ResponseEntity<CommentDTO> updateComment(
            @PathVariable Long id,
            @RequestBody CommentDTO commentDTO,
            @PathVariable Long familyTreeId) {
        String userId = authUtils.getCurrentUserId();
        CommentDTO updatedComment = commentService.updateComment(id, commentDTO, userId, familyTreeId);
        return updatedComment != null ? ResponseEntity.ok(updatedComment) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{familyTreeId}/{id}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long id,
            @PathVariable Long familyTreeId) {
        String userId = authUtils.getCurrentUserId();
        return commentService.deleteComment(id, userId, familyTreeId) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
