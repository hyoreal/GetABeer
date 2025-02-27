package be.domain.like.service;

import org.springframework.stereotype.Service;

import be.domain.like.dto.LikeResponseDto;
import be.domain.like.entity.LikeStatus;
import be.domain.like.entity.PairingLike;
import be.domain.like.repository.PairingLikeRepository;
import be.domain.pairing.entity.Pairing;
import be.domain.pairing.repository.PairingRepository;
import be.domain.pairing.service.PairingService;
import be.domain.user.entity.User;
import be.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PairingLikeService {

	private final UserService userService;
	private final PairingService pairingService;
	private final PairingRepository pairingRepository;
	private final PairingLikeRepository pairingLikeRepository;

	public LikeResponseDto clickLike(Long pairingId) {
		User user = userService.getLoginUser();
		Pairing pairing = pairingService.findPairing(pairingId);
		int isUserLike = isUserLikePairing(pairingId, user.getId());

		/* 0이면 추천한 적이 없는 것 -> 추천, 0이 아니면 추천 취소 */
		if (isUserLike == 0) {
			PairingLike pairingLike = PairingLike.builder()
				.pairingLikeStatus(LikeStatus.LIKE)
				.user(user)
				.pairing(pairing)
				.build();

			pairingLikeRepository.save(pairingLike);
			pairing.calculateLikes(pairing.getPairingLikeList().size());
			pairingRepository.save(pairing);

			return LikeResponseDto.builder()
				.isUserLikes(true)
				.build();
		} else {
			PairingLike pairingLike = findPairingLike(pairing.getId(), user.getId());
			pairingLikeRepository.delete(pairingLike);

			pairing.calculateLikes(pairing.getPairingLikeList().size());
			pairingRepository.save(pairing);

			return LikeResponseDto.builder()
				.isUserLikes(false)
				.build();
		}
	}

	/* 유저가 추천한 적 있는지 확인 */
	private int isUserLikePairing(Long pairingId, Long userId) {

		return pairingLikeRepository.findPairingLikeUser(pairingId, userId);
	}

	private PairingLike findPairingLike(Long pairingId, Long userId) {

		return pairingLikeRepository.findPairingLike(pairingId, userId);
	}
}
