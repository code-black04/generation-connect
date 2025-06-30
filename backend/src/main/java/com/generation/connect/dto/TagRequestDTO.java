package com.generation.connect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagRequestDTO {

    @NotBlank(message = "External record ID must not be blank")
    private String externalRecordId;

    @NotNull(message = "Family tree ID is required")
    private Long familyTreeId;

    private ResearchSourceNameEnum researchSourceName;

    private Object savedResearchedData;

    public TagRequestDTO() {
    }

    public TagRequestDTO(String externalRecordId, Long familyTreeId, ResearchSourceNameEnum researchSourceName, Object savedResearchedData) {
        this.externalRecordId = externalRecordId;
        this.familyTreeId = familyTreeId;
        this.researchSourceName = researchSourceName;
        this.savedResearchedData = savedResearchedData;
    }
}
