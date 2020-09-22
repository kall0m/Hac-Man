//function to generate a random number between "min" and "max"
export function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function to randomly get -1 or +1
export function getRandomSign() {
    return Math.random() < 0.5 ? -1 : 1;
}
