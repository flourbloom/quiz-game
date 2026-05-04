package com.quizgame.backend.dto;

public class ChoiceDTO {

    private Long id;
    private String choiceText;

    public ChoiceDTO() {}

    public ChoiceDTO(Long id, String choiceText) {
        this.id = id;
        this.choiceText = choiceText;
    }

    public Long getId() {
        return id;
    }

    public String getChoiceText() {
        return choiceText;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setChoiceText(String choiceText) {
        this.choiceText = choiceText;
    }
}
