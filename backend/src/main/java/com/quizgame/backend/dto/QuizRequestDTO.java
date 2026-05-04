package com.quizgame.backend.dto;

public class QuizRequestDTO {

    private String title;
    private String description;
    private Long creatorId;

    public QuizRequestDTO() {}

    public QuizRequestDTO(String title, String description, Long creatorId) {
        this.title = title;
        this.description = description;
        this.creatorId = creatorId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }
}