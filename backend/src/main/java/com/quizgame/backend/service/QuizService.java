package com.quizgame.backend.service;

import com.quizgame.backend.dto.QuizRequestDTO;
import com.quizgame.backend.dto.QuizResponseDTO;
import com.quizgame.backend.model.Quiz;
import com.quizgame.backend.model.User;
import com.quizgame.backend.repository.QuizRepository;
import com.quizgame.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    public QuizService(
            QuizRepository quizRepository,
            UserRepository userRepository
    ) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
    }

    public QuizResponseDTO createQuiz(QuizRequestDTO request) {
        if (request.getCreatorId() == null) {
            throw new RuntimeException("CreatorId is required");
        }

        User creator = userRepository.findById(request.getCreatorId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setCreator(creator);

        Quiz savedQuiz = quizRepository.save(quiz);

        return new QuizResponseDTO(
                savedQuiz.getId(),
                savedQuiz.getTitle(),
                savedQuiz.getDescription()
        );
    }

    public List<QuizResponseDTO> getAllQuizzes() {
        return quizRepository.findAll()
                .stream()
                .map(quiz -> new QuizResponseDTO(
                        quiz.getId(),
                        quiz.getTitle(),
                        quiz.getDescription()
                ))
                .collect(Collectors.toList());
    }

    public QuizResponseDTO getQuizById(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        return new QuizResponseDTO(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getDescription()
        );
    }

    public QuizResponseDTO updateQuiz(Long id, QuizRequestDTO request) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (request.getTitle() != null) {
            quiz.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            quiz.setDescription(request.getDescription());
        }

        Quiz savedQuiz = quizRepository.save(quiz);

        return new QuizResponseDTO(
                savedQuiz.getId(),
                savedQuiz.getTitle(),
                savedQuiz.getDescription()
        );
    }

    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }
} 