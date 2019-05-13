import React, { Component } from 'react';
import particleSwarmOptimization from '../utils/particleSwarmOptimziation';
class ParticleSwarmOptimization extends Component {
    state = {
        min: -32.768,
        max: 32.768,
        particles: 0,
        w: 0,
        c1: 0,
        c2: 0,
        iterations: 0
    }

    inputChangeHandler = event => {
        let state = this.state
        state[event.target.name] = event.target.value;
        this.setState({ ...state });
    }

    test = () => {
        particleSwarmOptimization(this.state)
    }
    render() {
        return (
            <div>
                <label>Particles </label><input type="number" name="particles" onChange={event => this.inputChangeHandler(event)} placeholder="m" /> <br />
                <label>Max iterations </label><input type="number" name="iterations" onChange={event => this.inputChangeHandler(event)} placeholder="maxIterations" /><br />
                <label>Factor de inertie </label><input type="number" name="w" onChange={event => this.inputChangeHandler(event)} placeholder="w" /> <br />
                <label>C1 </label><input type="number" name="c1" onChange={event => this.inputChangeHandler(event)} placeholder="c1" /> <br />
                <label>C2 </label><input type="number" name="c2" onChange={event => this.inputChangeHandler(event)} placeholder="c2" /> <br />
                {this.state.c2 !== 0 ? <button onClick={this.test}>PSO</button> : null}
            </div>
        )
    }
}

export default ParticleSwarmOptimization;