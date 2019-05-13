import generateRandomSolutionAE from './generateRandomSolutionAE';
import randomIntFromInterval from './randomIntFromInterval';
import determineValueAndWeight from './determineValueAndWeightOfSolution';

const initialisePopulation = (objects, maxWeight, candidates) => {
    let pop = [];
    let cand = 0;
    while (cand < candidates) {
        let solution = generateRandomSolutionAE(objects, maxWeight);
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

const recombine = (parents, objects) => {
    let kids = [];
    let randomPosition = randomIntFromInterval(2, objects.length - 3);
    for (let couple of parents) {
        let firstPartParent1 = couple.parent1.sequence.slice(0, randomPosition);
        let secondPartParent1 = couple.parent1.sequence.slice(randomPosition, couple.parent1.sequence.length)
        let firstPartParent2 = couple.parent2.sequence.slice(0, randomPosition);
        let secondPartParent2 = couple.parent2.sequence.slice(randomPosition, couple.parent1.sequence.length)
        let kid = { sequence: "", value: 0, weight: 0 }, kid2 = { sequence: "", value: 0, weight: 0 };
        kid.sequence = firstPartParent1.concat(secondPartParent2);
        kid.value = determineValueAndWeight(kid.sequence, objects).value;
        kid.weight = determineValueAndWeight(kid.sequence, objects).weight;
        kid2.sequence = firstPartParent2.concat(secondPartParent1);
        kid2.value = determineValueAndWeight(kid2.sequence, objects).value;
        kid2.weight = determineValueAndWeight(kid2.sequence, objects).weight;
        kids.push(kid, kid2);
    }
    return kids;
}

const mutate = (population, objects) => {
    let kids = []
    for (let solution of population) {
        let randomPosition = randomIntFromInterval(0, solution.sequence.length - 1);
        var firstPart = solution.sequence.slice(0, randomPosition);
        if (solution.sequence[randomPosition] === '1') {
            firstPart = firstPart.concat('0');
        } else {
            firstPart = firstPart.concat('1');
        }
        let secondPart = solution.sequence.slice(randomPosition + 1, solution.sequence.length);
        solution.sequence = firstPart.concat(secondPart);
        let valueAndWeightOfSolution = determineValueAndWeight(solution.sequence, objects);
        solution.value = valueAndWeightOfSolution.value;
        solution.weight = valueAndWeightOfSolution.weight;
        kids.push(solution);
    }
    return kids;
}

const selectParentsForNewGeneration = (parents, howMany, maxWeight) => {
    let allParents = [];
    for (let couple of parents) {
        allParents.push(couple.parent1, couple.parent2)
    }
    allParents.sort((p1, p2) => {
        return p2.value - p1.value
    })
    let selectParents = [];
    for (let i = 0; i < allParents.length && howMany !== 0; i++) {
        if (allParents[i].weight <= maxWeight) {
            selectParents.push(allParents[i])
            howMany--;
        }
    }
    return selectParents;

}

const selectKidsForNewGeneration = (kids, howMany, maxWeight) => {
    kids.sort((p1, p2) => {
        return p2.value - p1.value
    })
    let selected = [];
    for (let i = 0; i < kids.length && howMany !== 0; i++) {
        if (kids[i].weight <= maxWeight) {
            selected.push(kids[i])
            howMany--;
        }
    }
    return selected;
}
const selectForNewGeneration = (parents, kids, candidates, maxWeight) => {
    let howMany = Math.ceil((30 / 100) * candidates);
    let selectedParents = selectParentsForNewGeneration(parents, howMany, maxWeight);
    let selectedKids = selectKidsForNewGeneration(kids, candidates - howMany, maxWeight);
    return selectedParents.concat(selectedKids);

}

const selectForNewGenerationUsingRoulette = (parents, kids, candidates) => {
    let allParents = [];
    for (let couple of parents) {
        allParents.push(couple.parent1, couple.parent2)
    }
    let pop = allParents.concat(kids);
    let final = [];
    let F = 0;
    for (let i = 0; i < pop.length; i++) {
        F += pop[i].value;
    }
    for (let i = 0; i < pop.length; i++) {
        pop[i] = { ...pop[i], p: 0, q: 0 };
        pop[i].p = Number((pop[i].value / F).toFixed(2), 2);
        pop[0].q = pop[0].p;
        let p = 0;
        for (let j = 0; j <= i; ++j) {
            p = p + pop[j].p;
        }
        pop[i].q = Number(p.toFixed(2));
    }

    while (candidates > 0) {
        let g = Number(Math.random().toFixed(2));
        for (let i = 0; i < pop.length; i++) {
            if (g >= 0 && g <= pop[0].q) {
                final.push({ sequence: pop[0].sequence, value: pop[0].value, weight: pop[0].weight })
                break;
            }
            if (g >= pop[i - i].q && g <= pop[i].q) {
                final.push({ sequence: pop[i].sequence, value: pop[i].value, weight: pop[i].weight })
                break;
            }
        }
        candidates--;
    }
    if (final.length === 9) {
        final.push({ sequence: pop[1].sequence, value: pop[1].value, weight: pop[1].weight })
    }

    return final;
}

const selectForNewGenerationUsingTurnir = (parents, kids, candidates) => {
    let pop = [];
    for (let couple of parents) {
        pop.push(couple.parent1, couple.parent2)
    }
    let k = 3;
    pop.concat(kids);
    let final = [];
    let rando = [];
    while (candidates > 0) {
        let k = randomIntFromInterval(0,pop.length-4);
        rando = pop.slice(k,k+3);
        final.push({sequence: rando[0].sequence, value: rando[0].value, weight: rando[0].weight});
        candidates--;
    }
    return final;
}

const algoritmEvolutiv = (candidates, generations, objects, maxWeight) => {
    let population = initialisePopulation(objects, maxWeight, candidates);
    while (generations !== 0) {
        let parents = selectParents(population);
        let recombinedKids = recombine(parents, objects);
        let mutationKids = mutate(population, objects);
        mutationKids.concat(mutate(recombinedKids, objects));
        let kids = recombinedKids.concat(mutationKids);
        population = selectForNewGeneration(parents, kids, candidates, maxWeight);
        // population = selectForNewGenerationUsingRoulette(parents, kids, candidates, maxWeight);
        // population = selectForNewGenerationUsingTurnir(parents, kids, candidates);
        generations--;
    }
    // let filterPopulation = [];
    // for(let p of population){
    //     if(p.weight <= maxWeight){
    //         filterPopulation.push(p)
    //     }
    // }
    // filterPopulation.sort((p1,p2) => {
    //     return p2.weight - p1.weight
    // })
    population.sort((p1, p2) => {
        return p2.value - p1.value
    })
    console.log(population);
}

export default algoritmEvolutiv;