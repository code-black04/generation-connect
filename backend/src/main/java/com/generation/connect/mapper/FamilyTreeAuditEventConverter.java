package com.generation.connect.mapper;

import com.generation.connect.dto.FamilyTreeAuditEventDto;
import com.generation.connect.entity.ActionType;
import com.generation.connect.entity.FamilyTreeAuditEvent;

public class FamilyTreeAuditEventConverter {


    public static FamilyTreeAuditEventDto toDto(FamilyTreeAuditEvent entity) {
        if (entity == null) return null;
        FamilyTreeAuditEventDto dto = new FamilyTreeAuditEventDto();
        dto.setId(entity.getId());
        dto.setFamilyTreeId(entity.getFamilyTreeId());
        dto.setTableName(entity.getTableName());
        dto.setActionType(entity.getActionType() != null ? entity.getActionType().name() : null);
        dto.setRecordId(entity.getRecordId());
        dto.setRecordName(entity.getRecordName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDate(entity.getCreatedDate());
        return dto;
    }

    public static FamilyTreeAuditEvent toEntity(FamilyTreeAuditEventDto dto) {
        if (dto == null) return null;
        FamilyTreeAuditEvent entity = new FamilyTreeAuditEvent();
        entity.setId(dto.getId());
        entity.setFamilyTreeId(dto.getFamilyTreeId());
        entity.setTableName(dto.getTableName());
        entity.setActionType(dto.getActionType() != null ? ActionType.valueOf(dto.getActionType()) : null);
        entity.setRecordId(dto.getRecordId());
        entity.setRecordName(dto.getRecordName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDate(dto.getCreatedDate());
        return entity;
    }
}
