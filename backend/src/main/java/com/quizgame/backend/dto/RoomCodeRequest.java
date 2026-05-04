package com.quizgame.backend.dto;

public class RoomCodeRequest {

    private String roomCode;

    public RoomCodeRequest() {}

    public RoomCodeRequest(String roomCode) {
        this.roomCode = roomCode;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }
}
