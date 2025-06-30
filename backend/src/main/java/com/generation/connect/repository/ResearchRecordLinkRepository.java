package com.generation.connect.repository;

import com.generation.connect.entity.ResearchRecordLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResearchRecordLinkRepository extends JpaRepository<ResearchRecordLinkEntity, Long> {

    boolean existsByExternalRecordIdAndFamilyTree_FamilyTreeId(String externalRecordId, Long familyTreeId);

    List<ResearchRecordLinkEntity> findByFamilyTree_FamilyTreeId(Long familyTreeId);

    void deleteByFamilyTree_FamilyTreeId(Long familyTreeId);

}
