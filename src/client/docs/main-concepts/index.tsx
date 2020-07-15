import React from 'react';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import LiftingStateUp from './lifting-state-up';

// Add new topics here
const topics: { url: string; name: string; Component: () => JSX.Element }[] = [LiftingStateUp];

export default () => {
  const match = useRouteMatch();

  const links = topics.map(topic => (
    <Link key={topic.url} to={`${match.url}/${topic.url}`}>
      {topic.name}
    </Link>
  ));

  const routes = topics.map(topic => {
    const { url: topicUrl, Component } = topic;
    return (
      <Route key={topicUrl} path={`${match.url}/${topicUrl}`}>
        <Component />
      </Route>
    );
  });

  return (
    <>
      <Switch>
        <Route key="main" exact path={match.url}>
          <h1> Main Concepts </h1>
          {links}
        </Route>
        {routes}
      </Switch>
    </>
  );
};
