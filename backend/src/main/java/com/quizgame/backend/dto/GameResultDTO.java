package com.quizgame.backend.dto;

public class GameResultDTO {

    private Long playerId;
    private String nickname;
    private Integer totalScore;
    private Integer correctCount;

    public GameResultDTO() {}

    public GameResultDTO(Long playerId, String nickname, Integer totalScore, Integer correctCount) {
        this.playerId = playerId;
        this.nickname = nickname;
        this.totalScore = totalScore;
        this.correctCount = correctCount;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public String getNickname() {
        return nickname;
    }

    public Integer getTotalScore() {
        return totalScore;
    }

    public Integer getCorrectCount() {
        return correctCount;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public void setCorrectCount(Integer correctCount) {
        this.correctCount = correctCount;
    }
}
