//function to generate a random number between "min" and "max"
export function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
