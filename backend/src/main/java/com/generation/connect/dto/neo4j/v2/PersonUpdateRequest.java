package com.generation.connect.dto.neo4j.v2;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.generation.connect.dto.neo4j.PersonDetailsDTO;
import lombok.*;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PersonUpdateRequest {

    @JsonProperty(value = "id")
    private String personId;

    @JsonProperty(value = "familyTreeId")
    private Long familyTreeId;

    @JsonProperty(value = "firstNode")
    private Boolean firstNode;

    @JsonProperty(value = "data")
    private PersonDetailsDTO detail;

    @JsonProperty(value = "rels")
    private PersonUpdateRelationshipDTO personRelationshipDTO;

}
