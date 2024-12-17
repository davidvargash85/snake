const drawBackground = (p, gridWidth, gridHeight) => {
  const lightGreen = p.color(170, 215, 81); // Light green color
  const darkGreen = p.color(162, 209, 73);  // Dark green color

  const cellWidth = 1.05;  // Slightly larger than 1 to cover gaps
  const cellHeight = 1.05; // Slightly larger than 1 to cover gaps

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      p.fill((x + y) % 2 === 0 ? lightGreen : darkGreen);
      p.rect(x, y, cellWidth, cellHeight);
    }
  }
};

export default drawBackground;