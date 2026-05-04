package com.quizgame.backend.service;

import com.quizgame.backend.dto.AnswerListDTO;
import com.quizgame.backend.dto.ChoiceListDTO;
import com.quizgame.backend.dto.GameResultListDTO;
import com.quizgame.backend.dto.QuestionListDTO;
import com.quizgame.backend.dto.RoomListDTO;
import com.quizgame.backend.dto.RoomPlayerListDTO;
import com.quizgame.backend.dto.UserListDTO;
import com.quizgame.backend.model.Answer;
import com.quizgame.backend.model.Choice;
import com.quizgame.backend.model.GameResult;
import com.quizgame.backend.model.Question;
import com.quizgame.backend.model.Room;
import com.quizgame.backend.model.RoomPlayer;
import com.quizgame.backend.model.User;
import com.quizgame.backend.repository.AnswerRepository;
import com.quizgame.backend.repository.ChoiceRepository;
import com.quizgame.backend.repository.GameResultRepository;
import com.quizgame.backend.repository.QuestionRepository;
import com.quizgame.backend.repository.RoomPlayerRepository;
import com.quizgame.backend.repository.RoomRepository;
import com.quizgame.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LookupService {

    private final AnswerRepository answerRepository;
    private final ChoiceRepository choiceRepository;
    private final GameResultRepository gameResultRepository;
    private final QuestionRepository questionRepository;
    private final RoomPlayerRepository roomPlayerRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public LookupService(
            AnswerRepository answerRepository,
            ChoiceRepository choiceRepository,
            GameResultRepository gameResultRepository,
            QuestionRepository questionRepository,
            RoomPlayerRepository roomPlayerRepository,
            RoomRepository roomRepository,
            UserRepository userRepository
    ) {
        this.answerRepository = answerRepository;
        this.choiceRepository = choiceRepository;
        this.gameResultRepository = gameResultRepository;
        this.questionRepository = questionRepository;
        this.roomPlayerRepository = roomPlayerRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    public List<AnswerListDTO> getAnswers() {
        return answerRepository.findAll()
                .stream()
                .map(this::toAnswerListDTO)
                .collect(Collectors.toList());
    }

    public List<ChoiceListDTO> getChoices() {
        return choiceRepository.findAll()
                .stream()
                .map(this::toChoiceListDTO)
                .collect(Collectors.toList());
    }

    public List<GameResultListDTO> getGameResults() {
        return gameResultRepository.findAll()
                .stream()
                .map(this::toGameResultListDTO)
                .collect(Collectors.toList());
    }

    public List<QuestionListDTO> getQuestions() {
        return questionRepository.findAll()
                .stream()
                .map(this::toQuestionListDTO)
                .collect(Collectors.toList());
    }

    public List<RoomPlayerListDTO> getRoomPlayers() {
        return roomPlayerRepository.findAll()
                .stream()
                .map(this::toRoomPlayerListDTO)
                .collect(Collectors.toList());
    }

    public List<RoomListDTO> getRooms() {
        return roomRepository.findAll()
                .stream()
                .map(this::toRoomListDTO)
                .collect(Collectors.toList());
    }

    public List<UserListDTO> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toUserListDTO)
                .collect(Collectors.toList());
    }

    private AnswerListDTO toAnswerListDTO(Answer answer) {
        return new AnswerListDTO(
                answer.getId(),
                answer.getRoom() != null ? answer.getRoom().getId() : null,
                answer.getQuestion() != null ? answer.getQuestion().getId() : null,
                answer.getChoice() != null ? answer.getChoice().getId() : null,
                answer.getPlayer() != null ? answer.getPlayer().getId() : null,
                answer.getCorrect(),
                answer.getPoints(),
                answer.getTimeTakenMs(),
                answer.getAnsweredAt()
        );
    }

    private ChoiceListDTO toChoiceListDTO(Choice choice) {
        return new ChoiceListDTO(
                choice.getId(),
                choice.getQuestion() != null ? choice.getQuestion().getId() : null,
                choice.getChoiceText(),
                choice.getIsCorrect()
        );
    }

    private GameResultListDTO toGameResultListDTO(GameResult result) {
        return new GameResultListDTO(
                result.getId(),
                result.getRoom() != null ? result.getRoom().getId() : null,
                result.getPlayer() != null ? result.getPlayer().getId() : null,
                result.getTotalScore(),
                result.getCorrectCount(),
                result.getFinishedAt()
        );
    }

    private QuestionListDTO toQuestionListDTO(Question question) {
        return new QuestionListDTO(
                question.getId(),
                question.getQuiz() != null ? question.getQuiz().getId() : null,
                question.getQuestionText(),
                question.getTimeLimit()
        );
    }

    private RoomPlayerListDTO toRoomPlayerListDTO(RoomPlayer player) {
        return new RoomPlayerListDTO(
                player.getId(),
                player.getRoom() != null ? player.getRoom().getId() : null,
                player.getUser() != null ? player.getUser().getId() : null,
                player.getNickname(),
                player.getHost(),
                player.getScore(),
                player.getJoinedAt()
        );
    }

    private RoomListDTO toRoomListDTO(Room room) {
        return new RoomListDTO(
                room.getId(),
                room.getRoomCode(),
                room.getStatus() != null ? room.getStatus().name() : null,
                room.getHost() != null ? room.getHost().getId() : null,
                room.getQuiz() != null ? room.getQuiz().getId() : null,
                room.getCreatedAt(),
                room.getStartedAt(),
                room.getEndedAt()
        );
    }

    private UserListDTO toUserListDTO(User user) {
        return new UserListDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
