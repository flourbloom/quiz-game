package com.quizgame.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AiQuizGenerationResponse {
    private String title;
    private String description;
    private List<AiQuestionDTO> questions;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AiQuestionDTO {
        @JsonAlias({"text"})
        private String question;
        private String type; // MCQ or SHORT_ANSWER
        private String answer1;
        private String answer2;
        private String answer3;
        private String answer4;
        @JsonAlias({"answer", "correctChoice", "correct_answer"})
        private String correctAnswer;
        private Integer correctChoiceIndex;
        private String difficulty;
    }
}
