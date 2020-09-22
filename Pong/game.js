import Paddle from "./classes/Paddle.js";
import GameSettings from "./classes/GameSettings.js";
import { getRandomInRange } from "./utils/random.js";
import Ball from "./classes/Ball.js";
import Pong from "./classes/Pong.js";

//initialization function where all game assets are created and added to the game
function init() {
    let paddle1 = new Paddle(
        GameSettings.CANVAS,
        GameSettings.PADDLE_WIDTH,
        GameSettings.CANVAS_HEIGHT / 2 - GameSettings.PADDLE_HEIGHT / 2,
        5,
        5,
        GameSettings.PADDLE_WIDTH,
        GameSettings.PADDLE_HEIGHT
    );
    let paddle2 = new Paddle(
        GameSettings.CANVAS,
        GameSettings.CANVAS_WIDTH - GameSettings.PADDLE_WIDTH * 2,
        GameSettings.CANVAS_HEIGHT / 2 - GameSettings.PADDLE_HEIGHT / 2,
        5,
        5,
        GameSettings.PADDLE_WIDTH,
        GameSettings.PADDLE_HEIGHT
    );

    let randomY = getRandomInRange(
        GameSettings.CANVAS_Y + GameSettings.BALL_RADIUS,
        GameSettings.CANVAS_HEIGHT - GameSettings.BALL_RADIUS
    );

    let ball = new Ball(
        GameSettings.CANVAS,
        GameSettings.CANVAS_WIDTH / 2,
        randomY,
        5,
        5,
        GameSettings.BALL_RADIUS,
        0,
        Math.PI * 2,
        "#f2a62e"
    );

    let game = new Pong(GameSettings.CANVAS, paddle1, paddle2, ball);

    //start the game and draw it every EXEC_INTERVAL milliseconds
    game.start(GameSettings.EXEC_INTERVAL);
}

//when the initial HTML document has been completely loaded and parsed,
//without waiting for stylesheets, images, and subframes to finish loading,
//call the init method
document.addEventListener("DOMContentLoaded", init);
