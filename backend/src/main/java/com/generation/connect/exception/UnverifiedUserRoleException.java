package com.generation.connect.exception;

public class UnverifiedUserRoleException extends RuntimeException {
    public UnverifiedUserRoleException(String message) {
        super(message);
    }

    public UnverifiedUserRoleException(String message, Throwable cause) {
        super(message, cause);
    }
}
