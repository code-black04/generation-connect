package com.generation.connect.dto.neo4j;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PersonRelationshipDTO {

    @JsonProperty(value = "mother")
    private String mother;

    @JsonProperty(value = "father")
    private String father;

    @JsonProperty(value = "spouses")
    private List<String> spouses;

    @JsonProperty(value = "children")
    private List<String> children;

}
