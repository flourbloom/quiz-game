package com.quizgame.backend.dto;

import java.util.List;

public class RoomDetailsResponse {

    private String roomCode;
    private String status;
    private Long hostId;
    private Long quizId;
    private List<PlayerDTO> players;

    public RoomDetailsResponse() {}

    public RoomDetailsResponse(
            String roomCode,
            String status,
            Long hostId,
            Long quizId,
            List<PlayerDTO> players
    ) {
        this.roomCode = roomCode;
        this.status = status;
        this.hostId = hostId;
        this.quizId = quizId;
        this.players = players;
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

    public List<PlayerDTO> getPlayers() {
        return players;
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

    public void setPlayers(List<PlayerDTO> players) {
        this.players = players;
    }
}
