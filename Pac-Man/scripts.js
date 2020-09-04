const WALL = 1;
const BG = 2;
const DOT = 3;
const HACMAN = 4;

var myPos = {
    x: 4,
    y: 5,
};

var map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 3, 3, 4, 3, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
];

function drawMap() {
    // <div class="tile wall"></div>
    // <div class="tile hacman"></div>
    // <div class="tile dot"></div>
    // <div class="tile wall"></div>

    document.getElementById("scene").innerHTML = "";

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === WALL) {
                document.getElementById("scene").innerHTML +=
                    "<div class='tile wall'></div>";
            } else if (map[y][x] === BG) {
                document.getElementById("scene").innerHTML +=
                    "<div class='tile bg'></div>";
            } else if (map[y][x] === DOT) {
                document.getElementById("scene").innerHTML +=
                    "<div class='tile dot'></div>";
            } else if (map[y][x] === HACMAN) {
                document.getElementById("scene").innerHTML +=
                    "<div class='tile hacman'></div>";
            }
        }

        document.getElementById("scene").innerHTML += "<br/>";
    }
}

function initInputs() {
    document.onkeydown = function (e) {
        let keyPressed = e.keyCode;

        if (keyPressed === 37) {
            //left
            if (map[myPos.y][myPos.x - 1] !== WALL) {
                map[myPos.y][myPos.x] = BG;
                map[myPos.y][--myPos.x] = HACMAN;
            }
        } else if (keyPressed === 38) {
            //up
            if (map[myPos.y - 1][myPos.x] !== WALL) {
                map[myPos.y][myPos.x] = BG;
                map[--myPos.y][myPos.x] = HACMAN;
            }
        } else if (keyPressed === 39) {
            //right
            if (map[myPos.y][myPos.x + 1] !== WALL) {
                map[myPos.y][myPos.x] = BG;
                map[myPos.y][++myPos.x] = HACMAN;
            }
        } else if (keyPressed === 40) {
            //down
            if (map[myPos.y + 1][myPos.x] !== WALL) {
                map[myPos.y][myPos.x] = BG;
                map[++myPos.y][myPos.x] = HACMAN;
            }
        }

        console.log(e.keyCode);
        drawMap();
    };
}

drawMap();
initInputs();
