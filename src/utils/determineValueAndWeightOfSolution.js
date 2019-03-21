
const detremineValueAndWeightOfSolution = (solution, objects) => {
    let totalWeight = 0;
    let totalValue = 0;
    for (let i = 0; i < objects.length; i++) {
        if (solution[i] === '1') {
            totalWeight += objects[i].weight;
            totalValue += objects[i].value;
        }
    }
    return {value: totalValue, weight: totalWeight};
}

export default detremineValueAndWeightOfSolution;