package com.quizgame.backend.websocket;

import com.quizgame.backend.dto.NextQuestionRequest;
import com.quizgame.backend.dto.PlayerJoinMessage;
import com.quizgame.backend.dto.SubmitAnswerRequest;
import com.quizgame.backend.service.GameService;
import com.quizgame.backend.service.RoomService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class GameWebSocketController {

    private final RoomService roomService;
    private final GameService gameService;

    public GameWebSocketController(RoomService roomService, GameService gameService) {
        this.roomService = roomService;
        this.gameService = gameService;
    }

    // Note: WebSocket controller receives STOMP messages and forwards them
    // to the service layer (Service -> Repository -> Database). This
    // follows the layered flow but via message handlers instead of HTTP.

    @MessageMapping("/room/{roomCode}/join")
    public void playerJoin(@DestinationVariable String roomCode, PlayerJoinMessage message) {
        if (message != null && message.getPlayerId() != null) {
            roomService.broadcastPlayerJoined(roomCode, message.getPlayerId());
        }
    }

    @MessageMapping("/room/{roomCode}/start")
    public void startGame(@DestinationVariable String roomCode) {
        gameService.startGame(roomCode);
    }

    @MessageMapping("/room/{roomCode}/next")
    public void nextQuestion(@DestinationVariable String roomCode, NextQuestionRequest request) {
        Integer index = request != null ? request.getQuestionIndex() : null;
        gameService.nextQuestion(roomCode, index);
    }

    @MessageMapping("/room/{roomCode}/answer")
    public void submitAnswer(@DestinationVariable String roomCode, SubmitAnswerRequest request) {
        gameService.submitAnswer(roomCode, request);
    }

    @MessageMapping("/room/{roomCode}/end")
    public void endGame(@DestinationVariable String roomCode) {
        gameService.endGame(roomCode);
    }
}
