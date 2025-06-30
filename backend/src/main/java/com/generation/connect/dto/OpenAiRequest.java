package com.generation.connect.dto;
import lombok.Data;

import java.util.List;
@Data
public class OpenAiRequest {
    private String model = "gpt-3.5-turbo";
    private List<ChatMessage> messages;
}
