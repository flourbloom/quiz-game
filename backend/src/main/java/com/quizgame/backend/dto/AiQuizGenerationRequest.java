package com.quizgame.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AiQuizGenerationRequest {
    private String difficulty;
    private String questionType;
    private Integer numberOfQuestions;
    private String model;
    private String documentContent;
    private String documentFileName;
}
