const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

const mouse = {
    x: null,
    y: null,
    radius: 70
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;//take the info from the event and set it in the mouse object to get the current 
    mouse.y = event.y//loctaion of mouse whenever mouse moves
})

ctx.fillStyle = 'white';
ctx.font = '35px Verdana';
ctx.fillText('HAPPY', 45, 50);
ctx.fillText('BIRTHDAY', 30, 80);
const textCoordinates = ctx.getImageData(0, 0, 10000, 10000);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 100) + 20;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        //to create angles to push all particles within circular radius 
        let sine = dx / distance;
        let cosine = dy / distance;
        //to create a relative index for distance from th mouse  
        let maxDistance = mouse.radius - 1;
        let move = (maxDistance - distance) / maxDistance;
        //
        let Xdirection = sine * move * this.density;
        let Ydirection = cosine * move * this.density;
        if (distance < mouse.radius) {
            this.x -= Xdirection;
            this.y -= Ydirection;
        }
        //To retreat the particles back to original postion
        else {
            if (this.x != this.baseX) {
                this.x -= (this.x - this.baseX) / 5;
            }
            if (this.y != this.baseY) {
                this.y -= (this.y - this.baseY) / 5;
            }
        }
    }                                                                       
}
function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 150) {
                let positionX = x;
                let positionY = y;
                particleArray.push(new Particle(positionX * 7, positionY * 7));
            }
        }
    }
}
console.log(particleArray);
init();
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}
animate();

function connect(){
    for(let a=0;a<particleArray.length;a++)
        for(let b=a;b<particleArray.length;b++){
            let dx=particleArray[a].x-particleArray[b].x;
            let dy=particleArray[a].y-particleArray[b].y;
            let distance=Math.sqrt(dx*dx + dy*dy);

            if (distance<15){
                ctx.strokeStyle='white';
                ctx.lineWidth=2;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x,particleArray[a].y);
                ctx.lineTo(particleArray[b].x,particleArray[b].y)
                ctx.stroke();
            }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio1');
    // Unmute and play after the page loads
    audio.muted = false;
    audio.play().then(() => {
        console.log('Audio is playing');
    }).catch(error => {
        console.error('Playback failed:', error);
    });
})