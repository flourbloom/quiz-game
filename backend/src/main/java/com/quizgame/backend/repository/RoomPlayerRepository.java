package com.quizgame.backend.repository;

import com.quizgame.backend.model.RoomPlayer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomPlayerRepository extends JpaRepository<RoomPlayer, Long> {
    List<RoomPlayer> findByRoomIdOrderByJoinedAtAsc(Long roomId);
    Optional<RoomPlayer> findByRoomIdAndNicknameIgnoreCase(Long roomId, String nickname);
    boolean existsByRoomIdAndNicknameIgnoreCase(Long roomId, String nickname);
}
