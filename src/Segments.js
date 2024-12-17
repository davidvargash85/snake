const showSegments = (p, segments) => {
  p.noStroke();
  p.fill(50, 100, 255); // Blue color for the head

  const maxWidth = 0.8; // Maximum width for the head
  const minWidth = maxWidth / 1.2; // Minimum width for the tail
  const totalSegments = segments.length;
  const overlapFactor = 0.05; // Overlap factor to extend each quad

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

    // Draw a quad between the current and extended next segments
    p.beginShape();
    p.vertex(current.x - offsetX, current.y - offsetY);
    p.vertex(current.x + offsetX, current.y + offsetY);
    p.vertex(extendedNextX + nextOffsetX, extendedNextY + nextOffsetY);
    p.vertex(extendedNextX - nextOffsetX, extendedNextY - nextOffsetY);
    p.endShape(p.CLOSE);
  }
};

export default showSegments;
