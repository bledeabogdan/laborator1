function squareSum(vector) {
    let sum = 0;
    for (let elem of vector) {
        sum += elem * elem;
    }
    return sum;
}

function cosSum(vector) {
    let sum = 0;
    for (let elem of vector) {
        sum += Math.cos(Math.PI * elem);
    }
    return sum;
}

function akley(vector) {
    // let akleyValue = -20 * Math.exp(-0.2 * Math.sqrt((1 / 2) * squareSum(vector))) - Math.exp((1 / 2) * cosSum(vector)) + 20 + Math.exp(1);
    let akleyValue = -20 * Math.exp(-0.2 * Math.sqrt((1 / 10) * squareSum(vector))) - Math.exp((1 / 10) * cosSum(vector)) + 20 + Math.exp(1);
    return akleyValue.toFixed(2);
}

export default akley;