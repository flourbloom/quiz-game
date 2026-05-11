package com.quizgame.backend.controller;

import com.quizgame.backend.dto.AnswerListDTO;
import com.quizgame.backend.dto.ChoiceListDTO;
import com.quizgame.backend.dto.GameResultListDTO;
import com.quizgame.backend.dto.QuestionListDTO;
import com.quizgame.backend.dto.RoomListDTO;
import com.quizgame.backend.dto.RoomPlayerListDTO;
import com.quizgame.backend.dto.UserListDTO;
import com.quizgame.backend.service.LookupService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LookupController {

    // Layered flow: Controller -> Service -> Repository -> Database
    // Lookup endpoints delegate to LookupService which reads from repositories.

    private final LookupService lookupService;

    public LookupController(LookupService lookupService) {
        this.lookupService = lookupService;
    }

    @GetMapping("/answers")
    public List<AnswerListDTO> getAnswers() {
        return lookupService.getAnswers();
    }

    @GetMapping("/choices")
    public List<ChoiceListDTO> getChoices() {
        return lookupService.getChoices();
    }

    @GetMapping({"/game-results", "/game_results"})
    public List<GameResultListDTO> getGameResults() {
        return lookupService.getGameResults();
    }

    @GetMapping("/questions")
    public List<QuestionListDTO> getQuestions() {
        return lookupService.getQuestions();
    }

    @GetMapping({"/room-players", "/room_players"})
    public List<RoomPlayerListDTO> getRoomPlayers() {
        return lookupService.getRoomPlayers();
    }

    @GetMapping("/rooms")
    public List<RoomListDTO> getRooms() {
        return lookupService.getRooms();
    }

    @GetMapping("/users")
    public List<UserListDTO> getUsers() {
        return lookupService.getUsers();
    }
}
