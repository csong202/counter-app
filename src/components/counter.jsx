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
    const {counter} = this.props;
    return (
      <div>
        {this.props.children}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          id={this.getBtnIncrId(counter.id)}
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >Increment
        </button>
        <button 
          id={this.getBtnDecrId(counter.id)}
          onClick={() => this.props.onDecrement(this.props.counter)}
          className="btn btn-secondary btn-sm m-2"
        >Decrement
        </button>
        <button 
          id={this.getBtnDelId(counter.id)}
          onClick={() => this.props.onDelete(this.props.counter.id)} 
          className="btn btn-danger btn-sm"
        >Delete
        </button>
      </div>
    );
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

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
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

