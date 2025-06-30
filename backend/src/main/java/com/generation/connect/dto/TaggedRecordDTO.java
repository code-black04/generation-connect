package com.generation.connect.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaggedRecordDTO {
    private String externalRecordId;
    private ResearchSourceNameEnum researchSourceNameEnum;
    private LocalDateTime linkedAt;
    private Object savedResearchedData;
}
