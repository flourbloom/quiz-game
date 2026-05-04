package com.quizgame.backend.dto;

public class QuizResponseDTO {

    private Long id;
    private String title;
    private String description;

    public QuizResponseDTO() {}

    public QuizResponseDTO(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}