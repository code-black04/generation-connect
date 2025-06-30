package com.generation.connect.controller;

import com.generation.connect.dto.ChatMessage;
import com.generation.connect.service.implementation.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private OpenAiService openAiService;

    @PostMapping("/chat")
        public ResponseEntity<String> chat(@RequestBody String userMessage) {
        ChatMessage message = new ChatMessage();
        message.setRole("user");
        message.setContent(userMessage);

        String reply = openAiService.getResponse(List.of(message));
        return ResponseEntity.ok(reply);
    }
}
