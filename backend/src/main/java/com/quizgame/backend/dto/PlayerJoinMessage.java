package com.quizgame.backend.dto;

public class PlayerJoinMessage {

    private Long playerId;

    public PlayerJoinMessage() {}

    public PlayerJoinMessage(Long playerId) {
        this.playerId = playerId;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }
}
