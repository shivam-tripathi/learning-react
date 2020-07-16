import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ReactDocs from './docs';
import URL from './utils/url';

const topics = [ReactDocs];
const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <h1> Welcome to React Learning!</h1>
            {topics.map(topic => (
              <Link key={topic.url} to={URL.construct('/', topic.url)}>
                {topic.name}
              </Link>
            ))}
          </Route>
          {topics.map(topic => (
            <Route key={topic.url} path={URL.construct('/', topic.url)}>
              <topic.Component />
            </Route>
          ))}
        </Switch>
      </Router>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('react-container'));
