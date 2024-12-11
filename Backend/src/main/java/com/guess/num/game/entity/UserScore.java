package com.guess.num.game.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserScore {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String name;
    private double score;
    private int timeTaken;
    private int guesses;
    
    public UserScore() {
		// TODO Auto-generated constructor stub
	}
    
	public UserScore(String name, double score, int timeTaken, int guesses) {
		super();
		this.name = name;
		this.score = score;
		this.timeTaken = timeTaken;
		this.guesses = guesses;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

	public int getGuesses() {
		return guesses;
	}

	public void setGuesses(int guesses) {
		this.guesses = guesses;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public int getTimeTaken() {
		return timeTaken;
	}

	public void setTimeTaken(int timeTaken) {
		this.timeTaken = timeTaken;
	}

	@Override
	public String toString() {
		return "UserScore [id=" + id + ", name=" + name + ", score=" + score + ", timeTaken=" + timeTaken + ", guesses="
				+ guesses + "]";
	}
	
}
