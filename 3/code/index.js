const canvas = document.querySelector("canvas");
const form = document.getElementById("form");
const stepLabel = document.querySelector(".step-label");

const ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect();
let scale = window.devicePixelRatio;

const gridSize = 50;
const tab = 10;
const zeroPoint = {};

const initIntervalStart = -1;
const initIntervalEnd = 1;
const initStep = 0.1;

const rangeInputFactor = 100;

let isFuncDrawn = false;
let isInit = true;

init();

function init() {
  setCanvasSize();
  listenCanvasSize();
  setZeroPoint();
  setFormDefault();
  drawGrid();
  isInit = false;
}
//====================================
function setCanvasSize() {
  canvas.width = rect.width * scale;
  canvas.height = rect.height * scale;
}
function setZeroPoint() {
  zeroPoint.x = Math.round(canvas.width / 2 / gridSize) * gridSize;
  zeroPoint.y = Math.round(canvas.height / 2 / gridSize) * gridSize;
}
function setRectAndScale() {
  rect = canvas.getBoundingClientRect();
  scale = window.devicePixelRatio;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setFormDefault() {
  form.interval_start.value = initIntervalStart;
  form.interval_end.value = initIntervalEnd;
  form.step.value = initStep * rangeInputFactor;

  if (isInit)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearCanvas();
      drawGrid();
      drawFunction();
    });

  stepLabel.textContent = "Step " + initStep;
  form.step.addEventListener("input", (e) => {
    stepLabel.textContent = "Step " + Number(e.target.value) / rangeInputFactor;
  });
}
function listenCanvasSize() {
  const cb = () => {
    setRectAndScale();

    setCanvasSize();
    setZeroPoint();
    drawGrid();
    if (isFuncDrawn) drawFunction();
  };
  window.addEventListener("resize", cb);
}
function drawGrid() {
  const middleWidth = Math.round(canvas.width / gridSize / 2);
  let counter = 0;
  let num = -middleWidth;

  for (let i = 0; i <= canvas.width; i += gridSize) {
    ctx.strokeStyle = "#a9a9a9";

    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    if (middleWidth === counter) ctx.strokeStyle = "#bb2b2b";
    ctx.stroke();
    ctx.fillText(num, i + tab, zeroPoint.y + tab * 1.7);
    counter++;
    num++;
  }

  const middleHeight = Math.round(canvas.height / gridSize / 2);
  counter = 0;
  num = -middleHeight;
  for (let i = 1; i <= canvas.height; i += gridSize) {
    ctx.strokeStyle = "#a9a9a9";

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    if (middleHeight === counter) ctx.strokeStyle = "#bb2b2b";
    ctx.stroke();
    if (num) ctx.fillText(-num, zeroPoint.x + tab, i + tab * 1.7);
    counter++;
    num++;
  }
}

function drawFunction() {
  isFuncDrawn = true;
  let i = zeroPoint.x + Number(form.interval_start.value) * gridSize || 0;
  const endPoint = zeroPoint.x + Number(form.interval_end.value) * gridSize || canvas.width;

  const pointSize = 3;

  if (i > endPoint) {
    alert("start-point should't be greater then end-point");
  } else
    while (i <= endPoint) {
      const x = (i - zeroPoint.x) / gridSize;
      const y = Math.pow(Math.E, 0.2 * x ** 2);

      ctx.fillRect(x * gridSize + zeroPoint.x, zeroPoint.y - gridSize * y, pointSize, pointSize);

      const step = Number(form.step.value) / rangeInputFactor;

      i += gridSize * step;
    }
}
