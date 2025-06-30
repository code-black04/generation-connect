package com.generation.connect.controller;

import com.generation.connect.auth.AuthUtils;
import com.generation.connect.dto.ResearchRequestDTO;
import com.generation.connect.dto.ResearchSourceNameEnum;
import com.generation.connect.dto.TagRequestDTO;
import com.generation.connect.dto.TaggedRecordDTO;
import com.generation.connect.service.ResearchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/research")
public class ResearchController {

    @Autowired
    private ResearchService researchService;

    @Autowired
    private AuthUtils authUtils;

    @GetMapping("/records/live/{researchSourceName}")
    public ResponseEntity<Object> searchLiveRecords(
            @PathVariable ResearchSourceNameEnum researchSourceName,
            @RequestParam String searchQuery,
            @RequestParam(required = false) String titleName,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateOfBirthFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateOfBirthTo,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo
    ) {
        ResearchRequestDTO researchRequestDTO = new ResearchRequestDTO(
                titleName,
                firstName,
                lastName,
                dateOfBirthFrom,
                dateOfBirthTo,
                searchQuery,
                dateFrom,
                dateTo
        );
        Object result = researchService.fetchLiveRecords(researchRequestDTO, researchSourceName);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/records/tag")
    public ResponseEntity<String> tagRecordToFamilyTree(@Valid @RequestBody TagRequestDTO tagRequestDTO) {
        String userId = authUtils.getCurrentUserId();

        boolean tagged = researchService.tagRecordIfNotAlready(tagRequestDTO, userId);

        if (tagged) {
            return ResponseEntity.ok("Record successfully tagged to the family tree.");
        } else {
            return ResponseEntity.ok("Record already tagged to this family tree.");
        }
    }

    @GetMapping("/records/tagged/{familyTreeId}")
    public ResponseEntity<List<TaggedRecordDTO>> getTaggedRecords(
            @PathVariable Long familyTreeId) {
        List<TaggedRecordDTO> tagged = researchService.getTaggedRecordsForTree(familyTreeId);
        return ResponseEntity.ok(tagged);
    }

}
