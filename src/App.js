import React, { useState } from "react";
import GameStart from "./components/GameStart";
import GuessInput from "./components/GuessInput";

const App = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [playerName, setPlayerName] = useState("");

    return (
        <div>
            {!gameStarted ? (
                <GameStart
                    onGameStart={(name) => {
                        setGameStarted(true);
                        setPlayerName(name);
                    }}
                />
            ) : (
                <GuessInput playerName={playerName} />
            )}
        </div>
    );
};

export default App;
