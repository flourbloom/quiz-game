package com.quizgame.backend.dto;

import java.time.LocalDateTime;

public class AnswerListDTO {

    private Long id;
    private Long roomId;
    private Long questionId;
    private Long choiceId;
    private Long playerId;
    private Boolean correct;
    private Integer points;
    private Long timeTakenMs;
    private LocalDateTime answeredAt;

    public AnswerListDTO() {}

    public AnswerListDTO(
            Long id,
            Long roomId,
            Long questionId,
            Long choiceId,
            Long playerId,
            Boolean correct,
            Integer points,
            Long timeTakenMs,
            LocalDateTime answeredAt
    ) {
        this.id = id;
        this.roomId = roomId;
        this.questionId = questionId;
        this.choiceId = choiceId;
        this.playerId = playerId;
        this.correct = correct;
        this.points = points;
        this.timeTakenMs = timeTakenMs;
        this.answeredAt = answeredAt;
    }

    public Long getId() {
        return id;
    }

    public Long getRoomId() {
        return roomId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public Long getChoiceId() {
        return choiceId;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public Boolean getCorrect() {
        return correct;
    }

    public Integer getPoints() {
        return points;
    }

    public Long getTimeTakenMs() {
        return timeTakenMs;
    }

    public LocalDateTime getAnsweredAt() {
        return answeredAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public void setChoiceId(Long choiceId) {
        this.choiceId = choiceId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public void setTimeTakenMs(Long timeTakenMs) {
        this.timeTakenMs = timeTakenMs;
    }

    public void setAnsweredAt(LocalDateTime answeredAt) {
        this.answeredAt = answeredAt;
    }
}
