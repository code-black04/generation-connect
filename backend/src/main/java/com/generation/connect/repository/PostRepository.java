package com.generation.connect.repository;

import com.generation.connect.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> findByPersonIdOrderByCreatedDateDesc(String personId);

    List<PostEntity> findByFamilyTreeIdOrderByCreatedDateDesc(Long familyTreeId);

    List<PostEntity> findAllByFamilyTreeId(Long familyTreeId);
}
