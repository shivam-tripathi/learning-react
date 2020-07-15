import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Docs from './docs';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <h1> Welcome to React Learning!</h1>
            <Link to="/docs">Docs</Link>
          </Route>
          <Route path="/docs">
            <Docs />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('react-container'));
