//define CANVAS attributes as constants
const CANVAS = pongCanvas.getContext("2d");
const CANVAS_WIDTH = pongCanvas.width;
const CANVAS_HEIGHT = pongCanvas.height;
const CANVAS_X = 0;
const CANVAS_Y = 0;

//define game assets attributes as constants
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 20;

//define the interval of time in milliseconds in which the game is executed
const EXEC_INTERVAL = 10;

//define paddle control keys key codes as constants
const W_KEY = 87;
const S_KEY = 83;

const ARROW_UP_KEY = 38;
const ARROW_DOWN_KEY = 40;

//define boolean variables for the state of the keys to check whether it is pressed or released
var wPressed = false;
var sPressed = false;

var arrowUpPressed = false;
var arrowDownPressed = false;

//when a key is pressed, execute the setKeyPressed function to know that it was pressed
document.onkeydown = function (e) {
    setKeyPressed(e.keyCode, true);
};

//when a key is released, execute the setKeyPressed function to know that it was released
document.onkeyup = function (e) {
    setKeyPressed(e.keyCode, false);
};

//check if the key that was pressed is W, S, Arrow Up or Arrow Down
//and set its boolean variable that checks its state to true if pressed and to false if released
function setKeyPressed(keyPressed, isPressed) {
    switch (keyPressed) {
        case W_KEY:
            wPressed = isPressed;
            break;
        case S_KEY:
            sPressed = isPressed;
            break;
        case ARROW_UP_KEY:
            arrowUpPressed = isPressed;
            break;
        case ARROW_DOWN_KEY:
            arrowDownPressed = isPressed;
            break;
        default:
            break;
    }
}

//define class Asset for a game asset with x and y coordinates, speed (dx and dy) and color
class Asset {
    constructor(x, y, dx, dy, color) {
        this._x = x;
        this._y = y;
        this._dx = dx;
        this._dy = dy;
        this._context = null;
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
}

//define child class Paddle of class Asset for a pong paddle with widht, height and score
class Paddle extends Asset {
    constructor(x, y, dx, dy, width, height, color) {
        super(x, y, dx, dy, color);
        this._width = width;
        this._height = height;
        this._score = 0;
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

    get score() {
        return this._score;
    }

    set score(score) {
        this._score = score;
    }

    //draw a paddle with its given x & y coordinates and width & height on the canvas
    draw() {
        this._context.beginPath();
        this._context.rect(this._x, this._y, this._width, this._height);
        this._context.stroke();
        this._context.closePath();
    }
}

//define child class Ball of class Asset for a ball with radius, start and end angle for drawing
class Ball extends Asset {
    constructor(x, y, dx, dy, radius, startAngle, endAngle, color) {
        super(x, y, dx, dy, color);
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
}

//define class Pong for the game Pong with assets paddle 1 (player 1),
//paddle 2 (player 2), a ball and context for drawing the game assets
class Pong {
    constructor(context, paddle1, paddle2, ball) {
        this._context = context;

        this._paddle1 = paddle1;
        this._paddle1.context = context;

        this._paddle2 = paddle2;
        this._paddle2.context = context;

        this._ball = ball;
        this._ball.context = context;

        this._score = 0;
        this._ballInterval = null;
    }

    get context() {
        return this._context;
    }

    set context(context) {
        this._context = context;
    }

    get paddle1() {
        return this._paddle1;
    }

    set paddle1(paddle1) {
        this._paddle1 = paddle1;
    }

    get paddle2() {
        return this._paddle2;
    }

    set paddle2(paddle2) {
        this._paddle2 = paddle2;
    }

    get ball() {
        return this._ball;
    }

    set ball(ball) {
        this._ball = ball;
    }

    get score() {
        return this._score;
    }

    set score(score) {
        this._score = score;
    }

    get ballInterval() {
        return this._ballInterval;
    }

    set ballInterval(ballInterval) {
        this._ballInterval = ballInterval;
    }

    //the main method of the Pong game which draws all assets and starts the game
    draw() {
        this.clearCanvas();

        this._ball.draw();
        this._paddle1.draw();
        this._paddle2.draw();

        this.drawScore();

        this.detectCollision();

        this.movePaddles();

        this._ball.move();
    }

    detectCollision() {
        //if the ball hits a paddle (the ball's y is in between the start y and end y of the paddle
        //and the ball's left/right x coordinate is smaller/bigger than the paddle's right/left x coordinate), it bounces off
        if (
            (this._ball.y > this._paddle1.y &&
                this._ball.y < this._paddle1.y + this._paddle1.height &&
                this._ball.x + this._ball.dx - this._ball.radius <
                    this._paddle1.x + this._paddle1.width) ||
            (this._ball.y > this._paddle2.y &&
                this._ball.y < this._paddle2.y + this._paddle2.height &&
                this._ball.x + this._ball.dx >
                    this._paddle2.x - this._ball.radius)
        ) {
            //reverse the direction so that it bounces off the surface
            this._ball.reverseHorizontalDirection();
        } else if (this._ball.x - this._ball.radius < 0) {
            //else if the ball crosses the left or right border of the canvas, -1 score point
            this._paddle2.score++;
            this.restart();
        } else if (this._ball.x + this._ball.radius > CANVAS_WIDTH) {
            this._paddle1.score++;
            this.restart();
        }

        //if the ball (the center of the ball and its radius) reaches the top or bottom border of the canvas,
        //reverse the direction so that it bounce off the border
        if (
            this._ball.y + this._ball.dy < this._ball.radius ||
            this._ball.y + this._ball.dy > CANVAS_HEIGHT - this._ball.radius
        ) {
            this._ball.reverseVerticalDirection();
        }
    }

