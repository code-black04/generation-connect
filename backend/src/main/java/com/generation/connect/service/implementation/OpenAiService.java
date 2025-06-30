package com.generation.connect.service.implementation;

import com.generation.connect.dto.ChatMessage;
import com.generation.connect.dto.OpenAiRequest;
import com.generation.connect.dto.OpenAiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;
import java.util.Objects;

@Service
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    public String getResponse(List<ChatMessage> messages) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        OpenAiRequest request = new OpenAiRequest();
        request.setMessages(messages);

        HttpEntity<OpenAiRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<OpenAiResponse> response = restTemplate.postForEntity(apiUrl, entity, OpenAiResponse.class);
        return Objects.requireNonNull(response.getBody()).getChoices().get(0).getMessage().getContent();
    }
}
