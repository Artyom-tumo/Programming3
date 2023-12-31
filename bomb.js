
let Creauture = require("./creature")
const io = require("./servers");
module.exports =  class Bomb extends Creauture {
    constructor(x, y) {
        super(x, y)


    }


    chooseCell(character) {
        this.getNewCoordinates()

        return super.chooseCell(character)
    }

    mul() {
        
        var newCell = this.selectRandomCell(0);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newGrass = new Bomb(newX, newY);
            bombArr.push(newGrass);

        }
        statisticObj.bomb++
        io.on("update stat", statisticObj)
    }

    eat() {


        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == 1) {
                    

                    matrix[y][x] = 0
                    for (var i in grassArr) {
                        if (x == grassArr[i].x && y == grassArr[i].y) {
                            grassArr.splice(i, 1);
                            this.die()
                            break;
                        }
                    }
                }

                if (matrix[y][x] == 2) {
                   

                    matrix[y][x] = 0
                    for (var i in grassEaterArr) {
                        if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1);
                            this.die()
                            break;
                        }
                    }
                }

                if (matrix[y][x] == 3) {
                   

                    matrix[y][x] = 0
                    for (var i in predatorArr) {
                        if (x == predatorArr[i].x && y == predatorArr[i].y) {
                            predatorArr.splice(i, 1);
                            this.die()
                            break;
                        }
                    }
                }
            }
        }




    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in bombArr) {
            if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                bombArr.splice(i, 1);
                break;
            }

        }
    }

}