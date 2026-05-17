package com.quizgame.backend.controller;

import com.quizgame.backend.dto.AiQuizGenerationRequest;
import com.quizgame.backend.dto.AiQuizGenerationResponse;
import com.quizgame.backend.exception.BadRequestException;
import com.quizgame.backend.service.AiQuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Slf4j
@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AiQuizController {

    private final AiQuizService aiQuizService;

    @PostMapping("/generate-quiz")
    public ResponseEntity<AiQuizGenerationResponse> generateQuizFromDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("difficulty") String difficulty,
            @RequestParam("questionType") String questionType,
            @RequestParam("numberOfQuestions") Integer numberOfQuestions) {
        log.info("Generating quiz from file: {}, difficulty: {}, type: {}, questions: {}",
            file.getOriginalFilename(), difficulty, questionType, numberOfQuestions);

        AiQuizGenerationRequest request = new AiQuizGenerationRequest(
            difficulty,
            questionType,
            numberOfQuestions,
            null,
            file.getOriginalFilename()
        );

        try (InputStream inputStream = file.getInputStream()) {
            AiQuizGenerationResponse response = aiQuizService.generateQuizFromDocument(
                request, inputStream, file.getOriginalFilename());
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            throw new BadRequestException("Failed to read uploaded file.");
        }
    }
}
