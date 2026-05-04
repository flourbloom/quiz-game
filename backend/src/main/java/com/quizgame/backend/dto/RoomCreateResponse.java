package com.quizgame.backend.dto;

public class RoomCreateResponse {

    private String roomCode;
    private String joinUrl;

    public RoomCreateResponse() {}

    public RoomCreateResponse(String roomCode, String joinUrl) {
        this.roomCode = roomCode;
        this.joinUrl = joinUrl;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public String getJoinUrl() {
        return joinUrl;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }

    public void setJoinUrl(String joinUrl) {
        this.joinUrl = joinUrl;
    }
}
