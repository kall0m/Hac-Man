const S_KEY = 83;
const W_KEY = 87;

const CANVAS = pongCanvas.getContext("2d");
const CANVAS_WIDTH = pongCanvas.width;
const CANVAS_HEIGHT = pongCanvas.height;
const CANVAS_X = 0;
const CANVAS_Y = 0;

class Asset {
    constructor(x, y, dx, dy, context, color) {
        this._x = x;
        this._y = y;
        this._dx = dx;
        this._dy = dy;
        this._context = context;
        this._color = color;
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

    get context() {
        return this._context;
    }

    set context(context) {
        this._context = context;
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color;
    }

    draw() {}

    clear(x, y, width, height) {
        this._context.clearRect(x, y, width, height);
    }
}

class Paddle extends Asset {
    constructor(x, y, dx, dy, width, height, context, color) {
        super(x, y, dx, dy, context, color);
        this._width = width;
        this._height = height;
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

    //draw a paddle with its given x & y coordinates and width & height on the canvas
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
        super.clear(0, 0, this._width + 1, CANVAS_HEIGHT); //width of paddle + 1 px for the outline
    }
}

class Ball extends Asset {
    constructor(x, y, dx, dy, radius, startAngle, endAngle, context, color) {
        super(x, y, dx, dy, context, color);
        this._radius = radius;
        this._startAngle = startAngle;
        this._endAngle = endAngle;
    }

    get radius() {
        return this._radius;
    }

    set radius(radius) {
        this._radius = radius;
    }

    get startAngle() {
        return this._startAngle;
    }

    set startAngle(startAngle) {
        this._startAngle = startAngle;
    }

    get endAngle() {
        return this._endAngle;
    }

    set endAngle(endAngle) {
        this._endAngle = endAngle;
    }

    //draw a circle with its given radius and x & y coordinates on the canvas and fill it with its given color
    draw() {
        this._context.beginPath();
        this._context.fillStyle = this._color;
        this._context.arc(
            this._x,
            this._y,
            this._radius,
            this._startAngle,
            this._endAngle,
            this._anticlockwise
        );
        this._context.fill();
    }

    move() {
        this.clear(); //clear the current ball

        this.draw(); //draw the new ball with new position

        //check if the ball has reached the borders of the canvas and set the direction to the opposite
        if (
            this._x - this._radius < 0 ||
            this._x + this._radius > CANVAS_WIDTH
        ) {
            this._dx = -this._dx;
        }

        if (
            this._y - this._radius < 0 ||
            this._y + this._radius > CANVAS_HEIGHT
        ) {
            this._dy = -this._dy;
        }

        //move ball by incrementing the x & y coordinate with dx & dy
        this._x += this._dx;
        this._y += this._dy;
    }

    //clear the current ball
    clear() {
        super.clear(20, 0, CANVAS_WIDTH - 20, CANVAS_HEIGHT);
    }
}

function init() {
    var paddle1 = new Paddle(0, 0, 5, 10, 20, 100, CANVAS);

    var ball = new Ball(100, 200, 5, 5, 20, 0, Math.PI * 2, CANVAS, "#000000");

    setInterval(function () {
        ball.move();
    }, 10);

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
