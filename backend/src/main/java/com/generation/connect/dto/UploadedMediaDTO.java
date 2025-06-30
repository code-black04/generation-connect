package com.generation.connect.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadedMediaDTO {
    private Long id;
    private String fileName;
    private String fileType;
    private String fileUrl;
    private long fileSize;
    private String uploadedBy;
    private String uploadedAtFormatted;
    private String description;

    public UploadedMediaDTO(Long id, String fileName, String fileType, String fileUrl,
                            long fileSize, String uploadedBy, String uploadedAtFormatted,
                            String description) {
        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileUrl = fileUrl;
        this.fileSize = fileSize;
        this.uploadedBy = uploadedBy;
        this.uploadedAtFormatted = uploadedAtFormatted;
        this.description = description;
    }

}