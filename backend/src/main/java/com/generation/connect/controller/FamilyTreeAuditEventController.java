package com.generation.connect.controller;

import com.generation.connect.dto.FamilyTreeAuditEventDto;
import com.generation.connect.service.FamilyTreeAuditEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/family-tree-events")
public class FamilyTreeAuditEventController {

    private final FamilyTreeAuditEventService eventService;

    @Autowired
    public FamilyTreeAuditEventController(FamilyTreeAuditEventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/{familyTreeId}")
    public List<FamilyTreeAuditEventDto> getEventsByFamilyTreeId(@PathVariable Long familyTreeId) {
        return eventService.getEventsByFamilyId(familyTreeId);
    }
}
