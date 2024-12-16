const drawApple = (p, fruit) => {
  const appleSize = 1.5; // Base size of the apple

  // Draw the red apple
  p.fill(255, 0, 0); // Red color for the apple
  p.noStroke();
  p.ellipse(fruit.x, fruit.y, appleSize, appleSize);

  // Draw the brown stem
  p.stroke(139, 69, 19); // Brown color for the stem
  p.strokeWeight(0.15);
  p.line(fruit.x, fruit.y - appleSize / 2, fruit.x, fruit.y - appleSize / 2 - 0.3);

  // Draw the green leaf
  p.fill(0, 200, 0); // Green color for the leaf
  p.noStroke();
  p.ellipse(fruit.x + 0.3, fruit.y - appleSize / 2 - 0.2, 0.3, 0.2);
};

export default drawApple;
