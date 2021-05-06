import React, {Component} from 'react';
import Counter from './counter';

class Counters extends Component {

  render() {
    // object destructuring, only taking the parts we need
    const {onReset, counters, onIncrement, onDecrement, onDelete} = this.props;
    return (
      <div>
        <button 
          onClick={onReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {counters.map(counter => 
          <Counter 
            key={counter.id} // key is used internally by react, cant be accessed by Counter
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
            counter={counter} // counter object has value and id
          >  
            <h6>Counter #{counter.id}</h6>
          </Counter>
        )}
      </div>
    );
  }
}

export default Counters;