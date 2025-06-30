package com.generation.connect.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@ToString
public class ResearchRequestDTO {

    @JsonProperty(value = "titleName")
    private String titleName;

    @JsonProperty(value = "firstName")
    private String firstName;

    @JsonProperty(value = "lastName")
    private String lastName;

    @JsonProperty(value = "dateOfBirthFrom")
    private LocalDate dateOfBirthFrom;

    @JsonProperty(value = "dateOfBirthTo")
    private LocalDate dateOfBirthTo;

    @NonNull
    @NotBlank(message = "Search query must not be blank")
    @JsonProperty(value = "searchQuery", required = true)
    private String searchQuery;

    @JsonProperty(value = "dateFrom")
    private LocalDate dateFrom;

    @JsonProperty(value = "dateTo")
    private LocalDate dateTo;

}
