//define paddle control keys key codes as constants
const W_KEY = 87;
const S_KEY = 83;
const ARROW_UP_KEY = 38;
const ARROW_DOWN_KEY = 40;

//define boolean variables for the state of the keys to check whether it is pressed or released
export let wPressed = false;
export let sPressed = false;

export let arrowUpPressed = false;
export let arrowDownPressed = false;

export let startGameKeyPressed = false;

export function resetMovementKeys() {
    wPressed = false;
    sPressed = false;
    arrowUpPressed = false;
    arrowDownPressed = false;
}

export function resetStartGameKeyPressed() {
    startGameKeyPressed = false;
}

//when a key is pressed, execute the setKeyPressed function to know that it was pressed
document.onkeydown = function (e) {
    startGameKeyPressed = true;
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
