import React, { useState, useRef, useEffect, useCallback } from 'react';
import SnakeGame from './SnakeGame';
import './App.css';

function App() {
  const [speed, setSpeed] = useState(7);
  const [gameOver, setGameOver] = useState(false);
  const [foodCount, setFoodCount] = useState(0);
  const newGameButtonRef = useRef(null);

  const handleGameOver = useCallback(() => {
    setGameOver(true);
  }, []);

  const handleRestart = () => {
    setGameOver(false);
    setSpeed(8);
    setFoodCount(0);
  };

  const handleFoodEaten = useCallback(() => {
    setFoodCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (gameOver && newGameButtonRef.current) {
      newGameButtonRef.current.focus();
    }
  }, [gameOver]);

  return (
    <div className="App">
      <h1>React Snake Game with p5.js</h1>
      {!gameOver ? (
        <>
          <SnakeGame
            onGameOver={handleGameOver}
            speed={speed}
            onFoodEaten={handleFoodEaten}
          />
          <div className="food-counter">
            <p>Food Eaten: {foodCount}</p>
          </div>
        </>
      ) : (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Total Food Eaten: {foodCount}</p>
          <button ref={newGameButtonRef} onClick={handleRestart}>
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
