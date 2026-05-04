package com.quizgame.backend.dto;

public class AnswerResultDTO {

    private Long playerId;
    private Boolean correct;
    private Integer points;
    private Integer totalScore;

    public AnswerResultDTO() {}

    public AnswerResultDTO(Long playerId, Boolean correct, Integer points, Integer totalScore) {
        this.playerId = playerId;
        this.correct = correct;
        this.points = points;
        this.totalScore = totalScore;
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

    public Integer getTotalScore() {
        return totalScore;
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

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }
}
