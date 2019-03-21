import React, { Component } from 'react';
import Problem from '../Problem/Problem';
import RandomProblem from '../Problem/RandomProblem';
import classes from './Laborator1.css';
import generateRandomSolution from '../../utils/generateRandomSolution';

class Laborator1 extends Component {
    state = {
        objects: [],
        solution: "",
        numberOfObjects: 5,
        weight: 524,
        table: null
    }

    generateSolution = () => {
        let string = generateRandomSolution(5);
        console.log(string);
        this.validateSolution(string);
    }

    

    weightChangeHandler = (event) => {
        let value = event.target.value;
        this.setState({weight: value});
    }

    numberOfObjectHandler = (event) => {
        var number = event.target.value;
        this.setState({numberOfObjects: number});
    }

    generateTable = (value) =>  {
        let tableHeader = 
        <div className={classes.TableRow}>
            <div>Nr. crt.</div>
            <div>Solutie</div>
            <div>Valoare</div>
            <div>Greutate</div>
            <div>Este solutie?</div>
        </div>;
        let tableBody = value.map((object, key) => {
                return (
                    <div className={object.isSolution==="Yes"?classes.TableRowYes : classes.TableRow} key={key}>
                        <div>{key+1}</div>
                        <div>{object.solution.length > 20 ? object.solution.slice(1,20)+'...' : object.solution}</div>
                        <div>{object.totalValue}</div>
                        <div>{object.totalWeight}</div>
                        <div>{object.isSolution}</div>
                    </div>
                );
            });
        let table = <div className={classes.Table}> {tableHeader} {tableBody} </div>;
        this.setState({table: table});
    }


    render(){
        return (
            <div>
                <h1>Random Search</h1>
                <div className={classes.Cards}>
                    <div className={classes.RandomProblemContainer}>
                    <RandomProblem dontShowValues generateTable={this.generateTable}/>
                    </div>
                    <div className={classes.CardsContainer}>
                        <Problem 
                            dontShowValues
                            numberOfObjects="5" 
                            defaultNumberOfSolutions="1" 
                            defaultMaxWeight="200"
                            generateTable={this.generateTable}/>
                        <Problem 
                            dontShowValues
                            numberOfObjects="20" 
                            defaultNumberOfSolutions="1" 
                            defaultMaxWeight="524"
                            generateTable={this.generateTable}/>
                        <Problem 
                            dontShowValues
                            numberOfObjects="200" 
                            defaultNumberOfSolutions="1" 
                            defaultMaxWeight="112648"
                            generateTable={this.generateTable}/>
                    </div>
                </div>
                {this.state.table}
            </div>
        );
    }
}

export default Laborator1;