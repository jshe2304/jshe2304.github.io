//Functions and Classes

var fmt = new Intl.NumberFormat('en-US', { 
    minimumIntegerDigits: 3, 
    minimumFractionDigits: 4, 
    useGrouping: false
});

const pad = function (num) {
    if (isNaN(num)) {
        return "___nan___";
    } else {
        return (num < 0 ? "-" : "+") + fmt.format(Math.abs(num))
    }
}

/***************
Element Pointers
***************/

const x = document.getElementById("x")
const y = document.getElementById("y")
const vx = document.getElementById("vx")
const vy = document.getElementById("vy")
const v = document.getElementById("v")
const mouse_x = document.getElementById("mouse-x")
const mouse_y = document.getElementById("mouse-y")


/**************
State Variables
**************/

let raf; // Animation Frame Object

let mousein = false; // Mouse in worm box
let mousex = NaN; // Mouse x position
let mousey = NaN; // Mouse y position

let showVel = false; // Show velocity vector?
const toggleVel = function() {
    showVel = !showVel
}

let showContent = false; // Show content?

let canvas1 = document.getElementById("worm-box"); // Canvas
let ctx1; // Context
let worm1; // Worm

/***********************
Page Rendering Functions
***********************/

function draw() { // Draw worm

    if (showContent) return;

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    worm1.draw(showVel);

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


const load = function () { // Set up worm environment

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

// Reload upon window resize
window.addEventListener('resize', function(event) {
    this.window.cancelAnimationFrame(raf);
    load();
}, true);