const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
let array = [];
for (let i = 1; i < 16; i++) {
    array.push(i);
}
shuffle(array);
console.log(array);
let i = randomIntFromInterval(0, array.length - 1);
let k = randomIntFromInterval(0, array.length - 1);

let aux = array[i];
array[i] = array[k];
array[k] = aux;
console.log(array);