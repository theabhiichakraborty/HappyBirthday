const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;//take the info from the event and set it in the mouse object to get the current 
    mouse.y = event.y//loctaion of mouse whenever mouse moves
})

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('A', 0, 30);
// ctx.strokeStyle='white';
// ctx.strokeRect(0,0,100,100);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);
// console.log(textCoordinates);
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
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
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x;
                let positionY = y;
                particleArray.push(new Particle(positionX * 10, positionY * 10));
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
        particleArray[i].update()
    }
    requestAnimationFrame(animate);
}
animate();
