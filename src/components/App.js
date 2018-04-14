import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Search from '../containers/Search';
import About from '../containers/About';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/search/:query/:page" component={Search}/>
          <Route path="/about/:username" component={About}/>
          <Redirect to="/search/some/1"/>
        </Switch>
      </Router>
    );
  }
}

export default App;
