package com.quizgame.backend.dto;

import java.time.LocalDateTime;

public class GameResultListDTO {

    private Long id;
    private Long roomId;
    private Long playerId;
    private Integer totalScore;
    private Integer correctCount;
    private LocalDateTime finishedAt;

    public GameResultListDTO() {}

    public GameResultListDTO(
            Long id,
            Long roomId,
            Long playerId,
            Integer totalScore,
            Integer correctCount,
            LocalDateTime finishedAt
    ) {
        this.id = id;
        this.roomId = roomId;
        this.playerId = playerId;
        this.totalScore = totalScore;
        this.correctCount = correctCount;
        this.finishedAt = finishedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getRoomId() {
        return roomId;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public Integer getTotalScore() {
        return totalScore;
    }

    public Integer getCorrectCount() {
        return correctCount;
    }

    public LocalDateTime getFinishedAt() {
        return finishedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public void setCorrectCount(Integer correctCount) {
        this.correctCount = correctCount;
    }

    public void setFinishedAt(LocalDateTime finishedAt) {
        this.finishedAt = finishedAt;
    }
}
