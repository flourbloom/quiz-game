package com.quizgame.backend.dto;

public class ChoiceListDTO {

    private Long id;
    private Long questionId;
    private String choiceText;
    private Boolean correct;

    public ChoiceListDTO() {}

    public ChoiceListDTO(Long id, Long questionId, String choiceText, Boolean correct) {
        this.id = id;
        this.questionId = questionId;
        this.choiceText = choiceText;
        this.correct = correct;
    }

    public Long getId() {
        return id;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public String getChoiceText() {
        return choiceText;
    }

    public Boolean getCorrect() {
        return correct;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public void setChoiceText(String choiceText) {
        this.choiceText = choiceText;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }
}
