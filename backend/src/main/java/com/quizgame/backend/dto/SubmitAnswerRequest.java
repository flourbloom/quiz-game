package com.quizgame.backend.dto;

public class SubmitAnswerRequest {

    private String roomCode;
    private Long playerId;
    private Long questionId;
    private Long choiceId;
    private Long timeTakenMs;

    public SubmitAnswerRequest() {}

    public SubmitAnswerRequest(
            String roomCode,
            Long playerId,
            Long questionId,
            Long choiceId,
            Long timeTakenMs
    ) {
        this.roomCode = roomCode;
        this.playerId = playerId;
        this.questionId = questionId;
        this.choiceId = choiceId;
        this.timeTakenMs = timeTakenMs;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public Long getChoiceId() {
        return choiceId;
    }

    public Long getTimeTakenMs() {
        return timeTakenMs;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public void setChoiceId(Long choiceId) {
        this.choiceId = choiceId;
    }

    public void setTimeTakenMs(Long timeTakenMs) {
        this.timeTakenMs = timeTakenMs;
    }
}