    movePaddles() {
        if (wPressed) {
            //check if the paddle has reached the top of the canvas
            if (this._paddle1.y > CANVAS_Y) {
                this._paddle1.moveUp();
            }
        } else if (sPressed) {
            //check if the paddle has reached the bottom of the canvas
            if (this._paddle1.y + this._paddle1.height < CANVAS_HEIGHT) {
                this._paddle1.moveDown();
            }
        }

        if (arrowUpPressed) {
            //check if the paddle has reached the top of the canvas
            if (this._paddle2.y > CANVAS_Y) {
                this._paddle2.moveUp();
            }
        } else if (arrowDownPressed) {
            //check if the paddle has reached the bottom of the canvas
            if (this._paddle2.y + this._paddle2.height < CANVAS_HEIGHT) {
                this._paddle2.moveDown();
            }
        }
    }

    drawScore() {
        this._context.font = "20px Arial";
        this._context.fillStyle = "#000000";
        this._context.fillText(
            this._paddle1.score + " : " + this._paddle2.score,
            CANVAS_WIDTH / 2 - 20,
            30
        );
    }

    //method to start the interval that executes the main draw method for the game Pong every "time" milliseconds
    start(time) {
        clearInterval(this._ballInterval);
        var self = this;
        this._ballInterval = setInterval(function () {
            self.draw();
        }, time);
    }

    //method to display the current score, reinitialize the game assets and
    //restart the interval that executes the main draw method for the game Pong
    restart() {
        alert(this._paddle1.score + " : " + this._paddle2.score);

        //reset paddle1 coordinates
        this._paddle1.x = PADDLE_WIDTH;
        this._paddle1.y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;

        //reset paddle2 coordinates
        this._paddle2.x = CANVAS_WIDTH - PADDLE_WIDTH * 2;
        this._paddle2.y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;

        //reset ball coordinates
        this._ball.x = CANVAS_WIDTH / 2;
        this._ball.y = getRandomInRange(
            CANVAS_Y + BALL_RADIUS,
            CANVAS_HEIGHT - BALL_RADIUS
        );

        if (this._ball.dx < 0) {
            this._ball.dx = -this._ball.dx;
        }

        if (this._ball.dy < 0) {
            this._ball.dy = -this._ball.dy;
        }

        //reset state of keys

        wPressed = false;
        sPressed = false;

        arrowUpPressed = false;
        arrowDownPressed = false;

        //start the interval timer again for every EXEC_INTERVAL milliseconds
        this.start(EXEC_INTERVAL);
    }

    clearCanvas() {
        //clear the whole canvas
        this._context.clearRect(
            CANVAS_X,
            CANVAS_Y,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
        );

        this._context.beginPath();

        //start drawing from top left corner of canvas (0,0)
        this._context.moveTo(CANVAS_X, CANVAS_Y);

        //draw the border of the canvas
        this._context.lineTo(CANVAS_X, CANVAS_HEIGHT);
        this._context.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
        this._context.lineTo(CANVAS_WIDTH, CANVAS_Y);
        this._context.lineTo(CANVAS_X, CANVAS_Y);

        //draw a line in the middle vertical of the canvas
        this._context.moveTo(CANVAS_WIDTH / 2, CANVAS_Y + 50);
        this._context.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);

        this._context.stroke();
    }
}

//function to generate a random number between "min" and "max"
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//initialization function where all game assets are created and added to the game
function init() {
    var paddle1 = new Paddle(
        PADDLE_WIDTH,
        CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
        5,
        5,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
    );
    var paddle2 = new Paddle(
        CANVAS_WIDTH - PADDLE_WIDTH * 2,
        CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
        5,
        5,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
    );

    var randomY = getRandomInRange(
        CANVAS_Y + BALL_RADIUS,
        CANVAS_HEIGHT - BALL_RADIUS
    );

    var ball = new Ball(
        CANVAS_WIDTH / 2,
        randomY,
        5,
        5,
        BALL_RADIUS,
        0,
        Math.PI * 2,
        "#000000"
    );
    var game = new Pong(CANVAS, paddle1, paddle2, ball);

    //start the game and draw it every EXEC_INTERVAL milliseconds
    game.start(EXEC_INTERVAL);
}

// Explanation of the logic of the code's structure:
// the object moves by going from one position to another depending on what the speed is
// the game defines the rules and how that object would be limited
