package com.quizgame.backend.controller;

import com.quizgame.backend.dto.AnswerResultDTO;
import com.quizgame.backend.dto.GameResultDTO;
import com.quizgame.backend.dto.NextQuestionRequest;
import com.quizgame.backend.dto.QuestionDTO;
import com.quizgame.backend.dto.RoomCodeRequest;
import com.quizgame.backend.dto.SubmitAnswerRequest;
import com.quizgame.backend.service.GameService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("/start")
    public void startGame(@RequestBody RoomCodeRequest request) {
        gameService.startGame(request.getRoomCode());
    }

    @PostMapping("/next")
    public QuestionDTO nextQuestion(@RequestBody NextQuestionRequest request) {
        return gameService.nextQuestion(request.getRoomCode(), request.getQuestionIndex());
    }

    @PostMapping("/answer")
    public AnswerResultDTO submitAnswer(@RequestBody SubmitAnswerRequest request) {
        return gameService.submitAnswer(request.getRoomCode(), request);
    }

    @PostMapping("/end")
    public void endGame(@RequestBody RoomCodeRequest request) {
        gameService.endGame(request.getRoomCode());
    }

    @GetMapping("/{roomCode}/results")
    public List<GameResultDTO> getResults(@PathVariable String roomCode) {
        return gameService.getResults(roomCode);
    }
}
