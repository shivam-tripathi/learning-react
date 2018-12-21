import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;

const HelloWorld = function() { return <h1>Hello, World!</h1> };

ReactDOM.render(
    <HelloWorld/>,
    document.getElementById('react-container')
);