package com.generation.connect.controller;

import com.generation.connect.exception.*;
import com.generation.connect.exception.neo4j.CypherException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionHandlerController {

    private final Logger logger = LoggerFactory.getLogger(ExceptionHandlerController.class);

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<Object> handleUnauthorizedAccessRequest(UnauthorizedAccessException exceptions) {
        logger.error("UnauthorizedAccessException: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_UNAUTHORIZED_ACCESS",
                List.of(new ErrorMessage("request", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UnverifiedUserRoleException.class)
    public ResponseEntity<Object> handleBadRequest(UnverifiedUserRoleException exceptions) {
        logger.error("UnverifiedUserRoleException: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_UNVERIFIED_USER_ROLE_ACCESS",
                List.of(new ErrorMessage("request", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UnauthorizedActionException.class)
    public ResponseEntity<Object> handleBadRequest(UnauthorizedActionException exceptions) {
        logger.error("UnauthorizedActionException: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_UNAUTHORIZED_EDIT_ROLE_ACCESS",
                List.of(new ErrorMessage("request", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidRoleAssignmentException.class)
    public ResponseEntity<Object> handleBadRequest(InvalidRoleAssignmentException exceptions) {
        logger.error("InvalidRoleAssignmentException: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_INVALID_ROLE_ASSIGNMENT",
                List.of(new ErrorMessage("request", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(DuplicateUserRoleAssignmentException.class)
    public ResponseEntity<Object> handleBadRequest(DuplicateUserRoleAssignmentException exceptions) {
        logger.error("DuplicateUserRoleAssignmentException: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_DUPLICATE_ROLE_ASSIGNMENT",
                List.of(new ErrorMessage("request", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<Object> handleIncorrectPassword(IncorrectPasswordException ex) {
        logger.error("IncorrectPasswordException: ", ex);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_AUTH_FAILED",
                List.of(new ErrorMessage("password_incorrect", ex.getMessage())),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFound(UserNotFoundException ex) {
        logger.error("UserNotFoundException: ", ex);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_USER_NOT_FOUND",
                List.of(new ErrorMessage("username_not_found", ex.getMessage())),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        logger.error("UsernameNotFoundException: ", ex);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_AUTH_FAILED",
                List.of(new ErrorMessage("bad_credentials", "Incorrect emailId/password, try again..")),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleInvalidDataRequested(MethodArgumentNotValidException ex) {
        logger.error("MethodArgumentNotValidException: ", ex);
        List<ErrorMessage> errorMessages = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> new ErrorMessage(error.getField(), error.getDefaultMessage()))
                .collect(Collectors.toList());

        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_INVALID_DATA_REQUESTED",
                errorMessages,
                LocalDateTime.now()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentials(BadCredentialsException exception) {
        logger.error("BadCredentialsException: ", exception);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_BAD_CREDENTIALS",
                List.of(new ErrorMessage("bad_credentials", "Incorrect emailId/password, try again..")),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(PersonNotFoundException.class)
    public ResponseEntity<Object> handlePersonNotFound(PersonNotFoundException ex) {
        logger.error("PersonNotFoundException: ", ex);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_PERSON_NOT_FOUND",
                List.of(new ErrorMessage("person_not_found", ex.getMessage())),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateAccountException.class)
    public ResponseEntity<Object> handleAccountAlreadyExists(DuplicateAccountException exceptions) {
        logger.error("DuplicateAccountException: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_ACCOUNT_EXISTS",
                List.of(new ErrorMessage("userAccountDetails", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Object> handleBadRequest(BadRequestException exceptions) {
        logger.error("BadRequestException: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_BAD_REQUEST",
                List.of(new ErrorMessage("badRequest", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FamilyTreeNotFoundException.class)
    public ResponseEntity<Object> handleFamilyTreeNotFound(FamilyTreeNotFoundException exceptions) {
        logger.error("FamilyTreeNotFoundException: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_FAMILY_TREE_NOT_FOUND",
                List.of(new ErrorMessage("familyTreeNotFound", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = CypherException.class)
    public ResponseEntity<Object> cypherException(CypherException exceptions) {
        logger.error("CypherException: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_CYPHER_QUERY_EXCEPTION",
                List.of(new ErrorMessage("cypherQueryException", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = WebClientResponseException.class)
    public ResponseEntity<Object> cypherException(WebClientResponseException exceptions) {
        logger.error("WebClientResponseException: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_WEB_CLIENT_EXCEPTION",
                List.of(new ErrorMessage("webClientException", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<Object> cypherException(Exception exceptions) {
        logger.error("Exception: ", exceptions);
        ErrorResponse errorResponse = new ErrorResponse(
                "ERR_INTERNAL_SERVER_EXCEPTION",
                List.of(new ErrorMessage("internalServerException", exceptions.getMessage())),
                LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public record ErrorResponse(String errorCode, List<ErrorMessage> errorMessageList, LocalDateTime timeStamp) {

        @Override
        public String toString() {
            return "ErrorResponse{" +
                    "errorCode='" + errorCode + '\'' +
                    ", errorMessageList=" + errorMessageList +
                    ", timeStamp=" + timeStamp +
                    '}';
        }
    }

    public record ErrorMessage(String fieldName, String error) {

        @Override
        public String toString() {
            return "ErrorMessage{" +
                    "fieldName='" + fieldName + '\'' +
                    ", error='" + error + '\'' +
                    '}';
        }
    }
}
