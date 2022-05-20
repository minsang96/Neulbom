package com.neulbomi.neulbom.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import com.neulbomi.neulbom.dto.ChatMessageDto;
import com.neulbomi.neulbom.dto.SocketUserDto;

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
    
    // User가 로그인하면, /api/sub/user/{userSeq} 구독하기
    @MessageMapping("/user")
	public void connect(SocketUserDto socketUser) {
    	// A가 방 생성하면 방 생성하고, B에게 생성 알림 가게
    	// B에서 알림 받고 방 구독하도록
		if (SocketUserDto.SocketType.CREATE.equals(socketUser.getType())) 
			messagingTemplate.convertAndSend("/api/sub/user/" + socketUser.getRecvSeq(), socketUser);
	}
}
