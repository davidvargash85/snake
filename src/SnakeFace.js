const drawSnakeFace = (p, head, direction, food) => {
  const headSize = 2;       // Larger size for the snake's head
  const eyeSize = 0.6 * 3;      // White eye size
  const pupilSize = 0.3 * 3;    // Black pupil size

  // Draw the head
  p.fill(50, 100, 255); // Blue color for the head
  p.stroke(0);
  p.strokeWeight(0.05);
  p.rect(head.x - headSize / 2, head.y - headSize / 2, headSize, headSize, 0.4);

  // Calculate the angle toward the food
  const angle = p.atan2(food.y - head.y, food.x - head.x);

  // Define eye positions based on the head size
  const eyeOffset = headSize / 3;
  const pupilMaxOffset = eyeSize / 4; // Limit pupil movement to stay within the eye

  // Calculate eye centers
  const leftEye = p.createVector(
    head.x + eyeOffset * p.cos(angle + p.HALF_PI),
    head.y + eyeOffset * p.sin(angle + p.HALF_PI)
  );

  const rightEye = p.createVector(
    head.x + eyeOffset * p.cos(angle - p.HALF_PI),
    head.y + eyeOffset * p.sin(angle - p.HALF_PI)
  );

  // Draw the white eyes
  p.fill(255); // White for the eyes
  p.noStroke();
  p.ellipse(leftEye.x, leftEye.y, eyeSize);
  p.ellipse(rightEye.x, rightEye.y, eyeSize);

  // Calculate pupil positions within limits
  const leftPupil = p.createVector(
    leftEye.x + pupilMaxOffset * p.cos(angle),
    leftEye.y + pupilMaxOffset * p.sin(angle)
  );

  const rightPupil = p.createVector(
    rightEye.x + pupilMaxOffset * p.cos(angle),
    rightEye.y + pupilMaxOffset * p.sin(angle)
  );

  // Draw the black pupils
  p.fill(0); // Black for the pupils
  p.ellipse(leftPupil.x, leftPupil.y, pupilSize);
  p.ellipse(rightPupil.x, rightPupil.y, pupilSize);
};

export default drawSnakeFace;
