import GameSettings from "./GameSettings.js";
import { getRandomInRange } from "../utils/random.js";
import {
    wPressed,
    sPressed,
    arrowUpPressed,
    arrowDownPressed,
    startGameKeyPressed,
    resetMovementKeys,
    resetStartGameKeyPressed,
} from "../utils/handleKeys.js";

//define class Pong for the game Pong with assets paddle 1 (player 1),
//paddle 2 (player 2), a ball and context for drawing the game assets
export default class Pong {
    constructor(context, paddle1, paddle2, ball) {
        this._context = context;
        this._context.font = "20px Arial";
        this._context.fillStyle = "#000000";

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
            //else if the ball crosses the left or right border of the canvas, +1 score point
            this._paddle2.score++;

            if (this._paddle2.score === GameSettings.END_GAME_POINTS) {
                this.end("Player 2");
            }

            this.restart();
        } else if (
            this._ball.x + this._ball.radius >
            GameSettings.CANVAS_WIDTH
        ) {
            this._paddle1.score++;

            if (this._paddle1.score === GameSettings.END_GAME_POINTS) {
                this.end("Player 1");
            }

            this.restart();
        }

        //if the ball (the center of the ball and its radius) reaches the top or bottom border of the canvas,
        //reverse the direction so that it bounce off the border
        if (
            this._ball.y + this._ball.dy < this._ball.radius ||
            this._ball.y + this._ball.dy >
                GameSettings.CANVAS_HEIGHT - this._ball.radius
        ) {
            this._ball.reverseVerticalDirection();
        }
    }

    movePaddles() {
        if (wPressed) {
            //check if the paddle has reached the top of the canvas
            if (this._paddle1.y > GameSettings.CANVAS_Y) {
                this._paddle1.moveUp();
            }
        } else if (sPressed) {
            //check if the paddle has reached the bottom of the canvas
            if (
                this._paddle1.y + this._paddle1.height <
                GameSettings.CANVAS_HEIGHT
            ) {
                this._paddle1.moveDown();
            }
        }

        if (arrowUpPressed) {
            //check if the paddle has reached the top of the canvas
            if (this._paddle2.y > GameSettings.CANVAS_Y) {
                this._paddle2.moveUp();
            }
        } else if (arrowDownPressed) {
            //check if the paddle has reached the bottom of the canvas
            if (
                this._paddle2.y + this._paddle2.height <
                GameSettings.CANVAS_HEIGHT
            ) {
                this._paddle2.moveDown();
            }
        }
    }

    drawScore() {
        this._context.fillText(
            this._paddle1.score + " : " + this._paddle2.score,
            GameSettings.CANVAS_WIDTH / 2 - 20,
            30
        );
    }

    drawWelcomeMessage() {
        this._context.fillText(
            "Press any key to start new game.",
            GameSettings.CANVAS_WIDTH / 3,
            GameSettings.CANVAS_WIDTH / 6
        );
    }

    //method to start the interval that executes the main draw method for the game Pong every "time" milliseconds
    start(time) {
        this.drawWelcomeMessage();

        clearInterval(this._ballInterval);

        var self = this;
        this._ballInterval = setInterval(function () {
            //check if any key was pressed to start the game initially
            if (startGameKeyPressed) {
                self.draw();
            }
        }, time);
    }

    end(message) {
        alert(message + " is the winner! Bravo!");

        this._paddle1.score = 0;
        this._paddle2.score = 0;

        resetStartGameKeyPressed();
    }

    //method to display the current score, reinitialize the game assets and
    //restart the interval that executes the main draw method for the game Pong
    restart() {
        //alert the score only when a player has scored
        if (this._paddle1.score > 0 || this._paddle2.score > 0) {
            alert(this._paddle1.score + " : " + this._paddle2.score);
        }

        //reset paddle1 coordinates
        this._paddle1.x = GameSettings.PADDLE_WIDTH;
        this._paddle1.y =
            GameSettings.CANVAS_HEIGHT / 2 - GameSettings.PADDLE_HEIGHT / 2;

        //reset paddle2 coordinates
        this._paddle2.x =
            GameSettings.CANVAS_WIDTH - GameSettings.PADDLE_WIDTH * 2;
        this._paddle2.y =
            GameSettings.CANVAS_HEIGHT / 2 - GameSettings.PADDLE_HEIGHT / 2;

        //reset ball coordinates
        this._ball.x = GameSettings.CANVAS_WIDTH / 2;
        this._ball.y = getRandomInRange(
            GameSettings.CANVAS_Y + GameSettings.BALL_RADIUS,
            GameSettings.CANVAS_HEIGHT - GameSettings.BALL_RADIUS
        );

        if (this._ball.dx < 0) {
            this._ball.dx = -this._ball.dx;
        }

        if (this._ball.dy < 0) {
            this._ball.dy = -this._ball.dy;
        }

        //reset state of movement keys
        resetMovementKeys();

        //start the interval timer again for every EXEC_INTERVAL milliseconds
        this.start(GameSettings.EXEC_INTERVAL);
    }

    clearCanvas() {
        //clear the whole canvas
        this._context.clearRect(
            GameSettings.CANVAS_X,
            GameSettings.CANVAS_Y,
            GameSettings.CANVAS_WIDTH,
            GameSettings.CANVAS_HEIGHT
        );

        this._context.beginPath();

        //start drawing from top left corner of canvas (0,0)
        this._context.moveTo(GameSettings.CANVAS_X, GameSettings.CANVAS_Y);

        //draw the border of the canvas
        this._context.lineTo(GameSettings.CANVAS_X, GameSettings.CANVAS_HEIGHT);
        this._context.lineTo(
            GameSettings.CANVAS_WIDTH,
            GameSettings.CANVAS_HEIGHT
        );
        this._context.lineTo(GameSettings.CANVAS_WIDTH, GameSettings.CANVAS_Y);
        this._context.lineTo(GameSettings.CANVAS_X, GameSettings.CANVAS_Y);

        //draw a line in the middle vertical of the canvas
        this._context.moveTo(
            GameSettings.CANVAS_WIDTH / 2,
            GameSettings.CANVAS_Y + 50
        );
        this._context.lineTo(
            GameSettings.CANVAS_WIDTH / 2,
            GameSettings.CANVAS_HEIGHT
        );

        this._context.stroke();
    }
}
