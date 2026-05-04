package com.quizgame.backend.dto;

public class QuestionListDTO {

    private Long id;
    private Long quizId;
    private String questionText;
    private Integer timeLimit;

    public QuestionListDTO() {}

    public QuestionListDTO(Long id, Long quizId, String questionText, Integer timeLimit) {
        this.id = id;
        this.quizId = quizId;
        this.questionText = questionText;
        this.timeLimit = timeLimit;
    }

    public Long getId() {
        return id;
    }

    public Long getQuizId() {
        return quizId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public Integer getTimeLimit() {
        return timeLimit;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public void setTimeLimit(Integer timeLimit) {
        this.timeLimit = timeLimit;
    }
}
