package com.quizgame.backend.dto;

public class RoomCreateRequest {

    private Long quizId;
    private Long hostId;

    public RoomCreateRequest() {}

    public RoomCreateRequest(Long quizId, Long hostId) {
        this.quizId = quizId;
        this.hostId = hostId;
    }

    public Long getQuizId() {
        return quizId;
    }

    public Long getHostId() {
        return hostId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public void setHostId(Long hostId) {
        this.hostId = hostId;
    }
}
