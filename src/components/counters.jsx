import React, {Component} from 'react';
import Counter from './counter';

class Counters extends Component {

  render() {
    // object destructuring, only taking the parts we need 
    const {onReset, counters, onIncrement, onDecrement, onAdd, onDelete} = this.props;
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
          >  
            <div class="form-check">
              <label class="form-check-label">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  defaultChecked={true} 
                  id={this.getCheckBoxId(counter.id)}
                  onClick={((e) => this.handleCheck(e, counter.id, counter))}
                />Counter #{counter.id}
              </label>
            </div>
          </Counter>
        )}
      </div>
    );
  }

  handleCheck = (e, counterId, counter) => {
    console.log("clicked checkbox #" + counterId);
    var btnIncr = document.getElementById("btnIncr"+counterId);
    var btnDecr = document.getElementById("btnDecr"+counterId);
    var btnDel = document.getElementById("btnDel"+counterId);

    if (!btnIncr.disabled) {
      console.log("was enabled");
      btnIncr.disabled=true;
      btnDecr.disabled=true;
      btnDel.disabled=true;
    }
    else {
      console.log("was disabled");
      btnIncr.disabled=false;
      btnDecr.disabled=false;
      btnDel.disabled=false;
    }
  }

  getCheckBoxId(counterId) {
    let id="check";
    id += counterId;
    return id;
  }
}

export default Counters;