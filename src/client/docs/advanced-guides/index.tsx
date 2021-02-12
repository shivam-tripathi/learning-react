import React from 'react';
import ListPage from '../../common/list-page';
import Context from './context';

export default {
  url: 'advanced-guides',
  name: 'Advanced Guides',
  Component: () => <ListPage name="Advanced Guides" topics={[Context]} />,
};
