import React from 'react';
import MainConcepts from './main-concepts';
import AdvancedGuides from './advanced-guides';
import Hooks from './hooks';
import ListPage from '../common/list-page';

export default {
  name: 'React Docs',
  url: 'react-docs',
  Component: () => <ListPage name="React Docs" topics={[MainConcepts, AdvancedGuides, Hooks]} />,
};
