package com.quizgame.backend.repository;

import com.quizgame.backend.model.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {
	List<Choice> findByQuestionIdOrderByIdAsc(Long questionId);
}