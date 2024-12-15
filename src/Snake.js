class Snake {
  constructor(p5Instance, gridSize, onGameOver) {
    this.p5 = p5Instance;
    this.gridSize = gridSize;
    this.onGameOver = onGameOver;
    this.body = [this.p5.createVector(0, 0)];
    this.xSpeed = 0; // Start with no horizontal movement
    this.ySpeed = 0; // Start with no vertical movement
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
