import generateRandomFloatFromInterval from "./generateRandomFloatFromInterval";
import akley from './akley';
import randomIntFromInterval from "./randomIntFromInterval";



const initialisePopulation = (candidates, max, min) => {
    let pop = [];
    let cand = 0;
    while (cand < candidates) {
        let solution = { vector: [], fitness: 0 };
        for (let i = 0; i < 2; i++) {
            solution.vector.push(generateRandomFloatFromInterval(min, max));
        }
        solution.fitness = akley(solution.vector);
        pop.push(solution);
        cand++;
    }
    return pop;
}

const selectParents = (population) => {
    let parents = [];
    let dec = 1;
    let k = population.length;
    for (let i = 0; i < k && i < Math.floor(k / 2); i++) {
        let couple = {
            parent1: population[i],
            parent2: population[k - dec]
        }
        parents.push(couple);
        dec++;
    }
    return parents;
}

const directCross = (parents) => {
    let kids = [];
    for (let couple of parents) {
        let kid = { vector: [], fitness: 0 };
        for (let i = 0; i < couple.parent1.vector.length; i++) {
            if (Math.random() < 0.5) {
                kid.vector[i] = couple.parent1.vector[i];
            } else {
                kid.vector[i] = couple.parent2.vector[i];
            }
        }
        kid.fitness = akley(kid.vector);
        kids.push(kid);
    }
    return kids;
}

const completeAverageCross = (parents) => {
    let kids = [];
    for (let couple of parents) {
        let kid = { vector: [], fitness: 0 };
        for (let i = 0; i < couple.parent1.vector.length; i++) {
            kid.vector[i] = (couple.parent1.vector[i] + couple.parent2.vector[i]) / 2;
        }
        kid.fitness = akley(kid.vector);
        kids.push(kid);
    }
    return kids;
};

const convexCross = (parents) => {
    let kids = [];
    for (let couple of parents) {
        let kid = { vector: [], fitness: 0 };
        for (let i = 0; i < couple.parent1.vector.length; i++) {
            let alpha = Math.random();
            kid.vector[i] = alpha * couple.parent1.vector[i] + (1 - alpha) * couple.parent2.vector[i];
        }
        kid.fitness = akley(kid.vector);
        kids.push(kid);
    }
    return kids;
}

const allParents = (parents) => {
    let allParents = [];
    for (let couple of parents) {
        allParents.push(couple.parent1, couple.parent2)
    }
    return allParents;
}

const uniformMutation = (people, min, max) => {
    let kids = [];
    for (let person of people) {
        let newPerson = { vector: [], fitness: 0 };
        for (let i = 0; i < person.vector.length; i++) {
            newPerson.vector[i] = person.vector[i];
        }
        let position = randomIntFromInterval(0, person.vector.length - 1);
        newPerson.vector[position] = generateRandomFloatFromInterval(min, max);
        newPerson.fitness = akley(newPerson.vector);
        kids.push(newPerson)
    }
    return kids;
}

const selectParentsForNewGeneration = (parents) => {
    parents.sort((a, b) => {
        return a.fitness - b.fitness
    })
    return [parents[0], parents[1]];
}

const selectKidsForNewGeneration = (kids, howMany) => {
    kids.sort((a, b) => {
        return a.fitness - b.fitness;
    })
    let selectedKids = [];
    for (let i = 0; i < howMany; i++) {
        selectedKids.push(kids[i]);
    }
    return selectedKids;
}

const selectForNewGeneration = (parents, kids, candidates) => {
    let selectedParents = selectParentsForNewGeneration(allParents(parents));
    let selectedKids = selectKidsForNewGeneration(kids, candidates - 2);
    return selectedParents.concat(selectedKids);
}

const determineBestFitnessOfGeneration = (parents, kids) => {
    parents.push(...kids);
    parents.sort((a, b) => {
        return a.fitness - b.fitness;
    })
    return parents[0].fitness;
}


const algoritmEvolutivFunctii = (candidates, generations, min, max, crossType) => {
    let statistics = {
        generations: [],
        bestFitness: []
    };
    let mainCross;
    switch(crossType){
        case 'direct':
            mainCross = directCross;
            break;
        case 'convex':
            mainCross = convexCross;
            break;
        case 'complete':
            mainCross = completeAverageCross;
            break;
        default:
            mainCross = directCross;
            break;
    }
    let population = initialisePopulation(candidates, max, min);
    let gene = 1;
    while (generations !== 0) {
        let parents = selectParents(population);
        // let kids = mainCross(parents);
        let directCrossKids = directCross(parents);
        let completeAverageCrossKids = completeAverageCross(parents);
        let convexCrossKids = convexCross(parents);
        let kids = directCrossKids.concat(completeAverageCrossKids).concat(convexCrossKids);
        let mutationKidsFromParents = uniformMutation(allParents(parents), min, max);
        let mutationKidsFromCrossKids = uniformMutation(kids, min, max);
        kids.push(...mutationKidsFromCrossKids);
        kids.push(...mutationKidsFromParents);
        statistics.generations.push(gene);
        statistics.bestFitness.push(determineBestFitnessOfGeneration(allParents(parents), kids))
        gene++;
        population = selectForNewGeneration(parents, kids, candidates)
        generations--;
    }
    return statistics;
}

export default algoritmEvolutivFunctii;