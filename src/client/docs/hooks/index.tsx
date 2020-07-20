import React from 'react';
import ListPage from '../../common/list-page';
import StateHooks from './state-hook';

export default {
  url: 'hooks',
  name: 'Hooks',
  Component: () => <ListPage name="Hooks" topics={[StateHooks]} />,
};
