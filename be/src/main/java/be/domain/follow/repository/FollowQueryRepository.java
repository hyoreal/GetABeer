package be.domain.follow.repository;

import static be.domain.follow.entity.QFollow.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import be.domain.follow.entity.Follow;
import be.domain.user.entity.User;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FollowQueryRepository {
	private final JPAQueryFactory jpaQueryFactory;

	public Follow findFollowByUserIds(Long followingUserId, Long followedUserId) {

		return jpaQueryFactory.selectFrom(follow)
			.where(follow.followingUser.id.eq(followingUserId).and(follow.followedUser.id.eq(followedUserId)))
			.fetchFirst();
	}

	public Page<User> findFollowersByUserId(Long userId, Pageable pageable) {

		List<User> followList =
			jpaQueryFactory.select(follow.followingUser)
				.from(follow)
				// .join(follow.followingUser, user)
				.where(follow.followedUser.id.eq(userId))
				.orderBy(follow.createdAt.desc())
				.offset(pageable.getOffset())
				.limit(pageable.getPageSize())
				.fetch();

		Long total =
			jpaQueryFactory.select(follow.followingUser.count())
				.from(follow)
				// .join(follow.followingUser, user)
				.where(follow.followedUser.id.eq(userId))
				.fetchOne();

		return new PageImpl<>(followList, pageable, total);
	}

	public Page<User> findFollowersWithLoginUserByUserId(Long loginUserId, Long userId, Pageable pageable) {

		User loginUser =
			jpaQueryFactory.select(follow.followingUser)
				.from(follow)
				.where(follow.followingUser.id.eq(loginUserId).and(follow.followedUser.id.eq(userId)))
				.fetchFirst();

		List<User> followList =
			jpaQueryFactory.select(follow.followingUser)
				.from(follow)
				// .join(follow.followingUser, user)
				.where(follow.followingUser.id.ne(loginUserId))
				.where(follow.followedUser.id.eq(userId))
				.orderBy(follow.createdAt.desc())
				.offset(pageable.getOffset())
				.limit(pageable.getPageSize())
				.fetch();

		Long total =
			jpaQueryFactory.select(follow.followingUser.count())
				.from(follow)
				// .join(follow.followingUser, user)
				.where(follow.followedUser.id.eq(userId))
				.fetchOne();

		if (loginUser != null) {
			followList.add(0, loginUser);
			total = total + 1;
			return new PageImpl<>(followList, pageable, total);
		} else {
			return new PageImpl<>(followList, pageable, total);
		}
	}

	public Page<User> findFollowingsByUserId(Long userId, Pageable pageable) {

		List<User> followList =
			jpaQueryFactory.select(follow.followedUser)
				.from(follow)
				.where(follow.followingUser.id.eq(userId))
				.orderBy(follow.createdAt.desc())
				.offset(pageable.getOffset())
				.limit(pageable.getPageSize())
				.fetch();

		Long total =
			jpaQueryFactory.select(follow.followedUser.count())
				.from(follow)
				.where(follow.followingUser.id.eq(userId))
				.fetchOne();

		return new PageImpl<>(followList, pageable, total);
	}
}
