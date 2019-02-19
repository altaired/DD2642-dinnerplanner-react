import React, {
  Component
} from 'react';
import {
  Route
} from 'react-router-dom';
import './welcome/Welcome';
import {
  Provider
} from 'react-redux';
import './App.css';
import Welcome from './welcome/Welcome';
import Search from './search/Search';
import store from './store';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header" >
            <h1 className="App-title" > {
              this.state.title
            }</h1>{
              /* We rended diffrent component based on the path */
            }
            <Route exact path="/" component={Welcome} />
            <Route path="/search" component={Search} />
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;