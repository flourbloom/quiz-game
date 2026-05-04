package com.quizgame.backend.dto;

public class PlayerDTO {

    private Long id;
    private String nickname;
    private Integer score;
    private Boolean host;

    public PlayerDTO() {}

    public PlayerDTO(Long id, String nickname, Integer score, Boolean host) {
        this.id = id;
        this.nickname = nickname;
        this.score = score;
        this.host = host;
    }

    public Long getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public Integer getScore() {
        return score;
    }

    public Boolean getHost() {
        return host;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public void setHost(Boolean host) {
        this.host = host;
    }
}
