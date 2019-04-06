import generateRandomSolutionAE from './generateRandomSolutionAE';
import randomIntFromInterval from './randomIntFromInterval';
import determineValueAndWeight from './determineValueAndWeightOfSolution';

const initialisePopulation = (objects, maxWeight, candidates) =>{
    let population = [];
    let cand = 0;
    while( cand < candidates){
        let solution = generateRandomSolutionAE(objects,maxWeight);
        population.push(solution);
        cand++;
    }
    return population;
}

const selectParents = (population) =>{
    let parents = [];
    let dec=1;
    let k=population.length;
    for(let i=0;i<k && i<Math.floor(k/2);i++){
        let couple = {
            parent1: population[i],
            parent2: population[k-dec]
        }
        parents.push(couple);
        dec++;
    }
    return parents;
}

const recombine = (parents, objects) =>{
    let kids = [];
    let randomPosition = randomIntFromInterval(2,objects.length-3);
    for(let couple of parents){
        let firstPartParent1 = couple.parent1.sequence.slice(0,randomPosition);
        let secondPartParent1 = couple.parent1.sequence.slice(randomPosition,couple.parent1.sequence.length)
        let firstPartParent2 = couple.parent2.sequence.slice(0,randomPosition);
        let secondPartParent2 = couple.parent2.sequence.slice(randomPosition,couple.parent1.sequence.length)
        let kid = {sequence: "", value: 0, weight: 0}, kid2 = {sequence: "", value: 0, weight: 0};
        kid.sequence = firstPartParent1.concat(secondPartParent2);
        kid.value = determineValueAndWeight(kid.sequence,objects).value;
        kid.weight = determineValueAndWeight(kid.sequence,objects).weight;
        kid2.sequence = firstPartParent2.concat(secondPartParent1);
        kid2.value = determineValueAndWeight(kid2.sequence,objects).value;
        kid2.weight = determineValueAndWeight(kid2.sequence,objects).weight;
        kids.push(kid,kid2);
    }
    return kids;
}

const mutate = (population, objects) => {
    let kids = []
    for(let solution of population){
        let randomPosition = randomIntFromInterval(0,solution.sequence.length-1);
        var firstPart = solution.sequence.slice(0,randomPosition);
        if(solution.sequence[randomPosition]==='1'){
            firstPart = firstPart.concat('0');
        }else{
            firstPart = firstPart.concat('1');
        }
        let secondPart = solution.sequence.slice(randomPosition+1,solution.sequence.length);
        solution.sequence = firstPart.concat(secondPart);
        let valueAndWeightOfSolution = determineValueAndWeight(solution.sequence,objects);
        solution.value = valueAndWeightOfSolution.value;
        solution.weight = valueAndWeightOfSolution.weight;
        kids.push(solution);
    }
    return kids;
}

const selectParentsForNewGeneration = (parents, howMany, maxWeight) => {
    let allParents = [];
    for(let couple of parents){
        allParents.push(couple.parent1,couple.parent2)
    }
    allParents.sort((p1,p2) => {
        return p2.value - p1.value
    })
    let selectParents =[];
    for(let i=0;i<allParents.length && howMany !==0; i++){
        if(allParents[i].weight <= maxWeight){
            selectParents.push(allParents[i])
            howMany--;
        }
    }
    return selectParents;

}

const selectKidsForNewGeneration = (kids,howMany, maxWeight) => {
    kids.sort((p1,p2) => {
        return p2.value - p1.value
    })
    let selected =[];
    for(let i=0;i<kids.length && howMany !==0; i++){
        if(kids[i].weight <= maxWeight){
            selected.push(kids[i])
            howMany--;
        }
    }
    return selected;
}
const selectForNewGeneration = (parents, kids, candidates,maxWeight) => {
    let howMany = Math.ceil((30/100)*candidates);
    let selectedParents = selectParentsForNewGeneration(parents, howMany,maxWeight);
    let selectedKids = selectKidsForNewGeneration(kids,candidates-howMany, maxWeight);
    return selectedParents.concat(selectedKids);
}
const algoritmEvolutiv = (candidates, generations, objects, maxWeight) => {
    let population = initialisePopulation(objects, maxWeight, candidates);
    while(generations !== 0){
        let parents = selectParents(population);
        let recombinedKids = recombine(parents, objects);
        let mutationKids = mutate(population, objects);
        let kids = recombinedKids.concat(mutationKids);
        population = selectForNewGeneration(parents,kids, candidates, maxWeight);
        generations--;
    }
    population.sort((p1,p2) => {
        return p2.value - p1.value
    })
    console.log(population);
}

export default algoritmEvolutiv;