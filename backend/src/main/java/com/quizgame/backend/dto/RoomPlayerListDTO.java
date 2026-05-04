package com.quizgame.backend.dto;

import java.time.LocalDateTime;

public class RoomPlayerListDTO {

    private Long id;
    private Long roomId;
    private Long userId;
    private String nickname;
    private Boolean host;
    private Integer score;
    private LocalDateTime joinedAt;

    public RoomPlayerListDTO() {}

    public RoomPlayerListDTO(
            Long id,
            Long roomId,
            Long userId,
            String nickname,
            Boolean host,
            Integer score,
            LocalDateTime joinedAt
    ) {
        this.id = id;
        this.roomId = roomId;
        this.userId = userId;
        this.nickname = nickname;
        this.host = host;
        this.score = score;
        this.joinedAt = joinedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getRoomId() {
        return roomId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getNickname() {
        return nickname;
    }

    public Boolean getHost() {
        return host;
    }

    public Integer getScore() {
        return score;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setHost(Boolean host) {
        this.host = host;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }
}
