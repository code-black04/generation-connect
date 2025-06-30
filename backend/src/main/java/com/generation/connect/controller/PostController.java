package com.generation.connect.controller;

import com.generation.connect.auth.AuthUtils;
import com.generation.connect.dto.PostDTO;
import com.generation.connect.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private AuthUtils authUtils;

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable Long id) {
        Optional<PostDTO> post = Optional.ofNullable(postService.getPostById(id));
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(path = "/")
    public ResponseEntity<PostDTO> createPost(
            @RequestBody PostDTO postDto) {
        String userId = authUtils.getCurrentUserId();
        postDto.setCreatedBy(userId);
        PostDTO createdPost = postService.createPost(postDto, userId);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(
            @PathVariable Long id,
            @RequestBody PostDTO postDto) {
        String userId = authUtils.getCurrentUserId();
        postDto.setLastModifiedBy(userId);
        PostDTO updatedPost = postService.updatePost(id, postDto, userId);
        return updatedPost != null ? ResponseEntity.ok(updatedPost) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{familyTreeId}/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long id,
            @PathVariable Long familyTreeId) {
        String userId = authUtils.getCurrentUserId();
        return postService.deletePost(id, userId, familyTreeId) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/person/{personId}")
    public ResponseEntity<List<PostDTO>> getPostsByPersonId(@PathVariable String personId) {
        List<PostDTO> posts = postService.getPostsByPersonId(personId);
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/family/{familyTreeId}")
    public ResponseEntity<List<PostDTO>> getPostsByFamilyTreeId(@PathVariable Long
                                                                        familyTreeId) {
        List<PostDTO> posts = postService.getPostsByFamilyTreeId(familyTreeId);
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }

}
