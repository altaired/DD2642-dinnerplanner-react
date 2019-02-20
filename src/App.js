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
import Dish from './dish/Dish';
import Printout from './printout/Printout';
import Overview from './overview/Overview';
import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }


  render() {
    return (
      <Provider store={store} >
        <div className="App" >
          <header className="App-header" >
            <h1 className="App-title" > {
              this.state.title
            } </h1>{
              /* We rended diffrent component based on the path */
            }
            <Route exact path="/" component={Welcome} />
            <Route path="/search" component={Search} />
            <Route path="/dish/:id" component={Dish} />
            <Route path="/printout" component={Printout} />
            <Route path="/overview" component={Overview}/>
          </header> </div>
      </Provider>
    );
  }
}

export default App;