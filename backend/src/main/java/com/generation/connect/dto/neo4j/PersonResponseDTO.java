package com.generation.connect.dto.neo4j;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PersonResponseDTO {

    @JsonProperty(value = "id")
    private String personId;

    @JsonProperty(value = "familyTreeId")
    private Long familyTreeId;

    @JsonProperty(value = "firstNode")
    private Boolean firstNode;

    @JsonProperty(value = "data")
    private PersonDetailsDTO personDetailsDTO;

    @JsonProperty(value = "relationship")
    private PersonRelationshipDTO personRelationshipDTO;

}
