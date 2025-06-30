package com.generation.connect.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "uploaded_media",
        indexes = {
                @Index(name = "idx_uploaded_media_type_id", columnList = "media_type_id")
        }
)
public class UploadedMediaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileName;
    private String fileType;
    private String filePath;
    private String mediaTypeId;
    private LocalDateTime uploadedAt;
    @Column(length = 1000)
    private String description;
}
