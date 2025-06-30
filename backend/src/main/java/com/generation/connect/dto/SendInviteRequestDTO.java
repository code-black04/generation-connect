package com.generation.connect.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.generation.connect.dto.auth.UserAccessRoleEnum;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Data
public class SendInviteRequestDTO {

    @JsonProperty(required = true)
    private Long familyTreeId;

    @JsonProperty(required = true)
    private String invitedEmail;

    @JsonProperty(required = true)
    private UserAccessRoleEnum role;

    @JsonProperty(required = true)
    private String inviterUserId;
}
