package com.quizgame.backend.controller;

import com.quizgame.backend.dto.RoomCreateRequest;
import com.quizgame.backend.dto.RoomCreateResponse;
import com.quizgame.backend.dto.RoomDetailsResponse;
import com.quizgame.backend.dto.RoomJoinRequest;
import com.quizgame.backend.dto.RoomJoinResponse;
import com.quizgame.backend.service.RoomService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    // Layered flow: Controller -> Service -> Repository -> Database
    // This controller delegates all business logic to RoomService.

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping
    public RoomCreateResponse createRoom(@RequestBody RoomCreateRequest request) {
        return roomService.createRoom(request);
    }

    @PostMapping("/join")
    public RoomJoinResponse joinRoom(@RequestBody RoomJoinRequest request) {
        return roomService.joinRoom(request);
    }

    @GetMapping("/{roomCode}")
    public RoomDetailsResponse getRoom(@PathVariable String roomCode) {
        return roomService.getRoomByCode(roomCode);
    }
}
