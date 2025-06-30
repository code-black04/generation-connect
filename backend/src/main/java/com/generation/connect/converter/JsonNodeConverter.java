package com.generation.connect.converter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class JsonNodeConverter implements AttributeConverter<JsonNode, String> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(JsonNode jsonNode) {
        System.out.println(">>> Converting JsonNode to String");

        try {
            return jsonNode == null ? null : mapper.writeValueAsString(jsonNode);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to convert JsonNode to String", e);
        }
    }

    @Override
    public JsonNode convertToEntityAttribute(String dbData) {
        try {
            return dbData == null ? null : mapper.readTree(dbData);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to convert String to JsonNode", e);
        }
    }
}
