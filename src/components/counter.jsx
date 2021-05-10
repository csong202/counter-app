import React, { Component } from 'react';

class Counter extends Component {

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('prevProps', prevProps);
  //   console.log('prevState', prevState);
  //   if (prevProps.counter.value !== this.props.counter.value) {
  //     // Ajax call and get new data from server
  //   }
  // }

  // componentWillUnmount() {
  //   console.log("counter unmount");
  // }
  
  render() {
    const {counter, counters} = this.props;
    return (
      <div>
        {this.props.children}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          id={this.getBtnIncrId(counter.id)}
          // onClick={() => this.props.onIncrement(this.props.counter)}
          onClick={this.incrementCounter.bind(this)}
          disabled={this.isBtnIncrDis(counter, counters)}
          className="btn btn-secondary btn-sm"
        >Increment
        </button>
        <button 
          id={this.getBtnDecrId(counter.id)}
          onClick={this.decrementCounter.bind(this)}
          disabled={this.isBtnDecrDis(counter, counters)}
          className="btn btn-secondary btn-sm m-2"
        >Decrement
        </button>
        <button 
          id={this.getBtnDelId(counter.id)}
          onClick={this.deleteCounter.bind(this)}
          disabled={this.isBtnDelDis(counter, counters)}
          className="btn btn-danger btn-sm"
        >Delete
        </button>
      </div>
    );
  }

  incrementCounter() {
    this.props.onIncrement(this.props.counter);
  }

  decrementCounter() {
    this.props.onDecrement(this.props.counter);
  }

  deleteCounter() {
    this.props.onDelete(this.props.counter.id);
  }

  getBtnIncrId(counterId) {
    return "btnIncr"+counterId;
  }

  getBtnDecrId(counterId) {
    return "btnDecr"+counterId;
  }

  getBtnDelId(counterId) {
    return "btnDel"+counterId;
  }

  isBtnIncrDis(counter, counters) {
    const index = counters.indexOf(counter);
    // console.log("isBtnIncrDis - ", counters[index].disabled);
    return counters[index].disabled;
  }

  isBtnDecrDis(counter, counters) {
    const index = counters.indexOf(counter);
    // console.log("isBtnDecrDis - ", counters[index].disabled);
    return counters[index].disabled;
  }

  isBtnDelDis(counter, counters) {
    const index = counters.indexOf(counter);
    // console.log("isBtnDelDis - ", counters[index].disabled);
    return counters[index].disabled;
  }

  getBadgeClasses() {
    const classes = `badge m-2 badge-${this.props.counter.value === 0 ? "warning" : "primary"}`;
    // console.log("badge class", classes);
    return classes;
  }

  formatCount() {
    // console.log("this.props.counter.value", this.props.counter.value);
    const val = this.props.counter.value;
    return val === 0 ? 'Zero' : val;
  }
}

export default Counter;

