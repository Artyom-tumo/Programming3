const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const io = require("socket.io")(server)

matrix = []
predatorArr = []
grassArr = [];
grassEaterArr = [];
bombArr = [];
lazerArr = [];
const sideX = 15;
const sideY = 20;

const speed = 1200;

let Grass = require("./grass")
let Bomb = require("./bomb")
let Lazer = require("./lazer")
let GrassEater = require("./grassEater")
let Predator = require("./predator")


app.use(express.static('.'))

app.get('/', function (req, res) {
    res.redirect("index.html")
})





function random(min, max) {
    if (min === undefined && max === undefined) {
        return Math.random();
    } else if (max === undefined) {
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}

function character(quantity, char) {
    let initialNumber = 0;
    while (initialNumber < quantity) {
        let x = Math.floor(random(0, sideX));
        let y = Math.floor(random(0, sideY));
        if (matrix[y][x] == 0) {
            matrix[y][x] = char;
        }
        initialNumber++;
    }
}

for (let i = 0; i < sideY; i++) {
    matrix.push([]);
    for (let j = 0; j < sideX; j++) {
        matrix[i].push(0);
    }
}


//   console.log(matrix);
function initGame() {

    character(50, 1);
    character(10, 2);
    character(35, 3);
    character(20, 4);
    character(15, 5);
    startInterval();
    initArrays();
}
function initArrays() {
    predatorArr = []
    grassArr = [];
    grassEaterArr = [];
    bombArr = [];
    lazerArr = [];
    for (var y = 0; y < sideY; y++) {
        for (var x = 0; x < sideX; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y);
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                let predator1 = new Predator(x, y);
                predatorArr.push(predator1)
            } else if (matrix[y][x] == 4) {
                let bomb = new Bomb(x, y);
                bombArr.push(bomb)
            } else if (matrix[y][x] == 5) {
                let lazer = new Lazer(x, y);
                lazerArr.push(lazer)
            }
        }
    }
}

let intName;
function startInterval() {
    clearInterval(intName);
    intNaame = setInterval(function () {
        playGame()
    }, speed)
}
function playGame() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in bombArr) {
        bombArr[i].eat()
    }
     for (let i in lazerArr) {
        lazerArr[i].eat()
    }
    io.emit("update matrix", matrix)
}


io.on("connection", function (socket) {
    socket.emit('update matrix', matrix)
    initGame()


})
server.listen(3001, () => {
    console.log("listening to port 3001");
})
