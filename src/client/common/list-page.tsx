import React from 'react';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import { link } from 'fs';
import URL from '../utils/url';

export default function ListPage(props: {
  name: string;
  topics: { url: string; name: string; Component: () => JSX.Element }[];
}) {
  const { name, topics } = props;
  const match = useRouteMatch();

  const links = topics.map(topic => (
    <li key={`${topic.url}:link`}>
      <Link to={URL.construct(match.url, topic.url)}>{topic.name}</Link>
    </li>
  ));

  const routes = topics.map(topic => {
    return (
      <Route key={`${topic.url}:route`} path={URL.construct(match.url, topic.url)}>
        <topic.Component />
      </Route>
    );
  });

  return (
    <>
      <Switch>
        <Route key="main" exact path={match.url}>
          <h1> {name} </h1>
          <ul>{links}</ul>
        </Route>
        {routes}
      </Switch>
    </>
  );
}
