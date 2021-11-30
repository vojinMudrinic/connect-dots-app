//Shape object containing dot positionsn,context
let shape = {
  canvas: null,
  ctx: null,
  clickedDot: null,
  dots: [
    { x: 300, y: 60 },
    { x: 250, y: 150 },
    { x: 300, y: 250 },
    { x: 350, y: 150 },
  ],
};

//Function that creates the shape of a dot
const drawDots = () => {
  for (let i = 0; i < shape.dots.length; i++) {
    let d = shape.dots[i];
    shape.ctx.beginPath();
    shape.ctx.arc(d.x, d.y, 5, 0, 2 * Math.PI);
    shape.ctx.fillStyle = "red";
    shape.ctx.fill();
    shape.ctx.closePath();
  }
};

//Function that handles users mouse and dot collision
const dotCollision = (c1, c2) => {
  let a = c1.r + c2.r,
    x = c1.x - c2.x,
    y = c1.y - c2.y;

  if (a > Math.sqrt(x * x + y * y)) {
    return true;
  } else return false;
};

//Function that will draw a line from the first selected dot to
const drawLine = (toDot) => {
  shape.ctx.beginPath();
  shape.ctx.moveTo(shape.clickedDot.x, shape.clickedDot.y);
  shape.ctx.lineTo(toDot.x, toDot.y);
  shape.ctx.lineWidth = 5;
  shape.ctx.strokeStyle = "tomato";
  shape.ctx.stroke();
  shape.ctx.closePath();
};

//Function that checks if dot is clicked
const checkForDot = (e) => {
  let col = null;
  for (let i = 0; i < shape.dots.length; i++) {
    var d = shape.dots[i],
      c1 = { x: d.x, y: d.y, r: 10 },
      c2 = { x: e.pageX, y: e.pageY, r: 10 };
    if (dotCollision(c1, c2)) col = d;
  }
  if (col !== null) {
    if (shape.clickedDot !== null) drawLine(col);
    shape.clickedDot = col;
  } else shape.clickedDot = null;
};

//Here the canvas is rendered
shape.canvas = document.querySelector("#canvas");
shape.canvas.style.backgroundColor = "silver";
shape.ctx = shape.canvas.getContext("2d");
shape.canvas.addEventListener("mousedown", function (e) {
  checkForDot(e);
});

//Dots rendered
drawDots();
