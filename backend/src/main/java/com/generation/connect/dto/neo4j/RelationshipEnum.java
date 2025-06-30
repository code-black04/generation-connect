package com.generation.connect.dto.neo4j;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum RelationshipEnum {
    PARENT_OF("Parent_of"),
    MARRIED_TO("Married_to"),
    SIBLING_OF("Sibling_of"),
    CHILD_OF("Child_of");
    private final String value;

    RelationshipEnum(String value) {
        this.value = value;
    }

    @JsonCreator
    public static RelationshipEnum fromValue(String value) {
        for (RelationshipEnum relationshipEnum : RelationshipEnum.values()) {
            if (relationshipEnum.value.equalsIgnoreCase(value)) {
                return relationshipEnum;
            }
        }
        throw new IllegalArgumentException("Invalid value for RelationshipEnum " + value);
    }

    @JsonValue
    public String toValue() {
        return value;
    }
}
