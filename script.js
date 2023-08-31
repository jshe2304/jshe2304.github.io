//Functions and Classes

const pad = function (num) {
    if (isNaN(num)) {
        return "___nan___";
    } else {
        return (num < 0 ? "-" : "") + String(Math.floor(Math.abs(num))).padStart(num < 0 ? 3 : 4, "0") + "." + String(Math.abs(num) % 1).slice(2, 6).padEnd(4, "0");
    }
}

//-------------------------
//Animation and Interaction
//-------------------------

//Request Animation Frame Object
let raf;

//Mouse Position
let mousein = false;
let mousex = NaN;
let mousey = NaN;

//Show Velocity Vector
let showvel = false;
const toggleVel = function() {
    showvel = !showvel
    //document.getElementById("velocity-toggle-wrapper").style.borderRight = showvel ? "solid black 1px" : "none";
}

//Elements to Update
const x = document.getElementById("x")
const y = document.getElementById("y")
const vx = document.getElementById("vx")
const vy = document.getElementById("vy")
const v = document.getElementById("v")
const mouse_x = document.getElementById("mouse-x")
const mouse_y = document.getElementById("mouse-y")

//Canvas
let canvas1 = document.getElementById("worm-box");
let ctx1;
let worm1;

const load = function () {
    canvas1.width = window.innerWidth/3;
    canvas1.height = window.innerHeight/3;

    canvas1.onmouseover = function (event) {
        mousein = true;
        document.onmousemove = function (event) {
            mousex = event.offsetX;
            mousey = event.offsetY;
        };
    }
    canvas1.onmouseout = function() {
        mousein = false;
        mousex = NaN;
        mousey = NaN;
        document.onmousemove = null;
    }

    ctx1 = canvas1.getContext("2d");

    worm1 = new Worm(canvas1.width/2, canvas1.height/2, 0, 0, 150, 2, canvas1, ctx1)

    raf = window.requestAnimationFrame(draw);
}

window.addEventListener('resize', function(event) {
    this.window.cancelAnimationFrame(raf);
    load();
}, true);

function draw() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    worm1.draw(showvel);

    mousein ? worm1.update(mousex, mousey) : worm1.update();
    
    x.innerHTML = pad(worm1.x[0]);
    y.innerHTML = pad(worm1.y[0]);
    vx.innerHTML = pad(worm1.vx);
    vy.innerHTML = pad(worm1.vy);
    v.innerHTML = pad(Math.sqrt(Math.pow(worm1.vx, 2), Math.pow(worm1.vy, 2)));
    mouse_x.innerHTML = pad(mousex);
    mouse_y.innerHTML = pad(mousey);
    
    raf = window.requestAnimationFrame(draw);
}