package com.generation.connect.dto.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum FamilyTreeAccessLevelEnum {

    PRIVATE("Private"),
    PUBLIC("Public");

    private final String value;

    FamilyTreeAccessLevelEnum(String value) {
        this.value = value;
    }

    @JsonCreator
    public static FamilyTreeAccessLevelEnum fromValue(String value) {
        for (FamilyTreeAccessLevelEnum familyTreeAccessLevelEnum : FamilyTreeAccessLevelEnum.values()) {
            if (familyTreeAccessLevelEnum.value.equalsIgnoreCase(value)) {
                return familyTreeAccessLevelEnum;
            }
        }
        throw new IllegalArgumentException("Invalid value for FamilyTreeAccessLevelEnum " + value);
    }

    @JsonValue
    public String toValue() {
        return value;
    }
}
