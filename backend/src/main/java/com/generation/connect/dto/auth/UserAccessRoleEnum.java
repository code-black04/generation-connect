package com.generation.connect.dto.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum UserAccessRoleEnum {

    OWNER("Owner"),
    CONTRIBUTOR("Contributor"),
    VIEWER("Viewer");

    private final String value;

    UserAccessRoleEnum(String value) {
        this.value = value;
    }

    @JsonCreator
    public static UserAccessRoleEnum fromValue(String value) {
        for (UserAccessRoleEnum userAccessRoleEnum : UserAccessRoleEnum.values()) {
            if (userAccessRoleEnum.value.equalsIgnoreCase(value)) {
                return userAccessRoleEnum;
            }
        }
        throw new IllegalArgumentException("Invalid value for UserAccessRoleEnum " + value);
    }

    @JsonValue
    public String toValue() {
        return value;
    }
}
