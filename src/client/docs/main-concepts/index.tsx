import React from 'react';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import StateAndLifecycle from './state-and-lifecycle';
import HandlingEvents from './handling-events';
import LiftingStateUp from './lifting-state-up';
import URL from '../../utils/url';

// Add new topics here
const topics: { url: string; name: string; Component: () => JSX.Element }[] = [
  StateAndLifecycle,
  HandlingEvents,
  LiftingStateUp,
];

export default () => {
  const match = useRouteMatch();

  const links = topics.map(topic => (
    <li>
      <Link key={topic.url} to={URL.construct(match.url, topic.url)}>
        {topic.name}
      </Link>
    </li>
  ));

  const routes = topics.map(topic => {
    const { url: topicUrl, Component } = topic;
    return (
      <Route key={topicUrl} path={URL.construct(match.url, topic.url)}>
        <Component />
      </Route>
    );
  });

  return (
    <>
      <Switch>
        <Route key="main" exact path={match.url}>
          <h1> Main Concepts </h1>
          <ul>{links}</ul>
        </Route>
        {routes}
      </Switch>
    </>
  );
};
