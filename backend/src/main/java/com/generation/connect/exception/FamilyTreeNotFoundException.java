package com.generation.connect.exception;

public class FamilyTreeNotFoundException extends RuntimeException {

    public FamilyTreeNotFoundException(String message) {
        super(message);
    }

    public FamilyTreeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
