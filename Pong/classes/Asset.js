//define class Asset for a game asset with x and y coordinates, speed (dx and dy) and color
export default class Asset {
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
