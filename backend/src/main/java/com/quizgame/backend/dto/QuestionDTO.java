package com.quizgame.backend.dto;

import java.util.List;

public class QuestionDTO {

    private Long id;
    private String questionText;
    private Integer timeLimit;
    private List<ChoiceDTO> choices;

    public QuestionDTO() {}

    public QuestionDTO(Long id, String questionText, Integer timeLimit, List<ChoiceDTO> choices) {
        this.id = id;
        this.questionText = questionText;
        this.timeLimit = timeLimit;
        this.choices = choices;
    }

    public Long getId() {
        return id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public Integer getTimeLimit() {
        return timeLimit;
    }

    public List<ChoiceDTO> getChoices() {
        return choices;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public void setTimeLimit(Integer timeLimit) {
        this.timeLimit = timeLimit;
    }

    public void setChoices(List<ChoiceDTO> choices) {
        this.choices = choices;
    }
}
