
const sideX = 30;
const sideY = 30;
const socket = io();
var side = 50;

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

socket.on("update matrix", drawGame)