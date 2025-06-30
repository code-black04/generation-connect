package com.generation.connect.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ResearchSourceNameEnum {

    THE_NATIONAL_ARCHIVE_UK("The National Archive UK"),
    NATIONAL_ARCHIVE_US("National Archive US");

    private final String value;

    ResearchSourceNameEnum(String value) {
        this.value = value;
    }

    @JsonCreator
    public static ResearchSourceNameEnum fromValue(String value) {
        for (ResearchSourceNameEnum researchSourceNameEnum : ResearchSourceNameEnum.values()) {
            if (researchSourceNameEnum.value.equalsIgnoreCase(value) ||
                    researchSourceNameEnum.name().equalsIgnoreCase(value)) {
                return researchSourceNameEnum;
            }
        }
        throw new IllegalArgumentException("Invalid value for ResearchSourceNameEnum " + value);
    }


    @JsonValue
    public String toValue() {
        return value;
    }
}
