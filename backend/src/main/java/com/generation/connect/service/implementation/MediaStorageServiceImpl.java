package com.generation.connect.service.implementation;

import com.generation.connect.dto.UploadedMediaDTO;
import com.generation.connect.entity.UploadedMediaEntity;
import com.generation.connect.repository.UploadedMediaRepository;
import com.generation.connect.service.MediaStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MediaStorageServiceImpl implements MediaStorageService {

    private final UploadedMediaRepository mediaRepository;
    @Value("${file.upload-dir}")
    private String uploadDir;

    public void storeFiles(String mediaTypeId, String description, List<MultipartFile> files) throws IOException {
        Path destination = Paths.get(uploadDir, mediaTypeId);
        try {
            Files.createDirectories(destination);
            for (MultipartFile file : files) {
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path filePath = destination.resolve(fileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                UploadedMediaEntity media = new UploadedMediaEntity();
                media.setFileName(fileName);
                media.setFileType(file.getContentType());
                media.setDescription(description);
                media.setFilePath("/media/files/" + mediaTypeId + "/" + fileName);
                media.setMediaTypeId(mediaTypeId);
                media.setUploadedAt(LocalDateTime.now());
                mediaRepository.save(media);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error storing files", e);
        }
    }

    public boolean deleteFileById(Long id) {
        return mediaRepository.findById(id).map(media -> {
            try {
                Path filePath = Paths.get(uploadDir).resolve(Paths.get(media.getFilePath()).getFileName().toString());
                Files.deleteIfExists(filePath);
                mediaRepository.deleteById(id);
                return true;
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete file", e);
            }
        }).orElse(false);
    }

    public List<UploadedMediaDTO> getFilesByMediaTypeId(String mediaTypeId) {
        return mediaRepository.findByMediaTypeId(mediaTypeId).stream()
                .map(media -> {
                    File file = new File(uploadDir + "/" + media.getFilePath().replace("/media/files/", ""));
                    long size = file.exists() ? file.length() : 0;
                    return new UploadedMediaDTO(
                            media.getId(),
                            media.getFileName(),
                            media.getFileType(),
                            media.getFilePath(),
                            size,
                            "UploaderName",
                            media.getUploadedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                            media.getDescription()
                    );
                }).collect(Collectors.toList());
    }
}