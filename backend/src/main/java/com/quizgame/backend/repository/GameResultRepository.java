package com.quizgame.backend.repository;

import com.quizgame.backend.model.GameResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {
    List<GameResult> findByRoomId(Long roomId);
}
