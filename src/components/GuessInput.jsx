import React, { useState, useEffect } from "react";
import axios from "axios";

const GuessInput = ({ playerName }) => {
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState("");
    const [timer, setTimer] = useState(0);
    const [guesses, setGuesses] = useState(0);
    const [score, setScore] = useState(null);
    const [gameStopped, setGameStopped] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (!gameStopped) {
            const id = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
            setIntervalId(id);

            return () => clearInterval(id);
        }
    }, [gameStopped]);

    const submitGuess = async () => {
        setGuesses(guesses + 1);
        const response = await axios.post("http://localhost:8080/api/game/guess", guess);
        const feedback = response.data;

        if (feedback.includes("Correct")) {
            clearInterval(intervalId);
            const totalTime = timer;
            const calculatedScore = (1 / (totalTime + guesses)).toFixed(2);
            setScore(calculatedScore);

            await axios.post("http://localhost:8080/api/game/score", {
                name: playerName,
                timeTaken: totalTime,
                guesses,
                score: calculatedScore,
            });

            setFeedback(`You guessed it right! Your score: ${calculatedScore}`);
        } else {
            setFeedback(feedback);
        }
    };

    const stopGame = async () => {
        clearInterval(intervalId);
        setGameStopped(true);

        const totalTime = timer;
        const calculatedScore = (1 / (totalTime + guesses)).toFixed(2);
        setScore(calculatedScore);

        await axios.post("http://localhost:8080/api/game/score", {
            name: playerName,
            timeTaken: totalTime,
            guesses,
            score: calculatedScore,
        });

        setFeedback(`Game stopped. Your score: ${calculatedScore}`);
    };

    const restartGame = () => {
        clearInterval(intervalId);
        setGuess("");
        setFeedback("");
        setTimer(0);
        setGuesses(0);
        setScore(null);
        setGameStopped(false);
        setIntervalId(null);

        const newIntervalId = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
        setIntervalId(newIntervalId);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f5f5f5",
        }}>
            <h1 style={{ marginBottom: "20px" }}>Make a Guess</h1>
            <p style={{ marginBottom: "10px" }}>Time: {timer}s</p>
            <p style={{ marginBottom: "20px" }}>Attempts: {guesses}</p>

            {!gameStopped && (
                <>
                    <input
                        type="text"
                        placeholder="Enter your guess"
                        value={guess}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,4}$/.test(value)) {
                                const digitCounts = {};
                                for (const digit of value) {
                                    digitCounts[digit] = (digitCounts[digit] || 0) + 1;
                                }

                                const isValid = Object.values(digitCounts).every((count) => count <= 2);

                                if (isValid) {
                                    setGuess(value);
                                }
                            }
                        }}
                        style={{
                            padding: "10px",
                            width: "300px",
                            marginBottom: "20px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />

                    <button
                        onClick={submitGuess}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginBottom: "10px",
                        }}
                    >
                        Submit
                    </button>
                </>
            )}

            <button
                onClick={stopGame}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "10px",
                }}
            >
                {gameStopped ? "Game Stopped" : "Stop Game"}
            </button>

            <button
                onClick={restartGame}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Restart Game
            </button>

            <p style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#e9ecef",
                borderRadius: "5px",
                width: "300px",
                textAlign: "center",
            }}>
                {feedback}
            </p>
            {score && (
                <p style={{
                    marginTop: "20px",
                    padding: "10px",
                    backgroundColor: "#d4edda",
                    borderRadius: "5px",
                    width: "300px",
                    textAlign: "center",
                    color: "#155724",
                }}>
                    Final Score: {score}
                </p>
            )}
        </div>
    );
};

export default GuessInput;
