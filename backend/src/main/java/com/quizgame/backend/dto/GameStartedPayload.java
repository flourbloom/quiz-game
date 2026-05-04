package com.quizgame.backend.dto;

import java.time.LocalDateTime;

public class GameStartedPayload {

    private String roomCode;
    private LocalDateTime startedAt;

    public GameStartedPayload() {}

    public GameStartedPayload(String roomCode, LocalDateTime startedAt) {
        this.roomCode = roomCode;
        this.startedAt = startedAt;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }
}
