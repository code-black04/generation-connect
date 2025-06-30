package com.generation.connect.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.generation.connect.dto.auth.FamilyTreeAccessLevelEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
public class FamilyTreeDTO {

    @JsonProperty(value = "familyTreeId")
    private Long familyTreeId;

    @JsonProperty(value = "familyTreeName", required = true)
    @NotBlank(message = "Family tree name is required")
    private String familyTreeName;

    @JsonProperty(value = "memberUserId", required = true)
    @NotBlank(message = "Member user ID is required")
    private String memberUserId;

    @JsonProperty(value = "familyTreeDescription")
    private String familyTreeDescription;

    @JsonProperty(value = "familyTreeAccessLevel")
    @NotNull(message = "Access level is required")
    private FamilyTreeAccessLevelEnum familyTreeAccessLevel;

    public FamilyTreeDTO() {
    }

    public FamilyTreeDTO(Long familyTreeId, String familyTreeName, String memberUserId, String familyTreeDescription, FamilyTreeAccessLevelEnum familyTreeAccessLevel) {
        this.familyTreeId = familyTreeId;
        this.familyTreeName = familyTreeName;
        this.memberUserId = memberUserId;
        this.familyTreeDescription = familyTreeDescription;
        this.familyTreeAccessLevel = familyTreeAccessLevel;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof FamilyTreeDTO that)) return false;
        return Objects.equals(familyTreeId, that.familyTreeId) && Objects.equals(familyTreeName, that.familyTreeName) && Objects.equals(memberUserId, that.memberUserId) && Objects.equals(familyTreeDescription, that.familyTreeDescription) && familyTreeAccessLevel == that.familyTreeAccessLevel;
    }

    @Override
    public int hashCode() {
        return Objects.hash(familyTreeId, familyTreeName, memberUserId, familyTreeDescription, familyTreeAccessLevel);
    }

    @Override
    public String toString() {
        return "FamilyTreeDTO{" +
                "familyTreeId=" + familyTreeId +
                ", familyTreeName='" + familyTreeName + '\'' +
                ", memberUserId='" + memberUserId + '\'' +
                ", familyTreeDescription='" + familyTreeDescription + '\'' +
                ", familyTreeAccessLevel=" + familyTreeAccessLevel +
                '}';
    }
}
