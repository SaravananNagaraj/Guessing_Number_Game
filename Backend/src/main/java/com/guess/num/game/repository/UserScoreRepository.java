package com.guess.num.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.guess.num.game.entity.UserScore;

public interface UserScoreRepository extends JpaRepository<UserScore, Long> {
	@Query("SELECT g FROM UserScore g ORDER BY g.score DESC LIMIT 1")
	UserScore findBestScore();

}
