package com.neulbomi.neulbom.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SocketUserDto {

    public SocketUserDto() {
    }

    @Builder
    public SocketUserDto(SocketType type, String roomId, int senderSeq, int recvSeq, String time) {
        this.type = type;
        this.roomId = roomId;
        this.senderSeq = senderSeq;
        this.recvSeq = recvSeq;
        this.time = time;
    }

    // 메시지 타입 : 채팅방 생성
    public enum SocketType {
        CREATE 
    }

    private SocketType type; // 메시지 타입
    private String roomId;	 // 방번호
    private int senderSeq;	 // 방 만든 사람
    private int recvSeq; 	 // 초대 받은 사람 
    private String time;     // 이벤트 발생 시간
}
