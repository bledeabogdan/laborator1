
import shuffle from './shuffle';
import evaluateDistance from './evaluateDistance';
import randomIntFromInterval from './randomIntFromInterval';

const invertCities = (c1I, c2I, array) => {
    let aux;
    if (c2I < c1I) {
        aux = c1I;
        c1I = c2I;
        c2I = aux;
    }
    let _array = [];
    for (let i = 0; i <= c1I; i++) {
        _array.push(array[i]);
    }
    for (let i = c2I; i > c1I; i--) {
        _array.push(array[i])
    }
    for (let i = c2I + 1; i < array.length; i++) {
        _array.push(array[i]);
    }
    return _array;
}

const generateRandomTspSolution = (numberOfCities) => {
    let array = [];
    for (let i = 1; i <= numberOfCities; i++) {
        array.push(i);
    }
    return shuffle(array);
}

const initialisePopulation = (candidates, numberOfCities, distances) => {
    let population = [];

    for (let i = 0; i < candidates; i++) {
        let path = generateRandomTspSolution(numberOfCities);
        let route = { path: path, distance: evaluateDistance(path, distances) }
        population.push(route);
    }
    return population;
}

const inverOver = (candidates, generations, distances, prob) => {
    let numberOfCities = 105;
    let population = initialisePopulation(candidates, numberOfCities, distances)
    while (generations !== 0) {
        for (let route of population) {
            let _route = { path: [], distance: 0 };
            _route.path = route.path;
            _route.distance = route.distance;
            let c = randomIntFromInterval(1, numberOfCities);
            do {
                let _c, index;
                if (Math.random() <= prob) {
                    _c = randomIntFromInterval(1, numberOfCities);
                } else {
                    index = randomIntFromInterval(0, candidates - 1);
                    let indexOfC = population[index].path.indexOf(c);
                    _c = population[index].path[indexOfC + 1]
                }
                if (_c === c) {
                    break;
                }
                _route.path = invertCities(_route.path.indexOf(c), _route.path.indexOf(_c), _route.path);
                _route.distance = evaluateDistance(_route.path, distances);

                c = _c;
            } while (true)
            if (_route.distance < route.distance) {
                console.log('small distance');
                route = _route;
            }
        }
        generations--;
    }
    console.log(population.sort((a, b) => { return a.distance - b.distance })[0]);
}

export default inverOver;