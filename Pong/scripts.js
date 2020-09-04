const S_KEY = 83;
const W_KEY = 87;

const CANVAS = pongCanvas.getContext("2d");
const CANVAS_WIDTH = pongCanvas.width;
const CANVAS_HEIGHT = pongCanvas.height;
const CANVAS_X = 0;
const CANVAS_Y = 0;

class Paddle {
    constructor(x, y, dx, dy, width, height, context) {
        this._x = x;
        this._y = y;
        this._dx = dx;
        this._dy = dy;
        this._width = width;
        this._height = height;
        this._context = context;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    get dx() {
        return this._dx;
    }

    set dx(dx) {
        this._dx = dx;
    }

    get dy() {
        return this._dy;
    }

    set dy(dy) {
        this._dy = dy;
    }

    get width() {
        return this._width;
    }

    set width(width) {
        this._width = width;
    }

    get height() {
        return this._height;
    }

    set height(height) {
        this._height = height;
    }

    get context() {
        return this._context;
    }

    set context(context) {
        this._context = context;
    }

    //draw the paddle with its given x & y coordinates and width & height
    draw() {
        this._context.beginPath();
        this._context.rect(this._x, this._y, this._width, this._height);
        this._context.stroke();
    }

    moveDown() {
        //check if the paddle has reached the end of the canvas
        if (this._y + this._height < CANVAS_HEIGHT) {
            this.clear(); //clear the current paddle

            this._y += this._dy; //move paddle down by incrementing the y coordinate with dy

            this.draw(); //draw the new paddle with new position
        }
    }

    moveUp() {
        //check if the paddle has reached the beginning of the canvas
        if (this._y > CANVAS_Y) {
            this.clear(); //clear the current paddle

            this._y -= this._dy; //move paddle up by decrementing the y coordinate with dy

            this.draw(); //draw the new paddle with new position
        }
    }

    //clear the current paddle
    clear() {
        this._context.clearRect(
            0, //FIX LATER
            0, //FIX LATER
            this._width + 1, //width of paddle + 1 px for the outline
            CANVAS_HEIGHT
        );
    }
}

function init() {
    var paddle1 = new Paddle(0, 0, 5, 10, 20, 100, CANVAS);

    paddle1.draw();
    startGame(paddle1);
}

function startGame(paddle1) {
    document.onkeydown = function (e) {
        let keyPressed = e.keyCode;

        if (keyPressed === S_KEY) {
            paddle1.moveDown();
        } else if (keyPressed === W_KEY) {
            paddle1.moveUp();
        }
    };
}
