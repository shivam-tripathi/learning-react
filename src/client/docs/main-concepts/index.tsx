import React from 'react';
import StateAndLifecycle from './state-and-lifecycle';
import HandlingEvents from './handling-events';
import ConditionalRendering from './conditional-rendering';
import LiftingStateUp from './lifting-state-up';
import ListPage from '../../common/list-page';

export default {
  url: 'main-concepts',
  name: 'Main Concepts',
  Component: () => (
    <ListPage
      name="Main Concepts"
      topics={[StateAndLifecycle, HandlingEvents, ConditionalRendering, LiftingStateUp]}
    />
  ),
};
