package com.generation.connect.entity;

public enum ActionType {
    ADD("ADD"), UPDATE("UPDATE"), DELETE("DELETE");
    private final String type;

    ActionType(String type) {
        this.type = type;
    }
}
