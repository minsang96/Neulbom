package com.neulbomi.neulbom.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {

	// 채팅방 생성
	@Override
	public String createChatRoom() {
		return UUID.randomUUID().toString();
	}

}
