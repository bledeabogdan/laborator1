import React, { Component } from 'react';
import classes from './RandomProblem.css';
import generateRandomSolution from '../../utils/generateRandomSolution';

let solutions = [];

class RandomProblem extends Component {
    state = {
        objects: [],
        solutions: [],
        maxWeight: 0,
        numberOfSolutions: 1,
        numberOfObjects: 0,
        valueIsSet: false,
        weightIsSet: false,
        currentValue: 0,
        curerntWeight: 0,
        renderInputs: false,
        numberOfSolutionsNotSet: true,
        maxWeightNotSet: true,
        max: {},
        average: {}
    }
    
    increaseNumberOfObjects = () => {
        let number = this.state.numberOfObjects;
        number++;
        this.setState({numberOfObjects: number, renderInputs: true});
    }

    valueChangeHandler = (event) => {
        let number = event.target.value;
        if(!isNaN(number)){
            this.setState({valueIsSet: true, currentValue: number})
        }else{
            alert("Not a number!");
            event.target.value = "";
            this.setState({valueIsSet: false, currentValue: 0})
        }
    }

    weightChangeHandler = (event) => {
        let number = event.target.value;
        if(!isNaN(number) && number>0 ){
            this.setState({weightIsSet: true, currentWeight: number})
        }else{
            alert("Not a natural number!");
            event.target.value = "";
            this.setState({valueIsSet: false, currentWeight: 0})
        }
    }

    addObject = () => {
        let objects = this.state.objects;
        if(this.state.currentWeight !== 0 && this.state.currentValue !==0){
            objects.push({value: this.state.currentValue, weight: this.state.currentWeight})
        }
        this.setState({
            objects: objects,
            currentValue: 0,
            currentWeight: 0,
            valueIsSet: false,
            weightIsSet: false,
            renderInputs: false,
            disableAddingInputs: false
        })
    }

    cancelAddingObject = () => {
        let number = this.state.numberOfObjects;
        if(number > 0){
            number--;
        }
        this.setState({numberOfObjects: number, renderInputs: false})
    }

    numberOfSolutionsHandler = (event) =>{
        let number = event.target.value;
        if(!isNaN(number) && number>0 ){
            this.setState({numberOfSolutionsNotSet: false, numberOfSolutions: number})
        }else{
            alert("Not a natural number!");
            event.target.value = "";
            this.setState({numberOfSolutionsNotSet: true})
        }
    }

    maxWeightChangeHandler = (event) =>{
        let number = event.target.value;
        if(!isNaN(number) && number>0 ){
            this.setState({maxWeightNotSet: false, maxWeight: number})
        }else{
            alert("Not a natural number!");
            event.target.value = "";
            this.setState({maxWeightNotSet: true})
        }
    }

    generateSolution = () => {
        this.setState({solutions: [], average: {}, max: {}});
        solutions = [];
        for(let i=0;i<this.state.numberOfSolutions;i++){
            let string = generateRandomSolution(this.state.numberOfObjects);
            this.validateSolution(string);
        }
        let average = this.averageSolutions();
        this.setState({average: average})
    }

    validateSolution = (string) => {
        let objects = this.state.objects;
        let totalWeight = 0;
        let totalValue = 0;
        for(let i = 0; i < objects.length; i++){
            if(string[i]==='1'){
                totalWeight += Number(objects[i].weight);
                totalValue += Number(objects[i].value);
            }
        }

        let max = {solution: 0, totalValue: 0, totalWeight: 0};

        if(totalWeight < this.state.maxWeight){
            console.log("Solutia cu greutatea de ",totalWeight, " in valoare de ", totalValue);
            if (totalValue > max.totalValue){
                max.totalValue = totalValue;
                max.totalWeight = totalWeight;
                max.solution = string;
            }
            this.setState({max: max});
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

    render(){
        let objects = <div className={classes.AddNewObject}>
        <div>Value:<input type="text" onChange={event => this.valueChangeHandler(event)}/></div>
        <div>Weight:<input type="text" onChange={event => this.weightChangeHandler(event)}/></div></div>;
        let buttonForAddingInputs = <button onClick={this.increaseNumberOfObjects}>+</button>;
        let buttonForAddingObjects = <button style={{background: '#3498DB'}} onClick={this.addObject}>Add object</button>
        let buttonForCancel = <button style={{background: '#E74C3C'}} onClick={this.cancelAddingObject}>Cancel</button>
        return (
            <div className={classes.Problem}>
                <div className={classes.ProblemHeader}>Rucsac {this.state.numberOfObjects}</div>
                <div className={classes.ProblemBody}>
                    <span>b.value: {this.state.max.totalValue}</span>
                    <span>b.weight: {this.state.max.totalWeight}</span>
                    <span>a.value: {this.state.average.value ? Number.parseFloat(this.state.average.value).toFixed(2) : null}</span>
                    <span>a.weight: {this.state.average.weight ? Number.parseFloat(this.state.average.weight).toFixed(2) : null}</span>
                </div>
                <div className={classes.ProblemFooter}>
                    {
                        (this.state.renderInputs) ? buttonForCancel : buttonForAddingInputs
                    }
                    {
                        (this.state.valueIsSet && this.state.weightIsSet) ? buttonForAddingObjects : null
                    }
                    <div>{this.state.renderInputs ? objects : null}</div>
                    <hr />
                    <input type="text" style={{borderRadius: '10px 10px 0 0'}} placeholder="Numar de solutii" onChange={event => this.numberOfSolutionsHandler(event)} />
                    <input style={{borderRadius: '0px'}} type="text" placeholder="Greutate maxima" onChange={event => {this.maxWeightChangeHandler(event)}} />
                    <button 
                        style={{borderRadius: '0px'}} 
                        onClick={this.generateSolution} 
                        disabled={(this.state.maxWeightNotSet || this.state.numberOfSolutionsNotSet || this.state.numberOfObjects===0)}>Genereaza Solutie</button>
                        <button 
                            style={{background: '#76448A',borderRadius: '0 0 10px 10px'}} 
                            onClick={() => {this.props.generateTable(this.state.solutions)}}>Genereaza Tabel</button>
                </div>
            </div>
        );
    }
}

export default RandomProblem;