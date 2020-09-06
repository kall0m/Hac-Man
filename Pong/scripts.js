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

    moveUp() {
        this._y -= this._dy; //move asset up by decrementing the y coordinate with dy
    }

    moveDown() {
        this._y += this._dy; //move asset down by incrementing the y coordinate with dy
    }

    moveLeft() {
        this._x -= this._dx; //move asset left by decrementing the x coordinate with dx
    }

    moveRight() {
        this._x += this._dx; //move asset right by incrementing the x coordinate with dx
    }

    reverseHorizontalDirection() {
        this._dx = -this._dx;
    }

    reverseVerticalDirection() {
        this._dy = -this._dy;
    }

    move() {
        //move asset by incrementing the x & y coordinate with dx & dy

        this.moveRight();
        this.moveDown();
    }

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
        this._context.closePath();
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
        this._context.closePath();
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
        ball.clear(); //clear the current ball

        ball.draw(); //draw the new ball with new position

        //check if the ball (the center of the ball and its radius) will reach the borders of the canvas
        //if it will, reverse the direction
        if (
            ball.x + ball.dx < ball.radius ||
            ball.x + ball.dx > CANVAS_WIDTH - ball.radius
        ) {
            ball.reverseHorizontalDirection();
        }

        if (
            ball.y + ball.dy < ball.radius ||
            ball.y + ball.dy > CANVAS_HEIGHT - ball.radius
        ) {
            ball.reverseVerticalDirection();
        }

        ball.move();
    }, 10);

    paddle1.draw();
    startGame(paddle1);
}

function startGame(paddle1) {
    document.onkeydown = function (e) {
        let keyPressed = e.keyCode;

        if (keyPressed === S_KEY) {
            //check if the paddle has reached the end of the canvas
            if (paddle1.y + paddle1.height < CANVAS_HEIGHT) {
                paddle1.clear(); //clear the current paddle
                paddle1.moveDown();
                paddle1.draw(); //draw the new paddle with new position
            }
        } else if (keyPressed === W_KEY) {
            //check if the paddle has reached the beginning of the canvas
            if (paddle1.y > CANVAS_Y) {
                paddle1.clear(); //clear the current paddle
                paddle1.moveUp();
                paddle1.draw(); //draw the new paddle with new position
            }
        }
    };
}

// the object moves by going from one position to another depending on what the speed is
// the game defines the rules and how that object would be limited
