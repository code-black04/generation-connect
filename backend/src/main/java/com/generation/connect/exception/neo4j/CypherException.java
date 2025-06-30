package com.generation.connect.exception.neo4j;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;

@Setter
@Getter
public class CypherException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;
    private String message;

    public CypherException(String message) {
        this.message = message;
    }

}
