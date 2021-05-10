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
  
  /* Review Comment
    General note on React event handlers, although it's not one even I always remember/bother to apply my self as it's often just a
    marginal optimization (but potentially significant in some cases):

    React can't see in to the implementation of a function. When comparing if two functions are equivalent, it only has the memory address to
    go off of. As a result, any function declared inside the render method, like `onClick={() => this.props.onIncrement(this.props.counter)}`
    will look like a new function on each re-render. That means every time this component renders, React will have to update the actual DOM
    and replace the "old" event handler with the "new" one.

    On the other hand, if the function is declared outside of the render method (e.g. as a class method), it will have a consistent identity
    across renders and React will be able to smartly avoid pointlessly updating the actual DOM event handler.

    Simillar applies to functions passed as props. If they're defined within a render method then they'll always look like a new prop to the child
    component, which can result in unnecessary re-renders of pure components.
  */
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

  /* Review Comment
    Could use template literals to write in one line:
    ```
      const classes = `badge m-2 badge-${this.props.counter.value === 0 ? "warning" : "primary"}`;
    ```
    Debatably clearer to read, avoids the `let` and mutation, which is just generally nice.

    Bit of a side note on a more InfoBase specific thing, but we generally use this small utility for class name logic
    this sort of logic See here: https://www.npmjs.com/package/classnames

    Arguably it would be better not to construct a class name based on conditional logic, because it makes it harder to search through
    the code base for instance of that class name... but we still do plenty of string construction (class names, text keys, etc) in the InfoBase
    so I can't pretend that's a hard rule or anything, haha.
  */
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

