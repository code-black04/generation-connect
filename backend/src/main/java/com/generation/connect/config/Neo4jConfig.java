package com.generation.connect.config;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.config.EnableNeo4jAuditing;
import org.springframework.data.neo4j.core.DatabaseSelectionProvider;
import org.springframework.data.neo4j.core.transaction.Neo4jTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.support.TransactionTemplate;

@Configuration
@EnableTransactionManagement
@EnableNeo4jAuditing
public class Neo4jConfig {

    @Value("${spring.data.neo4j.uri}")
    private String neo4jUri;

    @Value("${spring.data.neo4j.username}")
    private String username;

    @Value("${spring.data.neo4j.password}")
    private String password;

    @Autowired
    private Driver driver;

    @Bean
    public TransactionTemplate transactionTemplate() {
        return new TransactionTemplate(transactionManager());
    }


    @Bean
    public Neo4jTransactionManager transactionManager() {
        return new Neo4jTransactionManager(driver, DatabaseSelectionProvider.createStaticDatabaseSelectionProvider("gc-family-db"));
    }


    @Bean
    public Driver driver() {
        return GraphDatabase.driver(
                neo4jUri,
                AuthTokens.basic(username, password)
        );
    }
}

