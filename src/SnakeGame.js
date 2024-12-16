import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import drawApple from './Apple';
import drawSnakeFace from './SnakeFace';

const SnakeGame = React.memo(({ onGameOver, onFoodEaten }) => {
  const sketchRef = useRef();
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    if (p5InstanceRef.current) return; // Prevent re-creating p5 instance

    const gridWidth = 30;
    const gridHeight = 30;
    const startingSegments = 10;
    const xStart = 0;
    const yStart = 15;
    let startDirection = 'right';
    let direction = startDirection;
    let gameStarted = false;
    let segments = [];
    let fruit;

    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(500, 500);
        p.frameRate(10);
        showStartScreen();
      };

      p.draw = () => {
        p.background(0);
        p.scale(p.width / gridWidth, p.height / gridHeight);
      
        if (!gameStarted) {
          showStartScreen();
        } else {
          p.translate(0.5, 0.5);
          drawApple(p, fruit); // Use the drawApple function to render the food
          showSegments();
          drawSnakeFace(p, segments[0], direction, fruit); // Pass the food position to drawSnakeFace
          updateSegments();
          checkForCollision();
          checkForFruit();
        }
      };      
      
      const showStartScreen = () => {
        p.noStroke();
        p.fill(32);
        p.noLoop();
      };

      p.mousePressed = () => {
        if (!gameStarted) {
          startGame();
        }
      };

      const startGame = () => {
        updateFruitCoordinates();
        segments = [];
        for (let x = xStart; x < xStart + startingSegments; x += 1) {
          segments.unshift(p.createVector(x, yStart));
        }
        direction = startDirection;
        gameStarted = true;
        p.loop();
      };

      const showSegments = () => {
        p.noFill();
        p.stroke(96, 255, 64); // Green color for the snake body
        p.strokeWeight(1.0);   // Slightly thicker stroke for better visibility
      
        p.beginShape();
        for (let segment of segments) {
          p.vertex(segment.x, segment.y);
        }
        p.endShape();
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
        p.noLoop();
        // onGameOver(); // Call the onGameOver callback
      };

      const selfColliding = () => {
        let head = segments[0];
        return segments.slice(1).some(segment => head.equals(segment));
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
