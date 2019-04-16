import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;

const HelloWorld = () => {
  return <h1>Hello, World! How are you doing?</h1>;
};

ReactDOM.render(<HelloWorld />, document.getElementById('react-container'));
