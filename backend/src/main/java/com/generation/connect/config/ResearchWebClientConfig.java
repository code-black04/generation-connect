package com.generation.connect.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class ResearchWebClientConfig {
    @Bean
    public WebClient nationalArchivesClient() {
        return WebClient.builder()
                .baseUrl("https://discovery.nationalarchives.gov.uk")
                .defaultHeader("User-Agent", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0")
                .defaultHeader("Accept", "application/json")
                .defaultHeader("Accept-Language", "en-US,en;q=0.5")
                .defaultHeader("Accept-Encoding", "identity")
                .defaultHeader("Connection", "keep-alive")
                .defaultHeader("Referer", "https://discovery.nationalarchives.gov.uk/API/sandbox/index")
                .defaultHeader("Sec-Fetch-Dest", "empty")
                .defaultHeader("Sec-Fetch-Mode", "cors")
                .defaultHeader("Sec-Fetch-Site", "same-origin")
                .defaultHeader("Priority", "u=0")
                .exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(config -> config.defaultCodecs().maxInMemorySize(16 * 1024 * 1024))
                        .build())
                .build();
    }
}
