package com.generation.connect.dto.neo4j;

import jakarta.validation.constraints.PastOrPresent;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonRequestDTO {

    private String personId;

    private Long familyTreeId;

    private String firstName;

    private String lastName;

    @PastOrPresent(message = "Birthdate cannot be in the future")
    private LocalDate birthdate;

    private GenderEnum gender;

    private Boolean firstNode;

    private List<String> relatedPersonId;

    private RelationshipEnum relationshipEnum;

}
