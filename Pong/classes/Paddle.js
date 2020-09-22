import Asset from "./Asset.js";

//define child class Paddle of class Asset for a pong paddle with widht, height and score
export default class Paddle extends Asset {
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
