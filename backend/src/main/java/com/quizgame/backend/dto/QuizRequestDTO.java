package com.quizgame.backend.dto;

import java.util.List;

public class QuizRequestDTO {

    private String title;
    private String description;
    private Long creatorId;
    private List<QuestionRequestDTO> questions;

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

    public List<QuestionRequestDTO> getQuestions() {
        return questions;
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

    public void setQuestions(List<QuestionRequestDTO> questions) {
        this.questions = questions;
    }
}