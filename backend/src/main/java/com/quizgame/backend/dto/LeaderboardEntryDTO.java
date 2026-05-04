package com.quizgame.backend.dto;

public class LeaderboardEntryDTO {

    private Long playerId;
    private String nickname;
    private Integer score;

    public LeaderboardEntryDTO() {}

    public LeaderboardEntryDTO(Long playerId, String nickname, Integer score) {
        this.playerId = playerId;
        this.nickname = nickname;
        this.score = score;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public String getNickname() {
        return nickname;
    }

    public Integer getScore() {
        return score;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
