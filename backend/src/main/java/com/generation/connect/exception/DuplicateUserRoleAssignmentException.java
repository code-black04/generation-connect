package com.generation.connect.exception;

public class DuplicateUserRoleAssignmentException extends RuntimeException {

    public DuplicateUserRoleAssignmentException(String message) {
        super(message);
    }

    public DuplicateUserRoleAssignmentException(String message, Throwable cause) {
        super(message, cause);
    }
}
