package com.generation.connect.service;

import com.generation.connect.dto.FamilyTreeAuditEventDto;
import com.generation.connect.entity.ActionType;
import com.generation.connect.entity.FamilyTreeAuditEvent;

import java.util.List;

public interface FamilyTreeAuditEventService {
    String USER_PROFILE_POST = "UserProfilePost";
    String FAMILY_PROFILE_POST = "FamilyProfilePost";
    String FAMILY_TREE = "FamilyTree";
    String FAMILY_TREE_USER_ACCESS = "FamilyTreeUserAccess";
    String FAMILY_TREE_INVITE = "FamilyTreeInvite";

    void addEvent(FamilyTreeAuditEventDto event);

    List<FamilyTreeAuditEventDto> getEventsByFamilyId(Long familyTreeId);

    void addEvent(Long familyTreeId, String tableName, ActionType actionType,
                  String recordId, String recordName);
}
