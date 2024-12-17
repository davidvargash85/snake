const drawApple = (p, fruit) => {
  const appleSize = 1.5;   // Increased size for the apple
  const stemHeight = 0.5;  // Increased height for the stem
  const leafSize = 0.5;    // Increased size for the leaf

  // Draw the red apple
  p.fill(255, 0, 0); // Red color for the apple
  p.noStroke();
  p.ellipse(fruit.x, fruit.y, appleSize, appleSize);

  // Draw the brown stem
  p.stroke(139, 69, 19); // Brown color for the stem
  p.strokeWeight(0.1);
  p.line(fruit.x, fruit.y - appleSize / 2, fruit.x, fruit.y - appleSize / 2 - stemHeight);

  // Draw the green leaf
  p.fill(0, 200, 0); // Green color for the leaf
  p.noStroke();
  p.ellipse(fruit.x + 0.3, fruit.y - appleSize / 2 - 0.3, leafSize, leafSize / 2);
};

export default drawApple;
