import React from 'react';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import MainConcepts from './main-concepts';
import URL from '../utils/url';

export default () => {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={match.url}>
          <h1> React Docs </h1>
          <ul>
            <li>
              <Link to={URL.construct(match.url, 'main-concepts')}>Main concepts</Link>
            </li>
          </ul>
        </Route>
        <Route path={URL.construct(match.url, 'main-concepts')}>
          <MainConcepts />
        </Route>
      </Switch>
    </>
  );
};
