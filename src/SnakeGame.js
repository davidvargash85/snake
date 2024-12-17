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
    const startingSegments = 15;
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
        p.noStroke();
        p.fill(96, 255, 64); // Green color for the snake body
      
        const maxWidth = 1.2;            // Maximum width for the head
        const minWidth = maxWidth / 1.2; // Minimum width for the tail
        const totalSegments = segments.length;
        const overlapFactor = 0.2;     // Overlap factor to extend each quad
      
        for (let i = 0; i < totalSegments - 1; i++) {
          let current = segments[i];
          let next = segments[i + 1];
      
          // Calculate the width for the current and next segments
          let currentWidth = p.map(i, 0, totalSegments - 1, maxWidth, minWidth);
          let nextWidth = p.map(i + 1, 0, totalSegments - 1, maxWidth, minWidth);
      
          // Calculate the angle between the current and next segments
          let angle = p.atan2(next.y - current.y, next.x - current.x);
      
          // Calculate perpendicular offsets for the current and next segments
          let offsetX = p.sin(angle) * currentWidth / 2;
          let offsetY = -p.cos(angle) * currentWidth / 2;
          let nextOffsetX = p.sin(angle) * nextWidth / 2;
          let nextOffsetY = -p.cos(angle) * nextWidth / 2;
      
          // Extend the next segment position slightly for overlap
          let extendedNextX = next.x + p.cos(angle) * overlapFactor;
          let extendedNextY = next.y + p.sin(angle) * overlapFactor;
      
          // Draw a quad between the current and extended next segments
          p.beginShape();
          p.vertex(current.x - offsetX, current.y - offsetY);
          p.vertex(current.x + offsetX, current.y + offsetY);
          p.vertex(extendedNextX + nextOffsetX, extendedNextY + nextOffsetY);
          p.vertex(extendedNextX - nextOffsetX, extendedNextY - nextOffsetY);
          p.endShape(p.CLOSE);
        }
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
