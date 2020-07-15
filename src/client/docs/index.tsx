import React from 'react';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import MainConcepts from './main-concepts';

export default () => {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={match.url}>
          <h1> React Docs </h1>
          <Link to={`${match.url}/main-concepts`}>Main concepts</Link>
        </Route>
        <Route path={`${match.url}/main-concepts`}>
          <MainConcepts />
        </Route>
      </Switch>
    </>
  );
};
