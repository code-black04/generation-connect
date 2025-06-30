package com.generation.connect.dto.neo4j;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Property;

import java.time.LocalDate;
import java.util.Map;

@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PersonDetailsDTO {

    @JsonProperty(value = "firstName")
    private String firstName;

    @JsonProperty(value = "lastName")
    private String lastName;

    @JsonProperty(value = "birthdate")
    private LocalDate birthdate;

    @JsonProperty(value = "gender")
    private GenderEnum gender;

    @JsonProperty(value = "userId")
    private String userId;

    @JsonProperty(value = "createdBy")
    private String createdBy;

    @JsonProperty(value = "lastModifiedBy")
    private String lastModifiedBy;

    @JsonProperty(value = "label")
    private String label;

    @JsonProperty(value = "desc")
    private String desc;

    @JsonProperty(value = "avatar")
    private String avatar;

    private String countryOfCitizenship;
    private String awardReceived;
    private String placeOfBirth;
    private String educatedAt;
    private String occupation;
    private String positionHeld;
    private String employer;
    private String residence;
    private String languagesSpokenWritten;
    private String significantEvent;
    private String ownerOf;
    private LocalDate demiseDate;

}
