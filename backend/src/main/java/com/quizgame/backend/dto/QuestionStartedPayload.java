package com.quizgame.backend.dto;

public class QuestionStartedPayload {

    private QuestionDTO question;
    private Integer questionIndex;
    private Integer totalQuestions;

    public QuestionStartedPayload() {}

    public QuestionStartedPayload(QuestionDTO question, Integer questionIndex, Integer totalQuestions) {
        this.question = question;
        this.questionIndex = questionIndex;
        this.totalQuestions = totalQuestions;
    }

    public QuestionDTO getQuestion() {
        return question;
    }

    public Integer getQuestionIndex() {
        return questionIndex;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setQuestion(QuestionDTO question) {
        this.question = question;
    }

    public void setQuestionIndex(Integer questionIndex) {
        this.questionIndex = questionIndex;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }
}
