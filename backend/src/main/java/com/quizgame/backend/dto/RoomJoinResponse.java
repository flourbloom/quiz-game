package com.quizgame.backend.dto;

import java.util.List;

public class RoomJoinResponse {

    private String roomCode;
    private Long playerId;
    private String nickname;
    private String status;
    private List<PlayerDTO> players;

    public RoomJoinResponse() {}

    public RoomJoinResponse(
            String roomCode,
            Long playerId,
            String nickname,
            String status,
            List<PlayerDTO> players
    ) {
        this.roomCode = roomCode;
        this.playerId = playerId;
        this.nickname = nickname;
        this.status = status;
        this.players = players;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public String getNickname() {
        return nickname;
    }

    public String getStatus() {
        return status;
    }

    public List<PlayerDTO> getPlayers() {
        return players;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPlayers(List<PlayerDTO> players) {
        this.players = players;
    }
}
