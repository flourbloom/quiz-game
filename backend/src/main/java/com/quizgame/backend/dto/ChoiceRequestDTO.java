package com.quizgame.backend.dto;

public class ChoiceRequestDTO {

    private String choiceText;
    private Boolean isCorrect;

    public ChoiceRequestDTO() {}

    public ChoiceRequestDTO(String choiceText, Boolean isCorrect) {
        this.choiceText = choiceText;
        this.isCorrect = isCorrect;
    }

    public String getChoiceText() {
        return choiceText;
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setChoiceText(String choiceText) {
        this.choiceText = choiceText;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }
}