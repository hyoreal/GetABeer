package be.domain.chat.redis.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class RedisRoomDto {

	@Getter
	// @Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Response{
		private Long roomId;
		private Long senderId;
		private boolean isAdminRead;

		// public boolean isAdminRead(RedisChatRoom chatRoom) {
		// 	return chatRoom.getReceiver() != null;
		// }
	}
}
