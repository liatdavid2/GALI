const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let drawing = false;
let currentColor = "black";
let mode = "draw";

function setMode(newMode) {
  mode = newMode;
}

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

// Mouse events
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  handleAction(e);
});
canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener("mousemove", handleAction);

// Touch events
canvas.addEventListener("touchstart", (e) => {
  drawing = true;
  handleAction(e);
});
canvas.addEventListener("touchend", () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  handleAction(e);
});

function handleAction(e) {
  const {x, y} = getPos(e);

  if (mode === "draw" && drawing) {
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  if (mode === "star") {
    drawStar(x, y);
  }

  if (mode === "heart") {
    drawHeart(x, y);
  }
}

function drawStar(x, y) {
  ctx.fillStyle = "gold";
  ctx.font = "30px Arial";
  ctx.fillText("⭐", x - 10, y + 10);
}

function drawHeart(x, y) {
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("❤️", x - 10, y + 10);
}

function changeColor(color) {
  currentColor = color;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
