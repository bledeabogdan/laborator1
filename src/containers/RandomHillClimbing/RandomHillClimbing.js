import React, { Component } from 'react';
import Hill from '../Hill/Hill';
import RandomHill from '../Hill/RandomHill';

class RandomHillClimbing extends Component{

    render(){
        return (
            <div>
                <h1>Random Hill Climbing</h1>
                <RandomHill />
                <Hill 
                    numberOfObjects="5" />
                <Hill
                    numberOfObjects="20" />
                <Hill
                    numberOfObjects="200" />
            </div>
        );
    }
}

export default RandomHillClimbing;