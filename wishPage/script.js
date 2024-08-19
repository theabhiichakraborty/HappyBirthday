const canvas = document.getElementById("canavs1");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

const mouse ={
    x:null,
    y:null,
    radius:150
}

window.addEventListener('mousemove',function(event){
        mouse.x=event.x;//take the info from the event and set it in the mouse object to get the current 
        mouse.y=event.y//loctaion of mouse whenever mouse moves

})

ctx.fillStyle='white';
ctx.font='30px Verdana';
ctx.fillText('A',30,30);
const data=ctx.getImageData(0,0,100,100)

