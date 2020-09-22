//define class for game constants
export default class GameSettings {
    //define CANVAS attributes as static members
    static CANVAS = pongCanvas.getContext("2d");
    static CANVAS_WIDTH = pongCanvas.width;
    static CANVAS_HEIGHT = pongCanvas.height;
    static CANVAS_X = 0;
    static CANVAS_Y = 0;

    //define game assets attributes as static members
    static PADDLE_WIDTH = 20;
    static PADDLE_HEIGHT = 100;
    static BALL_RADIUS = 12;

    //define the interval of time in milliseconds in which the game is executed
    static EXEC_INTERVAL = 10;
    static END_GAME_POINTS = 5;
}
