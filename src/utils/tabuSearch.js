import shuffle from "./shuffle";
import evaluateDistance from './evaluateDistance';
import twoSwapBest from "./twoSwapBest";
let M;
const initSolution = (distances) => {
    let array = [];
    for (let i = 1; i <= distances[0].length; i++) {
        array.push(i);
    }
    let c = shuffle(array);
    return {
        path: c,
        distance: evaluateDistance(c, distances)
    };
}

const initialiseMemory = (c) => {
    let M = new Array(c.length);
    for (let i = 0; i < c.length; i++) {
        M[i] = new Array(c.length).fill(0);
    }
    return M;
}

const updateMemory = (index, jindex, kTabu) => {
    for (let i = 0; i < M[0].length; i++) {
        for (let j = 0; j < M[0].length; j++) {
            if (j > i) {
                if (M[i][j] !== 0) {
                    M[i][j] = M[i][j] - 1;
                }
            }
        }
    }
    M[index][jindex] = kTabu;
}

const getBestNeighbourNonTabu = (c, distances, kTabu) => {
    let x = twoSwapBest(c, distances, M);
    if (x.i > x.j) {
        let aux = x.i;
        x.i = x.j;
        x.j = aux;
    }
    updateMemory(x.i, x.j, kTabu);
    return {
        path: x.path,
        distance: x.distance
    };
}


const tabuSearch = (iterations, kTabu, distances) => {
    let c = initSolution(distances);
    // let c= {
    //     path: [],
    //     distance: 0
    // }
    // c.path = [34, 44, 15, 25, 61, 100, 47, 58, 7, 102, 30, 39, 64, 99, 13, 8, 2, 35, 59, 22, 83, 29, 48, 28, 17, 67, 74, 63, 79, 11, 3, 91, 85, 97, 53, 93, 45, 86, 60, 80, 68, 10, 51, 43, 88, 71, 56, 81, 36, 33, 65, 96, 42, 94, 70, 69, 77, 26, 19, 37, 72, 92, 6, 21, 89, 95, 90, 41, 31, 101, 75, 24, 104, 66, 20, 16, 52, 1, 4, 46, 57, 55, 73, 14, 32, 12, 23, 18, 38, 78, 5, 49, 54, 40, 82, 27, 62, 87, 76, 105, 98, 9, 50, 103, 84];
    c.distance = evaluateDistance(c.path,distances);
    console.log(c);
    let best = c;
    M = initialiseMemory(c.path);
    while (iterations !== 0) {
        let x = getBestNeighbourNonTabu(c.path, distances, kTabu);
        c = x;
        best.path = x.path;
        best.distance = x.distance;
        iterations--;
    }
    console.log(best);
}

export default tabuSearch;