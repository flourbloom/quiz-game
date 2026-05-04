package com.quizgame.backend.dto;

import java.util.List;

public class PlayerJoinedPayload {

    private PlayerDTO player;
    private List<PlayerDTO> players;

    public PlayerJoinedPayload() {}

    public PlayerJoinedPayload(PlayerDTO player, List<PlayerDTO> players) {
        this.player = player;
        this.players = players;
    }

    public PlayerDTO getPlayer() {
        return player;
    }

    public List<PlayerDTO> getPlayers() {
        return players;
    }

    public void setPlayer(PlayerDTO player) {
        this.player = player;
    }

    public void setPlayers(List<PlayerDTO> players) {
        this.players = players;
    }
}
