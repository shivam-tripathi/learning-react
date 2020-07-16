import React from 'react';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import LiftingStateUp from './lifting-state-up';
import URL from '../../utils/url';

// Add new topics here
const topics: { url: string; name: string; Component: () => JSX.Element }[] = [LiftingStateUp];

export default () => {
  const match = useRouteMatch();

  const links = topics.map(topic => (
    <Link key={topic.url} to={URL.construct(match.url, topic.url)}>
      {topic.name}
    </Link>
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
          {links}
        </Route>
        {routes}
      </Switch>
    </>
  );
};
