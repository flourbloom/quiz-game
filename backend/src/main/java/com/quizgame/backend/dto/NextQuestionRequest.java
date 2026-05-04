package com.quizgame.backend.dto;

public class NextQuestionRequest {

    private String roomCode;
    private Integer questionIndex;

    public NextQuestionRequest() {}

    public NextQuestionRequest(String roomCode, Integer questionIndex) {
        this.roomCode = roomCode;
        this.questionIndex = questionIndex;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public Integer getQuestionIndex() {
        return questionIndex;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }

    public void setQuestionIndex(Integer questionIndex) {
        this.questionIndex = questionIndex;
    }
}
