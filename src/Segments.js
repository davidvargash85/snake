const showSegments = (p, segments) => {
  p.noStroke();
  p.fill(50, 100, 255); // Blue color for the snake body

  const maxWidth = 0.8;            // Maximum width for the head
  const minWidth = maxWidth / 1.2; // Minimum width for the tail
  const totalSegments = segments.length;
  const overlapFactor = 0.05;      // Overlap factor to extend each quad

  for (let i = 0; i < totalSegments - 1; i++) {
    let current = segments[i];
    let next = segments[i + 1];

    // Calculate the width for the current and next segments
    let currentWidth = p.map(i, 0, totalSegments - 1, maxWidth, minWidth);
    let nextWidth = p.map(i + 1, 0, totalSegments - 1, maxWidth, minWidth);

    // Calculate the angle between the current and next segments
    let angle = p.atan2(next.y - current.y, next.x - current.x);

    // Calculate perpendicular offsets for the current and next segments
    let offsetX = (p.sin(angle) * currentWidth) / 2;
    let offsetY = (-p.cos(angle) * currentWidth) / 2;
    let nextOffsetX = (p.sin(angle) * nextWidth) / 2;
    let nextOffsetY = (-p.cos(angle) * nextWidth) / 2;

    // Extend the next segment position slightly for overlap
    let extendedNextX = next.x + p.cos(angle) * overlapFactor;
    let extendedNextY = next.y + p.sin(angle) * overlapFactor;

    // Detect turns and draw a circle if the direction changes
    if (i > 0) {
      let previous = segments[i - 1];

      let dx1 = next.x - current.x;
      let dy1 = next.y - current.y;
      let dx2 = current.x - previous.x;
      let dy2 = current.y - previous.y;

      // Draw a circle if the direction changes, using the current width as the circle diameter
      if (dx1 !== dx2 || dy1 !== dy2) {
        p.circle(current.x, current.y, currentWidth * 1.01);
      }
    }

    // Draw a quad between the current and extended next segments
    p.beginShape();
    p.vertex(current.x - offsetX, current.y - offsetY);
    p.vertex(current.x + offsetX, current.y + offsetY);
    p.vertex(extendedNextX + nextOffsetX, extendedNextY + nextOffsetY);
    p.vertex(extendedNextX - nextOffsetX, extendedNextY - nextOffsetY);
    p.endShape(p.CLOSE);
  }

  // Draw the tail segment as a circle to cap the end
  let tail = segments[totalSegments - 1];
  let tailWidth = p.map(totalSegments - 1, 0, totalSegments - 1, maxWidth, minWidth);
  p.circle(tail.x, tail.y, tailWidth);
};

export default showSegments;
