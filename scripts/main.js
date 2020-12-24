const main = document.querySelector("main")
const slider = document.querySelector("#slider")
let canvas = document.getElementById("star-canvas");
let width = document.querySelector(".outer").clientWidth;
let height = document.querySelector(".outer").clientHeight;
canvas.width = width;
canvas.height = height;
let c = canvas.getContext("2d");

function Star(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.closePath();
        c.fillStyle = "white";
        c.fill();
    };

    this.update = function () {
        if (this.x + this.radius > width) {
            this.x = 0;
        } else if (this.y + this.radius < 0) {
            this.y = height;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
}

function ShootingStar(sx, sy) {
    this.sx = sx;
    this.sy = sy;
    this.sdx = 10;
    this.sdy = -5;
    this.radius = 2;

    this.draw = function () {
        c.beginPath();
        c.moveTo(this.sx, this.sy);
        c.lineTo(this.sx + 50, this.sy + 10);
        c.strokeStyle = "rgba(255,255,255,0.2)";
        c.stroke();
    };

    this.update = function () {
        if (this.sx + this.radius > width) {} else if (this.sy + this.radius > height) {} else {
            this.sx += 50;
            this.sy += 10;

            this.draw();
        }
    };
}

let starsArray = [];
let shootingStarsArray = [];

for (let i = 0; i < width / 2; i++) {
    let x = Math.random() * width;
    let y = Math.random() * height;
    let dy = -Math.random() / 15;
    let dx = -dy * 5;
    let radius = Math.random();
    starsArray.push(new Star(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);
    for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].update();
    }
    for (let i = 0; i < shootingStarsArray.length; i++) {
        shootingStarsArray[i].update();
    }
}

animate();

let int = setInterval(function () {
    shootingStarsArray = [];
    let sx = Math.random() * (width / 2);
    let sy = Math.floor(Math.random() * (height / 2));
    shootingStarsArray.push(new ShootingStar(sx, sy));
}, 3000);


function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    main.className = themeName;
    if(themeName==="day"){
        canvas.hidden = true;
    }else{
        canvas.hidden = false;
    }
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'night') {
        setTheme('day');
    } else {
        setTheme('night');
    }
}

(function () {
    if (localStorage.getItem('theme') === 'night') {
        setTheme('night');
        slider.checked = false;
    } else {
        setTheme('day');
        slider.checked = true;
    }
})();