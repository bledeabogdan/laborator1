import React, { Component } from 'react';
import classes from './Problem.css';
import generateRandomSolution from '../../utils/generateRandomSolution';
import axios from 'axios';

let solutions = [];

class Problem extends Component {
    state = {
        objects: [],
        solutions: [],
        maxWeight: 0,
        numberOfSolutionsNotSet: true,
        weightIsNotSet: true,
        numberOfSolutions: 1,
        max: {
            solution: 0, 
            totalValue: 0, 
            totalWeight: 0
        },
        average: {}
    }

    componentDidMount(){
        axios.get('https://artificial-inteligence-a6422.firebaseio.com/object'+this.props.numberOfObjects+'.json')
            .then(response => {
                this.setState({objects:response.data.objects});
            })
            .catch(err => {
                console.log("Something went wrong!");
            })
    }

    generateSolution = () =>{
        this.setState({solutions: [], average: {}, max: {}});
        solutions = [];
        for(let i=0;i<this.state.numberOfSolutions;i++){
            let string = generateRandomSolution(this.props.numberOfObjects);
            this.validateSolution(string);
        }
        let average = this.averageSolutions();
        this.setState({average: average})
    }

    weightChangeHandler = (event) => {
        let value = event.target.value;
        if(!isNaN(value) && value > 0){
            this.setState({maxWeight: value, weightIsNotSet: false})
        } else{
            event.target.value = "";
            this.setState({maxWeight: value, weightIsNotSet: true})
            alert("Not a natural number!");
        }
    }

    numberOfSolutionsHandler = (event) => {
        let value = event.target.value;
        if(!isNaN(value) && value > 0){
            this.setState({numberOfSolutions: value, numberOfSolutionsNotSet: false})
        } else{
            event.target.value = "";
            this.setState({numberOfSolutions: value, numberOfSolutionsNotSet: true})
            alert("Not a natural number!");
        }
    }

    validateSolution = (string) => {
        let objects = this.state.objects;
        let totalWeight = 0;
        let totalValue = 0;
        for(let i = 0; i < objects.length; i++){
            if(string[i]==='1'){
                totalWeight += objects[i].weight;
                totalValue += objects[i].value;
            }
        }

        let max = this.state.max;
        
        if(totalWeight <= this.state.maxWeight){
            console.log("Solutia cu greutatea de ",totalWeight, " in valoare de ", totalValue);
            if (totalValue > max.totalValue){
                console.log(totalValue, '>', max.totalValue);
                max.totalValue = totalValue;
                max.totalWeight = totalWeight;
                max.solution = string;
                this.setState({max: max});
            }
            solutions.push({solution: string, totalValue:totalValue, totalWeight: totalWeight, isSolution: "Yes"})
        } else{
            console.log("Nu e solutie!");
            solutions.push({solution: string, totalValue:totalValue, totalWeight: totalWeight, isSolution: "No"})
        }
        this.setState({solutions: solutions})
        
        
    }

    averageSolutions = () => {
        let sum = 0;
        let weightSum = 0;
        let average = {
            value: 0,
            weight: 0
        }
        let number=0;
        for(let sol of solutions){
            if(sol.isSolution==="Yes"){
                sum+=sol.totalValue;
                weightSum+=sol.totalWeight;
                number++;
            }
            
        }
        average.value = sum === 0 ? 0 : sum/number;
        average.weight = weightSum === 0 ? 0 : weightSum/number;
        return average;
    }

    
    render() {
        return(
            <div className={classes.Problem}>
                <div className={classes.ProblemHeader}>Rucsac {this.props.numberOfObjects}</div>
                <div className={classes.ProblemBody}>
                    <span>b.value: {this.state.max.totalValue}</span>
                    <span>b.weight: {this.state.max.totalWeight}</span>
                    <span>a.value: {this.state.average.value ? Number.parseFloat(this.state.average.value).toFixed(2) : null}</span>
                    <span>a.weight: {this.state.average.weight ? Number.parseFloat(this.state.average.weight).toFixed(2) : null}</span>
                </div>
                <div className={classes.ProblemFooter}>
                    <input 
                        type="text" 
                        placeholder="Numar de solutii"
                        onChange={event => {this.numberOfSolutionsHandler(event)}} />
                    <input style={{borderRadius: '0px'}} type="text" placeholder="Greutate maxima" onChange={event => {this.weightChangeHandler(event)}} />
                    <button style={{borderRadius: '0px'}} onClick={this.generateSolution} disabled={(this.state.weightIsNotSet && this.state.numberOfSolutions)}>Genereaza Solutie</button>
                    <button style={{background: '#76448A'}} onClick={() => {this.props.generateTable(this.state.solutions)}}>Genereaza Tabel</button>
                </div>
            </div>
        );
    }
}

export default Problem;