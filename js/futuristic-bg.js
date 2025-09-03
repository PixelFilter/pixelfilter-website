// Subtle grayscale 3D grid wave animation for about page
const canvas = document.getElementById('futuristic-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const cols = 22;
const rows = 14;
const spacing = 60;
const grid = [];
const perspective = 700;
const centerX = () => canvas.width / 2;
const centerY = () => canvas.height / 2;
let time = 0;

// Initialize grid points
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    grid.push({ x: (x - cols / 2) * spacing, y: (y - rows / 2) * spacing, z: 0 });
  }
}

function project3D(x, y, z) {
  const scale = perspective / (perspective + z);
  return {
    x: centerX() + x * scale,
    y: centerY() + y * scale
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time += 0.012; // slower

  // Animate Z position with sine wave
  for (let i = 0; i < grid.length; i++) {
    const pt = grid[i];
    const gx = pt.x / spacing + cols / 2;
    const gy = pt.y / spacing + rows / 2;
    pt.z = Math.sin(time + gx * 0.5 + gy * 0.7) * 60; // less amplitude
  }

  // Draw grid lines
  ctx.save();
  ctx.strokeStyle = "rgba(160,160,160,0.13)";
  ctx.lineWidth = 1;
  ctx.shadowColor = "#222";
  ctx.shadowBlur = 3;

  for (let y = 0; y < rows; y++) {
    ctx.beginPath();
    for (let x = 0; x < cols; x++) {
      const idx = y * cols + x;
      const pt = grid[idx];
      const p = project3D(pt.x, pt.y, pt.z);
      if (x === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }

  for (let x = 0; x < cols; x++) {
    ctx.beginPath();
    for (let y = 0; y < rows; y++) {
      const idx = y * cols + x;
      const pt = grid[idx];
      const p = project3D(pt.x, pt.y, pt.z);
      if (y === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }
  ctx.restore();

  // Draw grid points
  for (let i = 0; i < grid.length; i++) {
    const pt = grid[i];
    const p = project3D(pt.x, pt.y, pt.z);
    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2 + (pt.z + 60) / 80, 0, Math.PI * 2); // smaller points
    ctx.fillStyle = "rgba(200,200,200,0.18)";
    ctx.shadowColor = "#222";
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.restore();
  }

  requestAnimationFrame(draw);
}

draw();