// Get it for Wallpaper Engine in the Steam Workshop:
// https://steamcommunity.com/sharedfiles/filedetails/?id=1774958332

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
w = ctx.canvas.width = window.innerWidth;
h = ctx.canvas.height = window.innerHeight;

window.onresize = function () {
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight;
};

points = [];
dots = [];
lines = 7;
nt = 0;
hueBase = 250;
satBase = 60;

function pushPoints() {
  for (var i = 0; i < lines; i++) {
    points.push({
      xs: -5,
      ys: h / lines * i,
      xp1: Math.random() * (w / 3),
      yp1: (h / lines * i) + (Math.random() * 200 - 100) + 100,
      xp2: (Math.random() * (w / 3)) + (w / 3) * 2,
      yp2: (h / lines * i) + (Math.random() * 300 - 200) + 100,
      xe: w + 5,
      ye: h / lines * i
    });
  }
}

function pushDots() {
  if (dots.length > 200) {
    return;
  }
  var rad = Math.random() * (4 - 1) + 1;
  var zix = Math.floor(Math.random() * lines + 1);
  dots.push({
    x: Math.random() * w,
    y: h + 30,
    v: 4 - (rad / 1.2),
    r: (rad + zix) * 0.5,
    h: Math.random() * 20,
    z: zix
  });
}

function draw() {
  nt += 0.003;
  for (var i = 0; i < points.length; i++) {

    for (var j = 0; j < dots.length; j++) {
      if (dots[j].z == i) {
        ctx.beginPath();
        ctx.fillStyle = "hsl(" + (hueBase + dots[j].h) + ", " + (satBase) + "%, " + (80 - i * (60 / lines)) + "%)";
        ctx.arc(dots[j].x, dots[j].y, dots[j].r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        if (dots[j].y < 0 || dots[j].y > h + 60) {
          dots[j] = dots[dots.length - 1];
          dots.pop();
        } else {
          dots[j].y -= dots[j].v;
        }
      }
    }

    nyp1 = noise.perlin2(points[i].yp1 / 100, nt) * ((lines * 70) - (i * 100)) + 10;
    nyp2 = noise.perlin2(points[i].yp2 / 100, nt) * ((lines * 70) - (i * 100)) + 10;
    ctx.beginPath();
    ctx.fillStyle = "hsl(" + (hueBase + i * (50 / lines)) + ", " + (satBase) + "%, " + (20 + i * (60 / lines)) + "%)";
    ctx.moveTo(points[i].xs, points[i].ys);
    ctx.bezierCurveTo(points[i].xp1, points[i].yp1 + nyp1, points[i].xp2, points[i].yp2 + nyp2, points[i].xe, points[i].ye);
    ctx.lineTo(w + 5, h + 5);
    ctx.lineTo(-5, h + 5);
    ctx.lineTo(-5, h + 5);
    ctx.fill();
    ctx.closePath();
  }
}

function clear() {
  ctx.clearRect(0, 0, w, h);
}

function clearDots() {
  dots = [];
}

function render() {
  clear();
  draw();
  renderLoop = requestAnimationFrame(render);
}

pushPoints();
setInterval(pushDots, 50);
setInterval(clearDots, 90000);
render();