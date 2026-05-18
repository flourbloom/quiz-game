package com.quizgame.backend.service;

import com.quizgame.backend.dto.ChoiceRequestDTO;
import com.quizgame.backend.dto.QuestionRequestDTO;
import com.quizgame.backend.dto.QuizRequestDTO;
import com.quizgame.backend.dto.QuizResponseDTO;
import com.quizgame.backend.model.Choice;
import com.quizgame.backend.model.Question;
import com.quizgame.backend.model.Quiz;
import com.quizgame.backend.model.User;
import com.quizgame.backend.repository.QuizRepository;
import com.quizgame.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
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
        quiz.setQuestions(mapQuestions(request, quiz));

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

    private List<Question> mapQuestions(QuizRequestDTO request, Quiz quiz) {
        List<QuestionRequestDTO> questionRequests = request.getQuestions();
        if (questionRequests == null || questionRequests.isEmpty()) {
            return new ArrayList<>();
        }

        List<Question> questions = new ArrayList<>();
        for (QuestionRequestDTO questionRequest : questionRequests) {
            Question question = new Question();
            question.setQuestionText(questionRequest.getQuestionText());
            question.setTimeLimit(questionRequest.getTimeLimit());
            question.setQuiz(quiz);
            question.setChoices(mapChoices(questionRequest, question));
            questions.add(question);
        }

        return questions;
    }

    private List<Choice> mapChoices(QuestionRequestDTO questionRequest, Question question) {
        List<ChoiceRequestDTO> choiceRequests = questionRequest.getChoices();
        if (choiceRequests == null || choiceRequests.isEmpty()) {
            return new ArrayList<>();
        }

        List<Choice> choices = new ArrayList<>();
        int correctChoiceIndex = resolveCorrectChoiceIndex(questionRequest);
        for (int index = 0; index < choiceRequests.size(); index++) {
            ChoiceRequestDTO choiceRequest = choiceRequests.get(index);
            Choice choice = new Choice();
            choice.setChoiceText(choiceRequest.getChoiceText());
            choice.setIsCorrect(index == correctChoiceIndex);
            choice.setQuestion(question);
            choices.add(choice);
        }

        return choices;
    }

    private int resolveCorrectChoiceIndex(QuestionRequestDTO questionRequest) {
        List<ChoiceRequestDTO> choiceRequests = questionRequest.getChoices();
        if (choiceRequests == null || choiceRequests.isEmpty()) {
            return -1;
        }

        String correctAnswer = normalize(questionRequest.getCorrectAnswer());
        if (correctAnswer.isEmpty()) {
            return choiceRequests.size() == 1 ? 0 : -1;
        }

        if (correctAnswer.matches("[abcd]")) {
            int aliasIndex = correctAnswer.charAt(0) - 'a';
            if (aliasIndex >= 0 && aliasIndex < choiceRequests.size()) {
                return aliasIndex;
            }
        }

        if (correctAnswer.matches("answer[1-4]")) {
            int aliasIndex = Integer.parseInt(correctAnswer.substring(6)) - 1;
            if (aliasIndex >= 0 && aliasIndex < choiceRequests.size()) {
                return aliasIndex;
            }
        }

        for (int index = 0; index < choiceRequests.size(); index++) {
            if (normalize(choiceRequests.get(index).getChoiceText()).equals(correctAnswer)) {
                return index;
            }
        }

        return choiceRequests.size() == 1 ? 0 : -1;
    }

    private String normalize(String value) {
        if (value == null) {
            return "";
        }

        return value.trim().toLowerCase(Locale.ROOT);
    }
} 