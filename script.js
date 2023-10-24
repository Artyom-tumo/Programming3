const pause = document.getElementById("pause")
const resume = document.getElementById("resume")
const restart = document.getElementById("restart")


const grass = document.getElementById("grass")
const bomb = document.getElementById("bomb")
const grassEater = document.getElementById("grassEater")
const lazer = document.getElementById("lazer")
const predator = document.getElementById("predator")


let isPaused = false;

const sideX = 25;
const sideY = 25;
const socket = io();
var side = 25;

restart.addEventListener("click", ()=>{
    socket.emit("restart game")
})
pause.addEventListener("click", ()=>{
    isTart = true;
    socket.emit('pause game', isTart);
})
resume.addEventListener("click", ()=>{
    isTart = false;
    socket.emit('pause game', isTart);
})



function setup() {
    createCanvas(side * sideX, side * sideY);
    background('#acacac');

}

function drawGame(matrix) {
    for (var y = 0; y < sideY; y++) {
        for (var x = 0; x < sideX; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("black")
            } else if (matrix[y][x] == 5) {
                fill("purple")
            }
            rect(x * side, y * side, side, side);


        }
    }

    

}

// console.log(statisticObj);
socket.on("update stat", (obj)=>{
    grass.innerHTML = obj.grass
    grassEater.innerHTML = obj.grassEater
    lazer.innerHTML = obj.lazer
    bomb.innerHTML = obj.bomb
    predator.innerHTML = obj.predator
})
socket.on("update matrix", drawGame)