import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import drawApple from './Apple';
import drawSnakeFace from './SnakeFace';
import drawBackground from './Background';
import showSegments from './Segments';

const SnakeGame = React.memo(({ onGameOver, onFoodEaten }) => {
  const sketchRef = useRef();
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    if (p5InstanceRef.current) return; // Prevent re-creating p5 instance

    const gridWidth = 20;
    const gridHeight = 20;
    const startingSegments = 6;
    const xStart = 7;
    const yStart = 7;
    let startDirection = 'right';
    let direction = startDirection;
    let gameStarted = false;
    let segments = [];
    let fruit;

    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(500, 500, p.WEBGL);
        p.frameRate(65);
        initializeGame();
      };

      let updateInterval = 100; // 100 milliseconds between game updates
      let lastUpdateTime = 0;

      p.draw = () => {
        p.background(0);
        p.scale(p.width / gridWidth, p.height / gridHeight);

        drawBackground(p, gridWidth, gridHeight);
        p.translate(0.5, 0.5);
        drawApple(p, fruit);
        showSegments(p, segments);
        drawSnakeFace(p, segments[0], direction, fruit);

        let currentTime = p.millis();
        if (currentTime - lastUpdateTime > updateInterval && gameStarted) {
          updateSegments();
          checkForCollision();
          checkForFruit();
          lastUpdateTime = currentTime;
        }
      };

      const initializeGame = () => {
        // Initialize snake segments
        segments = [];
        for (let x = xStart; x < xStart + startingSegments; x += 1) {
          segments.unshift(p.createVector(x, yStart));
        }
        direction = startDirection;
        updateFruitCoordinates();
        gameStarted = false;
      };

      const startGame = () => {
        gameStarted = true;
      };

      const updateSegments = () => {
        segments.pop();
        let head = segments[0].copy();
        switch (direction) {
          case 'right':
            head.x += 1;
            break;
          case 'up':
            head.y -= 1;
            break;
          case 'left':
            head.x -= 1;
            break;
          case 'down':
            head.y += 1;
            break;
          default:
            break;
        }
        segments.unshift(head);
      };

      const checkForCollision = () => {
        let head = segments[0];
        if (
          head.x >= gridWidth ||
          head.x < 0 ||
          head.y >= gridHeight ||
          head.y < 0 ||
          selfColliding()
        ) {
          gameOver();
        }
      };

      const gameOver = () => {
        gameStarted = false;
        onGameOver(); // Call the onGameOver callback
      };

      const selfColliding = () => {
        let head = segments[0];
        return segments.slice(1).some((segment) => head.equals(segment));
      };

      const checkForFruit = () => {
        let head = segments[0];
        if (head.equals(fruit)) {
          let tail = segments[segments.length - 1].copy();
          segments.push(tail);
          updateFruitCoordinates();
          onFoodEaten(); // Call the onFoodEaten callback
        }
      };

      const updateFruitCoordinates = () => {
        let x = Math.floor(p.random(gridWidth));
        let y = Math.floor(p.random(gridHeight));
        fruit = p.createVector(x, y);
      };

      p.keyPressed = () => {
        if (!gameStarted) {
          startGame();
        }

        switch (p.keyCode) {
          case p.LEFT_ARROW:
            if (direction !== 'right') direction = 'left';
            break;
          case p.RIGHT_ARROW:
            if (direction !== 'left') direction = 'right';
            break;
          case p.UP_ARROW:
            if (direction !== 'down') direction = 'up';
            break;
          case p.DOWN_ARROW:
            if (direction !== 'up') direction = 'down';
            break;
          default:
            break;
        }
      };
    };

    p5InstanceRef.current = new p5(sketch, sketchRef.current);

    return () => {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    };
  }, [onGameOver, onFoodEaten]);

  return <div ref={sketchRef}></div>;
});

export default SnakeGame;
