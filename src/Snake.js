class Snake {
  constructor(p5Instance, gridSize, onGameOver, startX, startY) {
    this.p5 = p5Instance;
    this.gridSize = gridSize;
    this.onGameOver = onGameOver;
    this.body = [this.p5.createVector(startX, startY)];
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  setDirection(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    head.x += this.xSpeed * this.gridSize;
    head.y += this.ySpeed * this.gridSize;
    this.body.push(head);
    this.body.shift();

    // Check for collisions with walls
    if (head.x < 0 || head.x >= this.p5.width || head.y < 0 || head.y >= this.p5.height) {
      this.onGameOver();
      this.p5.noLoop();
    }

    // Check for collisions with itself
    for (let i = 0; i < this.body.length - 1; i++) {
      if (head.equals(this.body[i])) {
        this.onGameOver();
        this.p5.noLoop();
      }
    }
  }

  show() {
    this.p5.fill(0, 255, 0);
    for (let segment of this.body) {
      this.p5.rect(segment.x, segment.y, this.gridSize, this.gridSize);
    }

    // Draw the face on the head
    this.drawFace();
  }

  drawFace() {
    let head = this.body[this.body.length - 1];
    let centerX = head.x + this.gridSize / 2;
    let centerY = head.y + this.gridSize / 2;
    let eyeOffset = this.gridSize / 4;
    let pupilOffset = this.gridSize / 8;
  
    // Calculate eye movement based on direction
    let pupilXOffset = this.xSpeed * pupilOffset;
    let pupilYOffset = this.ySpeed * pupilOffset;
  
    // Draw eyes
    this.p5.fill(255);
    this.p5.ellipse(centerX - eyeOffset, centerY - eyeOffset, 6, 6);
    this.p5.ellipse(centerX + eyeOffset, centerY - eyeOffset, 6, 6);
  
    // Draw pupils
    this.p5.fill(0);
    this.p5.ellipse(centerX - eyeOffset + pupilXOffset, centerY - eyeOffset + pupilYOffset, 3, 3);
    this.p5.ellipse(centerX + eyeOffset + pupilXOffset, centerY - eyeOffset + pupilYOffset, 3, 3);
  
    // Draw mouth
    this.p5.stroke(0);
    this.p5.noFill();
    this.p5.arc(centerX, centerY + eyeOffset / 2, 10, 10, 0, this.p5.PI);
  } 

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.equals(pos)) {
      this.body.push(this.p5.createVector(pos.x, pos.y));
      return true;
    }
    return false;
  }
}

export default Snake;
