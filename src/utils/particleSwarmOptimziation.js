import akley from "./akley";

const initiliseParticles = (min, max, particles) => {
    let parts = [];
    let valueForRate = (max - min) / 6;
    while (particles !== 0) {
        let particle = {
            x: [], v: [], f: 0, pBest: {
                x: [], v: [], f: 0
            }
        };
        for (let i = 0; i < 10; i++) {
            let alpha = Math.random();
            particle.x.push(alpha * min + (1 - alpha) * max);
            particle.v.push(alpha * (-valueForRate) + (1 - alpha) * valueForRate);
        }
        particle.f = akley(particle.x);
        particle.pBest.x = particle.x;
        particle.pBest.v = particle.v;
        particle.pBest.f = particle.f;
        parts.push(particle);
        particles--;
    }
    return parts;
}

const globalBest = (population) => {
    let gBest = {
        x: [], v: [], f: 25, pBest: {
            x: [], v: [], f: 0
        }
    };
    for (let particle of population) {
        if (particle.f < gBest.f) {
            gBest = particle;
        }
    }
    return gBest;
}


const particleSwarmOptimziation = (object) => {
    let maxIter = object.iterations;
    let population = initiliseParticles(object.min, object.max, object.particles);
    let gBest = globalBest(population);
    while (maxIter !== 0) {
        for(let i=0;i<population.length;i++){
            let rates = [];
            let xes = [];
            for(let j=0;j<population[0].x.length;j++){
                let v = 0;
                let x = 0;
                v = object.w * population[i].v[j] + object.c1 * Math.random() * (population[i].pBest.x[j] - population[i].x[j]) + object.c2 * Math.random() * (gBest.x[j]-population[i].x[j]);
                x = population[i].x[j] + population[i].v[j];
                rates.push(v);
                xes.push(x);
            }
            population[i].x = xes;
            population[i].v = rates;
            population[i].f = akley(population[i].x)
            if (population[i].f < population[i].pBest.f){
                population[i].pBest.x=population[i].x;
                population[i].pBest.v=population[i].v;
                population[i].pBest.f=population[i].f;
            }
        }
        maxIter--;
    }
    console.log(gBest);
}

export default particleSwarmOptimziation;