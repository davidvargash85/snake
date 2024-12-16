import React, { useState, useRef, useEffect, useCallback } from 'react';
import SnakeGame from './SnakeGame';
import './App.css';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [foodCount, setFoodCount] = useState(0);
  const newGameButtonRef = useRef(null);

  // Memoized function for handling game over
  const handleGameOver = useCallback(() => {
    setGameOver(true);
  }, []);

  // Memoized function for handling game restart
  const handleRestart = useCallback(() => {
    setGameOver(false);
    setFoodCount(0);
  }, []);

  // Memoized function for handling food eaten
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
