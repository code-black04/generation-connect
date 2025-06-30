package com.generation.connect.controller;

import com.generation.connect.dto.UploadedMediaDTO;
import com.generation.connect.service.MediaStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class CommentMediaUploadController {

    private final MediaStorageService mediaStorageService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFiles(
            @RequestParam(value = "mediaTypeId", required = true) String mediaTypeId,
            @RequestParam(value = "description", required = false) String description,
            @RequestPart("files") List<MultipartFile> files
    ) throws IOException {
        mediaStorageService.storeFiles(mediaTypeId, description, files);
        return ResponseEntity.ok("Files uploaded successfully.");
    }

    @GetMapping("/files/{folder}/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String folder, @PathVariable String filename) throws MalformedURLException {
        Path filePath = Paths.get("/app/uploads").resolve(folder).resolve(filename);
        Resource resource = new UrlResource(filePath.toUri());
        return resource.exists()
                ? ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/files/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable Long id) {
        return mediaStorageService.deleteFileById(id)
                ? ResponseEntity.ok("File deleted successfully.")
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found.");
    }

    @GetMapping("/by-media-type/{mediaTypeId}")
    public ResponseEntity<List<UploadedMediaDTO>> getFilesByFamilyTreeId(@PathVariable String mediaTypeId) {
        return ResponseEntity.ok(mediaStorageService.getFilesByMediaTypeId(mediaTypeId));
    }
}
