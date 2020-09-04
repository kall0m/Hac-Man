const S_KEY = 83;
const W_KEY = 87;

var field;

var paddle = {
    x: 0,
    y: 0,
    dx: 5,
    dy: 10,
    width: 20,
    height: 100,
};

function init() {
    field = {
        context: pongCanvas.getContext("2d"),
        x: 0,
        y: 0,
        width: pongCanvas.width,
        height: pongCanvas.height,
    };

    drawPaddle(paddle);
    startGame();
}

function drawPaddle(paddle) {
    field.context.beginPath();
    field.context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    field.context.stroke();
}

function startGame() {
    document.onkeydown = function (e) {
        let keyPressed = e.keyCode;

        if (keyPressed === S_KEY) {
            movePaddleDown(paddle);
        } else if (keyPressed === W_KEY) {
            movePaddleUp(paddle);
        }
    };
}

function movePaddleDown(paddle) {
    if (paddle.y + paddle.height < field.height) {
        clearPreviousPaddle(paddle);

        paddle.y += paddle.dy; //move paddle down by incrementing the y coordinate with dy

        drawPaddle(paddle);
    }
}

function movePaddleUp(paddle) {
    if (paddle.y > field.y) {
        clearPreviousPaddle(paddle);

        paddle.y -= paddle.dy; //move paddle up by decrementing the y coordinate with dy

        drawPaddle(paddle);
    }
}

function clearPreviousPaddle(paddle) {
    field.context.clearRect(
        0,
        0,
        paddle.width + 1, //width of paddle + 1 px for the outline
        field.height
    );
}
