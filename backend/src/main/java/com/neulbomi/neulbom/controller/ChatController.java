package com.neulbomi.neulbom.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import com.neulbomi.neulbom.dto.ChatMessageDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class ChatController {

	private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/chat/message")
	public void message(ChatMessageDto message) {

//		if (ChatMessage.MessageType.ENTER.equals(message.getType()))
//			message.setMessage(message.getSender() + "님이 입장하셨습니다.");
		messagingTemplate.convertAndSend("/api/sub/chat/room/" + message.getRoomId(), message);

	}
}