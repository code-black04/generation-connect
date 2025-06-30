package com.generation.connect.entity.neo4j;

import com.generation.connect.dto.neo4j.GenderEnum;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.*;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;

@Setter
@Getter
@Node("Person")
public class Person {
    @Id
    @GeneratedValue(generatorClass = org.springframework.data.neo4j.core.support.UUIDStringGenerator.class)
    private String personId;

    private Long familyTreeId;

    private String firstName;

    private String lastName;

    private LocalDate birthdate;

    private GenderEnum gender;

    private Boolean firstNode;

    private String userId;

    private String label;

    private String desc;

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


    @CreatedBy
    private String createdBy;

    @CreatedDate
    private Instant createdDate;

    @LastModifiedBy
    private String lastModifiedBy;

    @LastModifiedDate
    private Instant lastModifiedDate;

    @Version
    private Long version;

    public Person() {
    }

}
