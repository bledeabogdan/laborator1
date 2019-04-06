import evaluateDistance from './evaluateDistance';
import randomNeighborHood from './randomNeighborhood';
import shuffle from './shuffle';

const simulatedAnealing = (it, T_max, alpha, T_min, distances, neighborFunction) => {
    let T = T_max;
    let k = 0;
    let array = [];
    for (let i = 1; i <= distances[0].length; i++) {
        array.push(i);
    }
    let c = shuffle(array);
    let best = {
        path: c,
        distance: evaluateDistance(c, distances)
    };
    let cost = evaluateDistance(c, distances);
    console.log("neighborFunction: ", neighborFunction);
    let minDistNumber = 0;
    let prob = 0;
    while (T >= T_min) {
        k = 0;
        do {
            var x = randomNeighborHood(c, neighborFunction);
            var xCost = evaluateDistance(c, distances);
            if (xCost < cost) {
                minDistNumber++;
                c = x;
                if (evaluateDistance(c, distances) < best.distance) {
                    best.path = c;
                    best.distance = evaluateDistance(c, distances);
                }
            } else {
                if (Math.random() < Math.exp((cost - xCost) / T)) {
                    prob++;
                    c = x;
                }
            }
            k++;
        } while (k < it);
        T = T * alpha;
        console.log("T=", T);
    };

    console.log(cost, best.distance, minDistNumber, prob);
}

export default simulatedAnealing;