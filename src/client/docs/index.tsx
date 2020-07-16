import React from 'react';
import MainConcepts from './main-concepts';
import Hooks from './hooks';
import ListPage from '../common/list-page';

export default {
  name: 'React Docs',
  url: 'react-docs',
  Component: () => <ListPage name="React Docs" topics={[MainConcepts, Hooks]} />,
};
