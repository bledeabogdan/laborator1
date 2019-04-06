import React, {
    Component
} from 'react';
import generateRandomSolution from '../../utils/generateRandomSolution';
import classes from './Hill.css';
import axios from 'axios';
import determineIndexesOf0FromSolution from '../../utils/determineNumberOf0FromSolution';
import detremineValueAndWeightOfSolution from '../../utils/determineValueAndWeightOfSolution';
import determineNeighboringSolution from '../../utils/determineNeighboringSolution';
import makeItSolution from '../../utils/makeItSolution';

let objectSolution;
let solutions = [];

class Hill extends Component {
    state = {
        objects: [],
        c: {},
        maxWeight: 0,
        iterations: 0,
        maxSolution: {}
    }

    componentDidMount() {
        axios.get('https://artificial-inteligence-a6422.firebaseio.com/object' + this.props.numberOfObjects + '.json')
            .then(response => {
                this.setState({
                    objects: response.data.objects,
                    maxWeight: response.data.weight
                });
            })
            .catch(err => {
                console.log("Something went wrong!");
            })
    }

    generateNeighboringSolutions = () => {
        let indexArray = determineIndexesOf0FromSolution(objectSolution.solution);

        let neighboringSolution = determineNeighboringSolution(objectSolution, indexArray, this.state.objects, this.state.maxWeight);
        // let neighboringGreedySolution = determineNeighboringGreedySolution(objectSolution, indexArray, this.state.objects, this.state.maxWeight);

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
        while( i !== 0){
            objectSolution = this.generateObjectSolution();
            this.generateNeighboringSolutions(objectSolution);
            i--;
        }
        // this.findBest();
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
    let solution = generateRandomSolution(this.props.numberOfObjects);
    let values = detremineValueAndWeightOfSolution(solution,
        this.state.objects);

    if(values.weight>this.state.maxWeight){
        solution = makeItSolution(solution);
        values = detremineValueAndWeightOfSolution(solution, this.state.objects);

        while(values.weight>this.state.maxWeight){
            solution = makeItSolution(solution);
            values = detremineValueAndWeightOfSolution(solution, this.state.objects);
        }
    }
        
    let objectSolution = {
        solution: solution,
        ...values
    };
    
    return objectSolution;
}

iterationsNumberHandler = (event) => {
    this.setState({iterations: event.target.value});
}

render() {
    return ( 
    <div className = { classes.Hill }>
        <h4> { this.props.numberOfObjects} obiecte </h4> 
        <input type="text" placeholder="Numar iteratii" onChange={event => this.iterationsNumberHandler(event)}/>
        {this.state.iterations === 0 ? null : <button onClick = {
            this.generateSolution
        } > Generează soluție </button> }
        {this.state.c.solution ? <div > {
            this.state.c.solution
        } cu {this.state.c.value} si greutate {this.state.c.weight}.
        </div> : null }
        </div>
    );
}
}

export default Hill;