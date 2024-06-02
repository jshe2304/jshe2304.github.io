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

const display = document.getElementById("display");
const titleWidget = document.getElementById('title-widget');
const photosWidget = document.getElementById('photos-widget');


/**************
State Variables
**************/

let raf; // Animation Frame Object

let mousein = false; // Mouse in worm box
let mousex = NaN; // Mouse x position
let mousey = NaN; // Mouse y position

let showingVel = false; // Show velocity vector?

let showingContent = null; // Show content?

let canvas = document.getElementById("canvas"); // Canvas
let context; // Context
let worm; // Worm

/***********************
Page Rendering Functions
***********************/

function draw() { // Draw worm

    if (showingContent) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    worm.draw(showingVel);

    mousein ? worm.update(mousex, mousey) : worm.update();
    
    x.innerHTML = pad(worm.x[0]);
    y.innerHTML = pad(worm.y[0]);
    vx.innerHTML = pad(worm.vx);
    vy.innerHTML = pad(worm.vy);
    v.innerHTML = pad(Math.sqrt(Math.pow(worm.vx, 2), Math.pow(worm.vy, 2)));
    mouse_x.innerHTML = pad(mousex);
    mouse_y.innerHTML = pad(mousey);
    
    raf = window.requestAnimationFrame(draw);
}

function load () { // Set up worm environment

    context = canvas.getContext("2d");

    worm = new Worm(canvas.width/2, canvas.height/2, 0, 0, 128, 2, canvas, context)

    raf = window.requestAnimationFrame(draw);
}

function toggleContent(id) {
    if (showingContent == null) {
        showingContent = id;
        canvas.style.display = "none";
        document.getElementById(id).style.display = "block";
    } else if (showingContent == id) {
        showingContent = null;
        canvas.style.display = "block"
        document.getElementById(id).style.display = "none"
        raf = window.requestAnimationFrame(draw);
    } else {
        document.getElementById(showingContent).style.display = "none";
        showingContent = id;
        document.getElementById(id).style.display = "block";
    }
}

canvas.onmouseover = function () {
    mousein = true;
    document.onmousemove = function (event) {
        mousex = event.offsetX;
        mousey = event.offsetY;
    };
}
canvas.onmouseout = function() {
    mousein = false;
    mousex = NaN;
    mousey = NaN;
    document.onmousemove = null;
}

// Toggle velocity vector animation
document.getElementById("velocity-toggle").onclick = function() {
    showingVel = !showingVel
}

titleWidget.onmousedown = function() {
    toggleContent("info")
}

photosWidget.onmousedown = function() {
    toggleContent("photos")
}

// Reload upon window resize
window.addEventListener('resize', function(event) {
    this.window.cancelAnimationFrame(raf);
    load();
}, true);