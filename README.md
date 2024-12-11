# Overview
The Guessing Number Game is a fun and interactive web-based application where players attempt to guess a randomly generated 4-digit number based on provided feedback. The game tracks the time taken and the number of attempts, calculates a score, and stores the results in a database for leaderboard functionality. This project demonstrates a combination of frontend and backend technologies to build a seamless and dynamic application.

# Application Workflow
# Start Game:
The player enters their name and starts the game.

A unique 4-digit target number (with no repeated digits) is generated on the server side.

A timer starts to track the player's time.

# Submit Guesses:
The player inputs a 4-digit number and submits it.

The backend compares the guess with the target number and provides feedback:

indicates a correct digit in the correct position.
indicates a correct digit in the wrong position.
The feedback is displayed to the player.

# Game Completion:
If the player guesses the number correctly, the timer stops.

The score is calculated based on the total time taken and the number of attempts:

Score = 1 / (Time Taken in Seconds + Number of Guesses)

The player's name, score, time taken, and number of guesses are saved to the database.

# Leaderboard:
Players can view the best score in the database.

# Restart or Stop Game:

Players can stop the game anytime and view their score.

They can restart the game with a new target number.

# Technologies Used

# Frontend
React.js:
Manages the user interface and state (e.g., timer, feedback).

Handles input validation to ensure guesses are exactly 4-digit numbers.

Provides a responsive and user-friendly experience with styled components.

# Backend
Spring Boot:
Provides RESTful APIs for starting the game, submitting guesses, saving scores, and retrieving leaderboard data.

Contains business logic for generating the target number, evaluating guesses, and calculating scores.

# Database
MySQL:
Stores player data including names, scores, time taken, and number of guesses.

Enables leaderboard functionality by retrieving the highest score.

# Communication
Axios:
Facilitates HTTP requests from the React.js frontend to the Spring Boot backend.

# Development Tools
Spring Tool Suite (STS): Used for backend development.

Node.js and npm: For managing the React.js project.

MySQL Workbench: For managing the MySQL database.

# Project Structure
# Backend
Controller:
Manages API endpoints for game logic and score operations.

Service:
Handles core game logic (e.g., number generation, guess evaluation, score calculation).

Repository:
Manages database operations using Spring Data JPA.

# Frontend
GameStart Component:
Allows players to input their name and start the game.

GuessInput Component:
Handles the guess submission, displays feedback, and manages game controls (e.g., stop, restart).

# Features
Random generation of a unique 4-digit number.

Real-time feedback on guesses.

Automatic timer and score calculation.

Persistent storage of player scores and leaderboard tracking.

User-friendly interface with responsive design.

# How to Run the Application

# Prerequisites
# Backend:
Java 11 or higher

Spring Boot 2.5+

MySQL

# Frontend:
Node.js 14 or higher

npm or yarn

# Steps
# Backend Setup:
Clone the repository.

Configure the application.properties file with your MySQL credentials.

Run the Spring Boot application using STS or mvn spring-boot:run.

Frontend Setup:
Navigate to the frontend folder.

Run npm install to install dependencies.

Run npm start to start the React development server.

Access the application at http://localhost:3000.

Future Enhancements

Add a detailed leaderboard page.

Implement difficulty levels (e.g., 5-digit numbers).

Add authentication for tracking scores per player.

Deploy the application to a cloud platform (e.g., AWS, Heroku).

# Conclusion
This project is a practical implementation of a simple yet engaging game that combines frontend interactivity with backend robustness. It showcases the integration of modern web technologies, making it a valuable learning experience for full-stack developers.
