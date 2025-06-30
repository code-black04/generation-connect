package com.generation.connect.service.implementation;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.generation.connect.config.ResearchWebClientConfig;
import com.generation.connect.dto.ResearchRequestDTO;
import com.generation.connect.dto.ResearchSourceNameEnum;
import com.generation.connect.dto.TagRequestDTO;
import com.generation.connect.dto.TaggedRecordDTO;
import com.generation.connect.dto.auth.UserAccessRoleEnum;
import com.generation.connect.entity.FamilyTreeEntity;
import com.generation.connect.entity.ResearchRecordLinkEntity;
import com.generation.connect.exception.FamilyTreeNotFoundException;
import com.generation.connect.repository.FamilyTreeRepository;
import com.generation.connect.repository.ResearchRecordLinkRepository;
import com.generation.connect.service.ResearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ResearchServiceImpl implements ResearchService {

    private final ResearchWebClientConfig researchWebClientConfig;

    private final ObjectMapper objectMapper;

    private final ResearchRecordLinkRepository researchRecordLinkRepository;

    private final FamilyTreeRepository familyTreeRepository;

    private final ManageUserAccessServiceImpl manageUserAccessService;

    @Autowired
    public ResearchServiceImpl(ResearchWebClientConfig researchWebClientConfig,
                               ObjectMapper objectMapper,
                               ResearchRecordLinkRepository researchRecordLinkRepository,
                               FamilyTreeRepository familyTreeRepository,
                               ManageUserAccessServiceImpl manageUserAccessService) {
        this.researchWebClientConfig = researchWebClientConfig;
        this.objectMapper = objectMapper;
        this.researchRecordLinkRepository = researchRecordLinkRepository;
        this.familyTreeRepository = familyTreeRepository;
        this.manageUserAccessService = manageUserAccessService;
    }

    public Object fetchLiveRecords(ResearchRequestDTO researchRequestDTO, ResearchSourceNameEnum researchSourceNameEnum) {
        if (researchSourceNameEnum.equals(ResearchSourceNameEnum.THE_NATIONAL_ARCHIVE_UK)) {
            return searchLiveRecordsOfUK(researchRequestDTO);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", String.format("Record searches for '%s' are not yet supported.", ResearchSourceNameEnum.NATIONAL_ARCHIVE_US));
            response.put("Research Resource name", ResearchSourceNameEnum.NATIONAL_ARCHIVE_US);
            return response;
        }
    }

    public Object searchLiveRecordsOfUK(ResearchRequestDTO researchRequestDTO) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromPath("/API/search/v1/records")
                .queryParam("sps.recordCollections", "All")
                .queryParam("sps.searchQuery", researchRequestDTO.getSearchQuery());

        if (researchRequestDTO.getTitleName() != null) {
            uriBuilder.queryParam("sps.titleName", researchRequestDTO.getTitleName());
        }
        if (researchRequestDTO.getFirstName() != null) {
            uriBuilder.queryParam("sps.firstName", researchRequestDTO.getFirstName());
        }
        if (researchRequestDTO.getLastName() != null) {
            uriBuilder.queryParam("sps.lastName", researchRequestDTO.getLastName());
        }
        if (researchRequestDTO.getDateOfBirthFrom() != null) {
            uriBuilder.queryParam("sps.dateOfBirthFrom", researchRequestDTO.getDateOfBirthFrom());
        }
        if (researchRequestDTO.getDateOfBirthTo() != null) {
            uriBuilder.queryParam("sps.dateOfBirthTo", researchRequestDTO.getDateOfBirthTo());
        }
        if (researchRequestDTO.getDateFrom() != null) {
            uriBuilder.queryParam("sps.dateFrom", researchRequestDTO.getDateFrom());
        }
        if (researchRequestDTO.getDateTo() != null) {
            uriBuilder.queryParam("sps.dateTo", researchRequestDTO.getDateTo());
        }

        String uri = uriBuilder
                .build()
                .encode()
                .toUriString();

        String json = researchWebClientConfig.nationalArchivesClient().get()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            return objectMapper.readValue(json, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse JSON", e);
        }
    }

    public boolean tagRecordIfNotAlready(TagRequestDTO dto, String userId) {

        manageUserAccessService.validateUserRole(dto.getFamilyTreeId(), userId, List.of(UserAccessRoleEnum.OWNER, UserAccessRoleEnum.CONTRIBUTOR));

        boolean exists = researchRecordLinkRepository.existsByExternalRecordIdAndFamilyTree_FamilyTreeId(
                dto.getExternalRecordId(), dto.getFamilyTreeId());

        if (!exists) {
            JsonNode jsonNode;
            try {
                jsonNode = objectMapper.valueToTree(dto.getSavedResearchedData());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Failed to convert savedResearchedData to JsonNode", e);
            }

            FamilyTreeEntity familyTree = familyTreeRepository.findFamilyTreeByFamilyTreeId(dto.getFamilyTreeId());

            if (familyTree == null) {
                throw new FamilyTreeNotFoundException("Family tree not found");
            }

            ResearchRecordLinkEntity link = new ResearchRecordLinkEntity();
            link.setExternalRecordId(dto.getExternalRecordId());
            link.setResearchSourceNameEnum(dto.getResearchSourceName());
            link.setLinkedAt(LocalDateTime.now());
            link.setFamilyTree(familyTree);
            link.setSavedResearchedData(jsonNode);

            researchRecordLinkRepository.save(link);
            return true;
        }

        return false;
    }

    @Override
    public List<TaggedRecordDTO> getTaggedRecordsForTree(Long familyTreeId) {
        List<ResearchRecordLinkEntity> links = researchRecordLinkRepository.findByFamilyTree_FamilyTreeId(familyTreeId);

        return links.stream()
                .map(link -> new TaggedRecordDTO(
                        link.getExternalRecordId(),
                        link.getResearchSourceNameEnum(),
                        link.getLinkedAt(),
                        link.getSavedResearchedData()
                ))
                .collect(Collectors.toList());
    }
}
