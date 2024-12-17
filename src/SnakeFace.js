const drawSnakeFace = (p, head, direction, food) => {
  const headWidth = 1.4;       // Width of the snake's head
  const headHeight = 1;    // Height of the snake's head
  const eyeSize = 0.8;       // Size of the white eyes
  const pupilSize = 0.4;     // Size of the black pupils
  // const tongueLength = 0.6;    // Length of the tongue
  // const tongueWidth = 0.2;   // Width of the tongue

  // Draw the head
  p.fill(50, 100, 255); // Blue color for the head
  p.stroke(0);
  p.strokeWeight(0.05);
  p.rect(head.x - headWidth / 2, head.y - headHeight / 2, headWidth, headHeight, 0.5);

  // Draw the red tongue
  // p.push();
  // p.stroke(255, 0, 0); // Red color for the tongue
  // p.strokeWeight(tongueWidth);

  // Determine tongue direction based on movement
  switch (direction) {
    case 'right':
      p.line(head.x + headWidth / 2, head.y, head.x + headWidth / 2, head.y);
      break;
    case 'left':
      p.line(head.x - headWidth / 2, head.y, head.x - headWidth / 2, head.y);
      break;
    case 'up':
      p.line(head.x, head.y - headHeight / 2, head.x, head.y - headHeight / 2);
      break;
    case 'down':
      p.line(head.x, head.y + headHeight / 2, head.x, head.y + headHeight / 2);
      break;
  }

  p.pop();

  // Calculate the angle toward the food for pupil movement
  const angle = p.atan2(food.y - head.y, food.x - head.x);

  // Define eye positions
  const eyeOffsetX = headWidth / 4;
  const eyeOffsetY = headHeight / 4;
  const pupilMaxOffset = eyeSize / 4;

  const leftEye = p.createVector(head.x - eyeOffsetX, head.y - eyeOffsetY);
  const rightEye = p.createVector(head.x + eyeOffsetX, head.y - eyeOffsetY);

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
