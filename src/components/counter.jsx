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
    return (
      <div>
        {this.props.children}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm m-1"
        >Increment
        </button>
        <button 
          // onClick={() => this.props.onDelete(this.props.counter.id)} 
          onClick = {() => this.props.onDelete(this.props.counter)}
          className="btn btn-danger btn-sm m2"
        >Delete</button>
      </div>
    );
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

