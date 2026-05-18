package com.quizgame.backend.dto;

import java.util.List;

public class QuestionRequestDTO {

    private String questionText;
    private Integer timeLimit;
    private String correctAnswer;
    private List<ChoiceRequestDTO> choices;

    public QuestionRequestDTO() {}

    public QuestionRequestDTO(String questionText, Integer timeLimit, List<ChoiceRequestDTO> choices) {
        this.questionText = questionText;
        this.timeLimit = timeLimit;
        this.choices = choices;
    }

    public String getQuestionText() {
        return questionText;
    }

    public Integer getTimeLimit() {
        return timeLimit;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public List<ChoiceRequestDTO> getChoices() {
        return choices;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public void setTimeLimit(Integer timeLimit) {
        this.timeLimit = timeLimit;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public void setChoices(List<ChoiceRequestDTO> choices) {
        this.choices = choices;
    }
}