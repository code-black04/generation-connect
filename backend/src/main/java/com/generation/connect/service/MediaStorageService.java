package com.generation.connect.service;

import com.generation.connect.dto.UploadedMediaDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MediaStorageService {
    void storeFiles(String mediaTypeId, String description, List<MultipartFile> files) throws IOException;

    boolean deleteFileById(Long id);

    List<UploadedMediaDTO> getFilesByMediaTypeId(String mediaTypeId);
}