import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import Snake from './Snake';

const SnakeGame = React.memo(({ speed, onGameOver, onFoodEaten }) => {
  const sketchRef = useRef();
  let p5Instance;

  useEffect(() => {
    let snake;
    let food;
    const gridSize = 20;

    const sketch = (p) => {
      p5Instance = p;

      p.setup = () => {
        p.createCanvas(400, 400);
        p.frameRate(speed);

        const midCol = Math.floor(p.width / (2 * gridSize)) * gridSize;
        const midRow = Math.floor(p.height / (2 * gridSize)) * gridSize;

        snake = new Snake(p, gridSize, onGameOver, midCol, midRow);
        spawnFood();
      };

      p.draw = () => {
        p.background(51);
        snake.update();
        snake.show();

        if (snake.eat(food)) {
          spawnFood();
          onFoodEaten(); // Call when food is eaten
        }

        p.fill(255, 0, 0);
        p.rect(food.x, food.y, gridSize, gridSize);
      };

      const spawnFood = () => {
        let validPosition = false;

        while (!validPosition) {
          let cols = Math.floor(p.width / gridSize);
          let rows = Math.floor(p.height / gridSize);
          let newFood = p.createVector(
            Math.floor(p.random(cols)) * gridSize,
            Math.floor(p.random(rows)) * gridSize
          );

          // Check if the new food position overlaps with the snake's body
          validPosition = true;
          for (let segment of snake.body) {
            if (newFood.equals(segment)) {
              validPosition = false;
              break;
            }
          }

          if (validPosition) {
            food = newFood;
          }
        }
      };

      p.keyPressed = () => {
        if (!snake) return;

        if (p.keyCode === p.RIGHT_ARROW && snake.xSpeed !== -1) {
          snake.setDirection(1, 0);
        } else if (p.keyCode === p.UP_ARROW && snake.ySpeed !== 1) {
          snake.setDirection(0, -1);
        } else if (p.keyCode === p.DOWN_ARROW && snake.ySpeed !== -1) {
          snake.setDirection(0, 1);
        } else if (p.keyCode === p.LEFT_ARROW && snake.xSpeed !== 1) {
          snake.setDirection(-1, 0);
        }
      };
    };

    const myP5 = new p5(sketch, sketchRef.current);

    return () => {
      myP5.remove();
    };
  }, [speed, onGameOver, onFoodEaten]);

  return <div ref={sketchRef}></div>;
});

export default SnakeGame;
