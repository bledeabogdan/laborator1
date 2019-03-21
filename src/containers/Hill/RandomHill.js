import React, {
    Component
} from 'react';
import generateRandomSolution from '../../utils/generateRandomSolution';
import classes from './Hill.css';
import determineIndexesOf0FromSolution from '../../utils/determineNumberOf0FromSolution';
import detremineValueAndWeightOfSolution from '../../utils/determineValueAndWeightOfSolution';
import determineNeighboringSolution from '../../utils/determineNeighboringSolution';

let objectSolution;
let solutions = [];

class Hill extends Component {
    state = {
        objects: [],
        c: {},
        maxWeight: 0,
        addObject: false,
        currentValue: 0,
        currentWeight: 0,
        currentMaxWeight: 0,
        iterations: 0
    }

    generateNeighboringSolutions = () => {
        let indexArray = determineIndexesOf0FromSolution(objectSolution.solution);

        let neighboringSolution = determineNeighboringSolution(objectSolution, indexArray, this.state.objects, this.state.maxWeight);

        if (neighboringSolution === false) {
            objectSolution = this.generateObjectSolution();
        } else {
            if (neighboringSolution.value > objectSolution.value) {
                objectSolution = neighboringSolution;
                solutions.push(objectSolution);
            }
        }
        
    }

    generateSolution = () => {
        let i = this.state.iterations;
        while( i !==0 ){
            objectSolution = this.generateObjectSolution(); 
            this.generateNeighboringSolutions(objectSolution);
            i--;
        }
        this.findBest();
    }

    findBest = () => {
        let maxSolution = objectSolution;
        for(let sol of solutions){
            if(sol.value > maxSolution.value){
                maxSolution = sol;
            }
        }
        console.log("Solutia maxima: ", maxSolution);
    }

generateObjectSolution = () => {
    let solution = generateRandomSolution(this.state.objects.length);
    let values = detremineValueAndWeightOfSolution(solution,
        this.state.objects);
    let objectSolution = {
        solution: solution,
        ...values
    };
    return objectSolution;
}

addObjectHandler = () =>{
    let addObject = this.state.addObject;
    this.setState({addObject: !addObject});
}

valueChangeHandler = (event) =>{
    this.setState({currentValue: event.target.value});
}

weightChangeHandler = (event) => {
    this.setState({currentWeight: event.target.value});
}

addObjectEfHandler = () =>{
    let objects = this.state.objects;
    let addObject = this.state.addObject;
    objects.push({value: Number(this.state.currentValue), weight: Number(this.state.currentWeight)});
    this.setState({
        objects: objects,
        addObject: !addObject,
        currentValue: 0,
        currentWeight: 0
    })
}

maxWeightChangeHandler = (event) => {
    this.setState({maxWeight: event.target.value});
}

iterationsNumberHandler = (event) => {
    this.setState({iterations: event.target.value});
}


render() {
    return ( 
    <div className = {
            classes.Hill
        } >
        <h4> { this.state.objects.length} obiecte </h4> 
        <button onClick={this.addObjectHandler}>{ !this.state.addObject ? "Add Object" : "Cancel"}</button>
        {
            this.state.addObject ? 
                <div>
                    <input type="text" placeholder="value" onChange={(event) => this.valueChangeHandler(event)}/>
                    <input type="text" placeholder="weight" onChange={(event) => this.weightChangeHandler(event)}/>
                    <button onClick={this.addObjectEfHandler}>+</button>
                </div>
                :
                null
        }
        <input type="text" placeholder="max weight" onChange={(event) => this.maxWeightChangeHandler(event)}/>
        {this.state.maxWeight ? <input type="text" placeholder="Numar iteratii" onChange={event => this.iterationsNumberHandler(event)}/> : null }
        
        {this.state.iterations ? <button onClick = {
            this.generateSolution
        } > Generează soluție </button> 
        : null }

        </div>
    );
}
}

export default Hill;