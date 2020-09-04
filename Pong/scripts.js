const BG = 1;
const BALL = 2;
const BORDER = 3;
const PADDLE1 = 4;
const PADDLE2 = 5;
const OUT = 6;

var field = [
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 6],
    [6, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 6],
    [6, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];

var ball = {
    x: 11,
    y: Math.floor(Math.random() * field.length),
    xSpeed: 5,
    ySpeed: 5,
};

function drawField() {
    document.getElementById("scene").innerHTML = "";

    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] === BG) {
                document.getElementById("scene").innerHTML +=
                    "<div class='tile bg'></div>";
            } else if (field[y][x] === BORDER) {
                document.getElementById("scene").innerHTML +=
                    "<div class='tile border'></div>";
            } else if (field[y][x] === BALL) {
                document.getElementById("scene").innerHTML +=
                    "<div class='tile ball'></div>";
            } else if (field[y][x] === PADDLE1 || field[y][x] === PADDLE2) {
                document.getElementById("scene").innerHTML +=
                    "<div class='tile paddle'></div>";
            }
        }

        document.getElementById("scene").innerHTML += "<br/>";
    }
}

function startGame() {
    document.onkeydown = function (e) {
        let keyPressed = e.keyCode;

        if (keyPressed === 32) {
            //space bar pressed

            //field[ball.y][ball.x] = BALL;

            if (field[ball.y + 1][ball.x] !== OUT) {
                field[ball.y][ball.x] = BG;
                field[--ball.y][++ball.x] = BALL;
            } else if (field[ball.y - 1][ball.x] !== OUT) {
                field[ball.y][ball.x] = BG;
                field[++ball.y][++ball.x] = BALL;
            } else if (field[ball.y][ball.x + 1] !== OUT) {
                field[ball.y][ball.x] = BG;
                field[++ball.y][--ball.x] = BALL;
            } else if (field[ball.y][ball.x - 1] !== OUT) {
                field[ball.y][ball.x] = BG;
                field[++ball.y][++ball.x] = BALL;
            }

            drawField();
            //}
        }
    };
}

drawField();
startGame();
