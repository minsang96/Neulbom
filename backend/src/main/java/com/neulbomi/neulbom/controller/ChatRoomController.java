package com.neulbomi.neulbom.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.neulbomi.neulbom.dto.ChatRoom;
import com.neulbomi.neulbom.repository.ChatRoomRepository;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.ChatRoomService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

	private final ChatRoomRepository chatRoomRepository;
	
	ChatRoomService chatRoomService;
	
	// 채팅 리스트 화면
	@GetMapping("/room")
	public String rooms(Model model) {
		return "/chat/room";
	}

	// 모든 채팅방 목록 반환
	@GetMapping("/rooms")
	@ResponseBody
	public List<ChatRoom> room() {
		return chatRoomRepository.findAllRoom();
	}

	// 채팅방 생성
	@PostMapping("/room")
	public ResponseEntity<? extends BaseResponseBody> createRoom() {
		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "채팅방 ID 생성 성공", chatRoomService.createChatRoom()));
	}

	// 채팅방 입장 화면
	@GetMapping("/room/enter/{roomId}")
	public String roomDetail(Model model, @PathVariable String roomId) {
		model.addAttribute("roomId", roomId);
		return "/chat/roomdetail";
	}

	// 특정 채팅방 조회
	@GetMapping("/room/{roomId}")
	@ResponseBody
	public ChatRoom roomInfo(@PathVariable String roomId) {
		return chatRoomRepository.findRoomById(roomId);
	}
}