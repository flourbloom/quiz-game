package com.quizgame.backend.controller;

import com.quizgame.backend.dto.QuizRequestDTO;
import com.quizgame.backend.dto.QuizResponseDTO;
import com.quizgame.backend.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping
    public QuizResponseDTO createQuiz(
            @RequestBody QuizRequestDTO request
    ) {
        return quizService.createQuiz(request);
    }

    @GetMapping
    public List<QuizResponseDTO> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @GetMapping("/{id}")
    public QuizResponseDTO getQuizById(
            @PathVariable Long id
    ) {
        return quizService.getQuizById(id);
    }

    @PutMapping("/{id}")
    public QuizResponseDTO updateQuiz(
            @PathVariable Long id,
            @RequestBody QuizRequestDTO request
    ) {
        return quizService.updateQuiz(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteQuiz(
            @PathVariable Long id
    ) {
        quizService.deleteQuiz(id);
    }
}