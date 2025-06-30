package com.generation.connect.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Setter
@Getter
public class MessageDTO {

    private HttpStatus responseStatusCode;

    private String responseMessage;

    public MessageDTO(HttpStatus responseStatusCode, String responseMessage) {
        this.responseStatusCode = responseStatusCode;
        this.responseMessage = responseMessage;
    }

    @Override
    public String toString() {
        return "MessageDTO{" +
                "responseStatusCode=" + responseStatusCode +
                ", responseMessage='" + responseMessage + '\'' +
                '}';
    }
}
