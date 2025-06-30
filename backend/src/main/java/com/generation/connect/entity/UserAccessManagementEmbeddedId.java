package com.generation.connect.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class UserAccessManagementEmbeddedId implements Serializable {
    private Long familyTreeId;
    private String memberUserId;
}
