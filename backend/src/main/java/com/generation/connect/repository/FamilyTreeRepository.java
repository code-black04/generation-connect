package com.generation.connect.repository;

import com.generation.connect.dto.auth.FamilyTreeAccessLevelEnum;
import com.generation.connect.entity.FamilyTreeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FamilyTreeRepository extends JpaRepository<FamilyTreeEntity, Long> {

    FamilyTreeEntity findFamilyTreeByFamilyTreeId(Long familyTreeId);

    List<FamilyTreeEntity> findAllFamilyTreeByCreatedBy(String memberUserId);

    List<FamilyTreeEntity> findAllByFamilyTreeAccessLevel(FamilyTreeAccessLevelEnum accessLevel);

    FamilyTreeEntity findFamilyTreeByCreatedByAndFamilyTreeId(String memberUserId, Long familyTreeId);

    long countByFamilyTreeAccessLevel(FamilyTreeAccessLevelEnum accessLevel);

    long countByCreatedDateAfter(LocalDateTime date);

}
