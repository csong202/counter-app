import React, {Component} from 'react';
import NavBar from './components/navbar';
import Counters from "./components/counters";
import Counter from './components/counter';
import './App.css';

class App extends Component {

  /* Review comment:
    +1 for the pattern of extracting state and event handlers to a higher order component, passing that state and event callbacks down to children

    Some relevant articles on this (often described as having "smart" and "dumb" components)
      - https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
      - https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
        - as this article points out, it shouldn't be enforced as a strict rule, and it's not as relevant when using hooks, but it is
        still very relevant to current InfoBase code

    It's an example of the general design principal called "Inversion of Control" (https://en.wikipedia.org/wiki/Inversion_of_control, 
    google around for other descriptions if the wikipedia article isn't clear enough). Very useful. Let me know if you want me to try to explain this
    in more depth some time.
  */ 
  state = {
    counters: [
      {id: 1, value: 4},
      {id: 2, value: 0},
      {id: 3, value: 0},
      {id: 4, value: 0}
    ],
    lastId: 4
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


  /* Review comment:
    +1 for being careful with cloning, always my advice to mutate only when absolutely necessary

    I recommend you try reimplementing this with a `.map`, would be good practice for all the lodash in the InfoBase
  */ 
  handleIncrement = counter => {
    console.log("\nINCREMENT");
    const counters = [...this.state.counters]; // cloning the counters array in the state object
    const index = counters.indexOf(counter);
    counters[index] = {...counter}; // cloning the counter object in argument
    counters[index].value++;
    console.log("counter at index " + index + " has a value of " + counters[index].value);
    this.setState({counters})
  }

  /* Review comment:
    Safe mutation, with `let val`, but not strictly necessary. I believe, once you've tried rewriting `handleIncrement` with a `.map`,
    you should be able to see a way to do with without the `let`.

    Otherwise, here's two patterns (well, morel ike one pattern written to ways) for avoiding mutating values/leaving intermediate values in scope:
      1) using a ternary
        const new_val = val > 0 ? val - 1 : val;
      2) using an immediately invoked function (sometimes written IIF)
        const new_val = (() => {
          if (val > 0) {
            return val - 1;
          } else {
            return val;
          }
        })();

    A ternary can be good for a evry simple case like this. An IIF is good if there's much more logic/complexity involved in determining the final return value
  */
 /* Review comment:
    Alternative note on 
    ```
      let val = counters[index].value;
      if (val > 0) {val--};
    ```
    can rewrite this as `const new_val = Math.max(val - 1, 0);`

    To turn this in to general advice, it's good to keep an eye out for logic, especially around numbers, which may actually just be a specific case of some more
    general utility function. If you can use an existing utility, or extract the logic in to a new one (with a clear name), it can help others read the code. Sort of
    a mental "snap to grid" effect, rather than reading and interpretting new code, they just need to see a concept they're already familliar with.
  */ 
  handleDecrement = counter => {
    console.log("\nDECREMENT");
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = {...counter};
    let val = counters[index].value;
    if (val > 0) {val--};
    counters[index].value = val;
    console.log("counter at index " + index + " has a value of " + counters[index].value);
    this.setState({counters});
  }

  /* Review comment:
    Hmm, interacting with the DOM, especially though selectors, within React is generally a "code smell". Not an outright anti-pattern,
    since it's sensible in some cases (interacting with non-React portions of the page, i.e. the InfoBase's global header and footer which are baked 
    in to the index html files), but always something to think twice about.
    
    Side note, since these are actually other React components you're interacting with here, it'd be better to some how pass down, or receive through call backs,
    React "refs" for them. See https://reactjs.org/docs/refs-and-the-dom.html. More of a React-first way to do this. Note, the ref docs strongly recommend not using
    them for this sort of thing though, haha.

    Once I've looked more at the Counter component itself, I may have a more specific piece of advice on how to handle this reset behaviour.
  */
  handleReset = () => {
    console.log("\nRESET");
    const counters = this.state.counters.map(c => {
      c.value = 0;
      const id = c.id;
      document.getElementById("check"+id).checked=true;
      document.getElementById("btnIncr"+id).disabled=false;
      document.getElementById("btnDecr"+id).disabled=false;
      document.getElementById("btnDel"+id).disabled=false;
      return c;
    });
    this.setState({counters});
  }

  /* Review comment
    RE: "works with 2 separate setStates but not with 1?", how were you writting that? `this.setState({counters, lastId: newLastId});` should work just fine.

    Little under the hood here, but react (as of 17) batches all state changes (and, before that, it always batched multiple state changes inside event callbacks),
    So calling setState twice vs once here should have the same result (although, if there were overlapping state changes, you'd have to think about how it's going to
    merge the state change objects).

    Note on 
    ```
      var counters = [...this.state.counters];
      counters.push({id: newLastId, value: 0});
    ```
    Could be one line as
    ```
      const counters = [...this.state.counters, {id: newLastId, value: 0}];
    ```

    Object/array spread is really useful for extending arrays/merging objects etc, on top of being one way to do a clone
  */
  handleAdd = () => {
    console.log("\nADD, last id", this.state.lastId);
    const newLastId = this.state.lastId + 1;
    var counters = [...this.state.counters];
    counters.push({id: newLastId, value: 0});
    // works with 2 separate setStates but not with 1?
    this.setState({counters});
    this.setState({lastId: newLastId});
    console.log("this.state.lastId", this.state.lastId);
  }

  /* Review comment
    +1 for the filter, nice
  */
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
            onAdd={this.handleAdd}
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