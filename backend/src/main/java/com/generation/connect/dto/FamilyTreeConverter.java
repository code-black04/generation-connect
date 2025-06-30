package com.generation.connect.dto;

import com.generation.connect.entity.FamilyTreeEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class FamilyTreeConverter {

    public static FamilyTreeEntity getEntity(FamilyTreeDTO dto) {
        FamilyTreeEntity familyTreeEntity = new FamilyTreeEntity();
        familyTreeEntity.setFamilyTreeName(dto.getFamilyTreeName());
        familyTreeEntity.setFamilyTreeDescription(dto.getFamilyTreeDescription());
        familyTreeEntity.setFamilyTreeId(dto.getFamilyTreeId());
        familyTreeEntity.setCreatedBy(dto.getMemberUserId());
        familyTreeEntity.setCreatedDate(LocalDateTime.now());
        familyTreeEntity.setFamilyTreeAccessLevel(dto.getFamilyTreeAccessLevel());
        return familyTreeEntity;
    }

    public static FamilyTreeDTO getDto(FamilyTreeEntity entity) {
        FamilyTreeDTO dto = new FamilyTreeDTO();
        dto.setFamilyTreeName(entity.getFamilyTreeName());
        dto.setFamilyTreeDescription(entity.getFamilyTreeDescription());
        dto.setMemberUserId(entity.getCreatedBy());
        dto.setFamilyTreeId(entity.getFamilyTreeId());
        dto.setFamilyTreeAccessLevel(entity.getFamilyTreeAccessLevel());
        return dto;
    }
}