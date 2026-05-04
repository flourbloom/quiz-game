package com.quizgame.backend.dto;

import java.time.Instant;

public class GameEvent {

    private String type;
    private Object data;
    private Instant timestamp;

    public GameEvent() {}

    public GameEvent(String type, Object data) {
        this.type = type;
        this.data = data;
        this.timestamp = Instant.now();
    }

    public String getType() {
        return type;
    }

    public Object getData() {
        return data;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
}
