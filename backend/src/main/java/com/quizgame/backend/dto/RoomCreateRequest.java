package com.quizgame.backend.dto;

public class RoomCreateRequest {

    private Long quizId;
    private Long hostId;
    private String hostName;

    public RoomCreateRequest() {}

    public RoomCreateRequest(Long quizId, Long hostId) {
        this.quizId = quizId;
        this.hostId = hostId;
    }

    public RoomCreateRequest(Long quizId, Long hostId, String hostName) {
        this.quizId = quizId;
        this.hostId = hostId;
        this.hostName = hostName;
    }

    public Long getQuizId() {
        return quizId;
    }

    public Long getHostId() {
        return hostId;
    }

    public String getHostName() {
        return hostName;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public void setHostId(Long hostId) {
        this.hostId = hostId;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }
}
