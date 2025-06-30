package com.generation.connect.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class FamilyTreeAuditEventDto {
    private Long id;
    private Long familyTreeId;
    private String tableName;
    private String actionType;
    private String recordId;
    private String recordName;
    private String createdBy;
    private LocalDateTime createdDate;
}
