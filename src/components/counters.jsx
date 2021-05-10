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

  /* Review comment
    Ah, this explains what was going on in handleReset. As I said in the comment on that in App.js, really want to avoid mixing
    imperative DOM manipulation with React unless absolutely necessary (and even then it should probably be treated as "hack" code and have
    comments on why it was necessary). 

    In this instance, you could add an `is_disabled` property to the counter objects in App's state, drop the direct DOM manipulation.
    
    Because I didn't go much more in to that than saying it's not the "React-first" way in my handleReset comment, here's some reasons
    mixing imperative DOM manipulation with React is a, possibly risky, hack:
      - it's mixing paradigms. React is mostly declarative. You tell React what you want to render in the DOM, not how to render it.
        React is designed with that assumption in mind.
      - To be more specific, when you side-step React's interace, you
        A) prevent React from doing its job (re-rendering children, life-cylce hooks, etc) and
        B) you take on a lot of assumptions about what React's black-box is up to (i.e. are the nodes you're trying to interact with
          actually rendered yet, are they about to re-render, etc.)
      - Indirectly related: React's rendering internals should be a "black-box" to your code, which should use the documented lifecycle methods etc rather
        than making assumptions about rendering. The API will be stable outside of major version releases (which will document breaking API changes).
        Internals, at least their implementation, could potentially change any time.
          - while your code shouldn't "know" about anything but the official interface, internals shouldn't be completely a black-box to you as a developer;
            you don't need to know all the implemntation details, but having a general understanding of what actually goes on under the hood can help a lot
            with debugging, optimization, etc

    An event callback like this is one of the safer places to do this sort of thing, if you really have to. Can assume this won't fire unless the
    referenced component actually does exist in the DOM to be interacted with. Even then it would be better to:
      A) use a react Ref instead of querying the DOM (for one thing, it avoids needing id's which can be dicey on components meant for general use,
        e.g. this code could break if someone later tried rendering two <Counters /> on the same page and ids overlaped) and
      B) avoid modifying the DOM directly (i.e. instead, update some component state to trigger a properly managed re-render with the changes you
        would want to make)
  */
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