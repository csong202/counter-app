import React, {Component} from 'react';
import NavBar from './components/navbar';
import Counters from "./components/counters";
import Counter from './components/counter';
import './App.css';

class App extends Component {

  state = {
    counters: [
      {id: 1, value: 4, disabled: false},
      {id: 2, value: 0, disabled: false},
      {id: 3, value: 0, disabled: false},
      {id: 4, value: 0, disabled: false}
    ],
    lastId: 4
  };

  constructor() {
    super();
    console.log("App constructor");
    // can set state directly with this.state = this.props.something
      // will only have access to props if it is passed as a param in the constructor and super
  }

  componentDidMount() {
    console.log("App mounted");
  }

  handleIncrement = counter => {
    console.log("\nINCREMENT");
    const counters = [...this.state.counters]; // cloning the counters array in the state object
    const newCounters = counters.map(c => c === counter ? c.value++ : c.value);
    this.setState({newCounters})
  }

  handleDecrement = counter => {
    console.log("\nDECREMENT");
    const counters = [...this.state.counters];
    // const newCounters = counters.map(c => c === counter ? Math.max(c.value-1, 0) : c.value);
    const newCounters = counters.map(c => c === counter && c.value > 0 ? c.value--: c.value);
    this.setState({newCounters});
  }

  handleReset = () => {
    console.log("\nRESET");
    const counters = this.state.counters.map(c => {
      c.value = 0;
      c.disabled = false;
      return c;
    });
    this.setState({counters});
  }

  handleAdd = () => {
    console.log("\nADD, last id", this.state.lastId);
    const newLastId = this.state.lastId + 1;
    const counters = [...this.state.counters, {id: newLastId, value: 0, disabled: false}];
    this.setState({counters, lastId: newLastId});
    console.log("this.state.lastId", this.state.lastId);
  }

  handleDelete = (counterID) => {
    console.log("deleting counter #", counterID);
    const counters = this.state.counters.filter(c => c.id !== counterID); // new array w/o specified counter
    this.setState({counters}); // equiv to this.setState({ counters: counters})
  }

  handleCheck = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    console.log("\nHANDLE CHECK, index = " + index + ", " + (counter === undefined));
    const newCounters = counters.map(c => c === index ? c.disabled = !c.disabled: c.disabled);
    this.setState(newCounters);
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
            onAdd={this.handleAdd}
            onDelete={this.handleDelete}
            onCheck={this.handleCheck}
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