package com.generation.connect.service.implementation;

import com.generation.connect.auth.AuthUtils;
import com.generation.connect.mapper.FamilyTreeAuditEventConverter;
import com.generation.connect.dto.FamilyTreeAuditEventDto;
import com.generation.connect.entity.ActionType;
import com.generation.connect.entity.FamilyTreeAuditEvent;
import com.generation.connect.repository.FamilyTreeAuditEventRepository;
import com.generation.connect.service.FamilyTreeAuditEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FamilyTreeAuditEventServiceImpl implements FamilyTreeAuditEventService {

    @Autowired
    private FamilyTreeAuditEventRepository eventRepository;

    @Autowired
    private AuthUtils authUtils;

    @Override
    public void addEvent(FamilyTreeAuditEventDto event) {
        eventRepository.save(FamilyTreeAuditEventConverter.toEntity(event));
    }

    @Override
    public List<FamilyTreeAuditEventDto> getEventsByFamilyId(Long familyTreeId) {
        return eventRepository.findByFamilyTreeIdOrderByIdDesc(familyTreeId).stream()
                .map(FamilyTreeAuditEventConverter::toDto).toList();
    }

    @Override
    public void addEvent(Long familyTreeId, String tableName, ActionType actionType,
                         String recordId, String recordName) {
        FamilyTreeAuditEvent event = new FamilyTreeAuditEvent();
        event.setFamilyTreeId(familyTreeId);
        event.setTableName(tableName);
        event.setActionType(actionType);
        event.setRecordId(recordId);
        event.setRecordName(recordName);
        event.setCreatedBy(authUtils.getCurrentUserId());
        event.setCreatedDate(LocalDateTime.now());
        eventRepository.save(event);
    }
}
