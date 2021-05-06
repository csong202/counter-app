import React, {Component} from 'react';
import NavBar from './components/navbar';
import Counters from "./components/counters";
import Counter from './components/counter';
import './App.css';

class App extends Component {

  state = {
    counters: [
      {id: 1, value: 4},
      {id: 2, value: 0},
      {id: 3, value: 0},
      {id: 4, value: 0}
    ]
  };

  constructor() {
    super();
    console.log("App construtor");
    // can set state directly with this.state = this.props.something
      // will only have access to props if it is passed as a param in the constructor and super
  }

  componentDidMount() {
    console.log("App mounted");
  }

  handleIncrement = counter => {
    console.log("\nINCREMENT");
    const counters = [...this.state.counters]; // cloning the counters array in the state object
    const index = counters.indexOf(counter);
    counters[index] = {...counter}; // cloning the counter object in argument
    counters[index].value++;
    console.log("counter #" + index + " has a value of " + counters[index].value);
    this.setState({counters})
  }

  handleDecrement = counter => {
    console.log("\nDECREMENT");
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = {...counter};
    let val = counters[index].value;
    if (val > 0) {val--};
    counters[index].value = val;
    console.log("counter #" + index + " has a value of " + counters[index].value);
    this.setState({counters});
  }

  handleReset = () => {
    console.log("\nRESET");
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({counters});
  }

  handleDelete = (counterID) => {
    console.log("deleting counter #", counterID);
    const counters = this.state.counters.filter(c => c.id !== counterID); // new array w/o specified counter
    this.setState({counters}); // equiv to this.setState({ counters: counters})
  }

  render() {
    console.log("App rendered")
    return (
      <React.Fragment>
        <NavBar totalCounters={this.state.counters.filter(c => c.value > 0).length}/>
        <main className='container'>
          <Counters 
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    )
  }
}

export default App;

/*
LIFE CYCLE HOOK
Mount
- constructor
- render
- componentDidMount
Update: changing state
- render
- componentDidUpdate
Unmount: removing from DOM
- componentWillUnmount
*/