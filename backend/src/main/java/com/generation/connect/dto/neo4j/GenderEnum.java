package com.generation.connect.dto.neo4j;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum GenderEnum {

    MALE("M"),
    FEMALE("F"),
    OTHER("O");

    private final String value;

    GenderEnum(String value) {
        this.value = value;
    }

    @JsonCreator
    public static GenderEnum fromValue(String value) {
        for (GenderEnum genderEnum : GenderEnum.values()) {
            if (genderEnum.value.equalsIgnoreCase(value)) {
                return genderEnum;
            }
        }
        throw new IllegalArgumentException("Invalid value for RelationshipEnum " + value);
    }

    @JsonValue
    public String toValue() {
        return value;
    }

}
