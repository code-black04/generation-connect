package com.generation.connect.repository;

import com.generation.connect.entity.UploadedMediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UploadedMediaRepository extends JpaRepository<UploadedMediaEntity, Long> {
    List<UploadedMediaEntity> findByMediaTypeId(String mediaTypeId);
}