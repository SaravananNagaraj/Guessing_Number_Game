import React, { useState } from "react";
import axios from "axios";

const GameStart = ({ onGameStart }) => {
    const [name, setName] = useState("");

    const startGame = async () => {
        await axios.post("http://localhost:8080/api/game/start", name);
        onGameStart(name);
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
            <h1 style={{ marginBottom: "20px" }}>Guessing Number Game</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z]*$/.test(value)) {
                        setName(value);
                    }
                }}
                onPaste={(e) => {
                    const pastedData = e.clipboardData.getData("Text");
                    if (!/^[a-zA-Z]*$/.test(pastedData)) {
                        e.preventDefault();
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
                onClick={startGame}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Start Game
            </button>
        </div>
    );
};

export default GameStart;
