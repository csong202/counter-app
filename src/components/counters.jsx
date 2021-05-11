import React, {Component} from 'react';
import Counter from './counter';

class Counters extends Component {

  render() {
    // object destructuring, only taking the parts we need 
    const {onReset, counters, onIncrement, onDecrement, onAdd, onDelete, onCheck} = this.props;
    return (
      <div>
        <button 
          onClick={onReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        <button 
          onClick={onAdd}
          className="btn btn-primary btn-sm"
        >Add Counter
        </button>
        {counters.map(counter => 
          <Counter 
            key={counter.id} // key is used internally by react, cant be accessed by Counter
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onAdd={onAdd}
            onDelete={onDelete}
            counter={counter} // counter object has value and id
            counters={counters}
          >  
            <div class="form-check">
              <label class="form-check-label">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  defaultChecked={true} 
                  checked = {this.isChecked(counter, counters)}
                  id={this.getCheckBoxId(counter.id)}
                  onClick={(e) => this.props.onCheck(e, counter)}  // to avoid the maximum depth error
                />Counter #{counter.id}
              </label>
            </div>
          </Counter>
        )}
      </div>
    );
  }

  isChecked = (counter, counters) => {
    const index = counters.indexOf(counter);
    console.log("isChecked - ", !counters[index].disabled);
    return !counters[index].disabled;
  }

  getCheckBoxId(counterId) {
    let id="check";
    id += counterId;
    return id;
  }
}

export default Counters;