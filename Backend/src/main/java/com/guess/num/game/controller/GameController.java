package com.guess.num.game.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guess.num.game.entity.UserScore;
import com.guess.num.game.repository.UserScoreRepository;
import com.guess.num.game.service.GameService;

@RestController
@RequestMapping("/api/game")
@CrossOrigin("*")
public class GameController {

	@Autowired
    private GameService gameService;

    @Autowired
    private UserScoreRepository scoreRepository;

    private String targetNumber;
    private long startTime;
    private int attempts;

    @PostMapping("/start")
    public ResponseEntity<String> startGame(@RequestBody String name) {
        targetNumber = gameService.generateNumber();
        startTime = System.currentTimeMillis();
        attempts = 0;
        return ResponseEntity.ok("Game started for " + name);
    }

    @PostMapping("/guess")
    public ResponseEntity<String> submitGuess(@RequestBody String guess) {
        attempts++;
        String feedback = gameService.evaluateGuess(targetNumber, guess);
        if (feedback.equals("++++")) {
            long endTime = System.currentTimeMillis();
            int timeTaken = (int) ((endTime - startTime) / 1000);
            double score = gameService.calculateScore(timeTaken, attempts);

            UserScore newScore = new UserScore();
            newScore.setName("Player");
            newScore.setTimeTaken(timeTaken);
            newScore.setGuesses(attempts);
            newScore.setScore(score);
            scoreRepository.save(newScore);

            return ResponseEntity.ok("Correct! Score: " + score);
        }
        return ResponseEntity.ok(feedback);
    }

    @GetMapping("/best-score")
    public ResponseEntity<UserScore> getBestScore() {
        return ResponseEntity.ok(scoreRepository.findBestScore());
    }
    
    @PostMapping("/score")
    public ResponseEntity<String> saveScore(@RequestBody UserScore score) {
        scoreRepository.save(score);
        return ResponseEntity.ok("Score saved successfully");
    }

}
