package com.guess.num.game.service;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;

import org.springframework.stereotype.Service;

@Service
public class GameService {

	private static final int DIGITS = 4;

    public String generateNumber() {
        Set<Integer> digits = new HashSet<>();
        Random random = new Random();
        StringBuilder number = new StringBuilder();
        while (digits.size() < DIGITS) {
            int digit = random.nextInt(10);
            if (digits.add(digit)) {
                number.append(digit);
            }
        }
        return number.toString();
    }

    public String evaluateGuess(String target, String guess) {
        StringBuilder feedback = new StringBuilder();
        for (int i = 0; i < DIGITS; i++) {
            if (guess.charAt(i) == target.charAt(i)) {
                feedback.append("+");
            } else if (target.contains(Character.toString(guess.charAt(i)))) {
                feedback.append("-");
            }
        }
        return feedback.toString();
    }

    public double calculateScore(int timeTaken, int guesses) {
        return 1.0 / (timeTaken + guesses);
    }
}
