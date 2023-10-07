class Lazer   {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.directions = [
            [this.x-1, this.y - 1],
            [this.x-2, this.y - 2],
            [this.x-3, this.y -3],
            [this.x-4, this.y - 4],
            [this.x-5, this.y - 5],
            [this.x-6, this.y -6],
            [this.x-7, this.y -7],
            [this.x-8, this.y - 8],
            [this.x-9, this.y - 9],
            [this.x-10, this.y - 10],
            [this.x-11, this.y -11],
            [this.x-12, this.y - 12],
            [this.x-13, this.y - 13],
            [this.x-14, this.y - 14],
            [this.x+1, this.y+1],
            [this.x+2, this.y + 2],
            [this.x+3, this.y + 3],
            [this.x+4, this.y + 4],
            [this.x+5, this.y+5],
            [this.x+6, this.y + 6],
            [this.x+7, this.y + 7],
            [this.x+8, this.y + 8],
            [this.x+9, this.y+9],
            [this.x+10, this.y + 10],
            [this.x+11, this.y + 11],
            [this.x+12, this.y + 12],
            [this.x+13, this.y+ 13],
            [this.x+14, this.y + 14]
        ];
    }
    chooseCell(character, character1) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }


            }
        }
        return found;
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newGrass = new Lazer(newX, newY);
            lazerArr.push(newGrass);

        }
    }

    eat() {
       

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            
                if (matrix[y][x] == 1) {
                    console.log('aloooo');
                    
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
                    console.log('aloooo');
                    
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
                    console.log('aloooo');
                    
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
        for (var i in lazerArr) {
            if (this.x == lazerArr[i].x && this.y ==lazerArr[i].y) {
                lazerArr.splice(i, 1);
                break;
            }

        }
    }

}