//define class for game constants
export default class GameSettings {
    //define CANVAS attributes as static members
    static CANVAS = pongCanvas.getContext("2d");
    static CANVAS_FONT = "20px Arial";
    static CANVAS_COLOR = "#000000";
    static CANVAS_WIDTH = pongCanvas.width;
    static CANVAS_HEIGHT = pongCanvas.height;
    static CANVAS_X = 0;
    static CANVAS_Y = 0;

    //define paddle attributes as static members
    static PADDLE_WIDTH = 20;
    static PADDLE_HEIGHT = 100;
    static PADDLE_SPEED = 5;

    //define ball attributes as static members
    static BALL_RADIUS = 12;
    static BALL_COLOR = "#f2a62e";
    static BALL_SPEED = 5;
    static BALL_START_ANGLE = 0;
    static BALL_END_ANGLE = Math.PI * 2;

    static PLAYER_1 = "Player 1";
    static PLAYER_2 = "Player 2;";

    static WELCOME_MESSAGE = "Press any key to start new game.";
    static WINNER_MESSAGE = " is the winner! Bravo!";

    //define the interval of time in milliseconds in which the game is executed
    static EXEC_INTERVAL = 10;
    static END_GAME_POINTS = 5;
}
