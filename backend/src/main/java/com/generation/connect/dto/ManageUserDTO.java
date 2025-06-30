package com.generation.connect.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.generation.connect.dto.auth.UserAccessRoleEnum;
import lombok.*;

@EqualsAndHashCode
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ManageUserDTO {

    @JsonProperty("familyTreeId")
    private Long familyTreeId;

    @JsonProperty("addedMemberUserId")
    private String addedMemberUserId;

    @JsonProperty("role")
    private UserAccessRoleEnum role;

    @JsonProperty
    private String memberAddedBy;
}
