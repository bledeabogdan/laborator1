import randomIntFromInterval from './randomIntFromInterval';

const twoSwap = (array) => {
    let i = randomIntFromInterval(0, array.length-1);
    let k = randomIntFromInterval(0, array.length-1);

    let aux = array[i];
    array[i] = array[k];
    array[k] = aux;
    return array;
}

export default twoSwap;