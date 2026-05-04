package com.quizgame.backend.dto;

public class RoomJoinRequest {

    private String roomCode;
    private String nickname;
    private Long userId;

    public RoomJoinRequest() {}

    public RoomJoinRequest(String roomCode, String nickname, Long userId) {
        this.roomCode = roomCode;
        this.nickname = nickname;
        this.userId = userId;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public String getNickname() {
        return nickname;
    }

    public Long getUserId() {
        return userId;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
