package com.generation.connect.service;

import com.generation.connect.dto.ResearchRequestDTO;
import com.generation.connect.dto.ResearchSourceNameEnum;
import com.generation.connect.dto.TagRequestDTO;
import com.generation.connect.dto.TaggedRecordDTO;

import java.util.List;

public interface ResearchService {

    Object fetchLiveRecords(ResearchRequestDTO researchRequestDTO, ResearchSourceNameEnum researchSourceNameEnum);

    boolean tagRecordIfNotAlready(TagRequestDTO dto, String userId);

    List<TaggedRecordDTO> getTaggedRecordsForTree(Long familyTreeId);

}
