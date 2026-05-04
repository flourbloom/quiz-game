package com.quizgame.backend.dto;

import java.time.LocalDateTime;

public class RoomListDTO {

    private Long id;
    private String roomCode;
    private String status;
    private Long hostId;
    private Long quizId;
    private LocalDateTime createdAt;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;

    public RoomListDTO() {}

    public RoomListDTO(
            Long id,
            String roomCode,
            String status,
            Long hostId,
            Long quizId,
            LocalDateTime createdAt,
            LocalDateTime startedAt,
            LocalDateTime endedAt
    ) {
        this.id = id;
        this.roomCode = roomCode;
        this.status = status;
        this.hostId = hostId;
        this.quizId = quizId;
        this.createdAt = createdAt;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
    }

    public Long getId() {
        return id;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public String getStatus() {
        return status;
    }

    public Long getHostId() {
        return hostId;
    }

    public Long getQuizId() {
        return quizId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setHostId(Long hostId) {
        this.hostId = hostId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
    }
}
