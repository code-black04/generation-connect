package com.generation.connect.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class PostDTO {
    private Long id;
    private String personId;
    private Long familyTreeId;
    private String postContent;
    private boolean isUserProfilePost;
    private String createdBy;
    private LocalDateTime createdDate;
    private String lastModifiedBy;
    private LocalDateTime lastModifiedDate;

}
