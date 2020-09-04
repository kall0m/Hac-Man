var context;

var paddle = {
    x: 0,
    y: 0,
    dx: 5,
    dy: 5,
    w: 20,
    h: 100,
};

function init() {
    context = game.getContext("2d");

    drawPaddle(paddle);
}

function drawPaddle(paddle) {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    context.stroke();
}
