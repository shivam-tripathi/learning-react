import React from 'react';
import {render} from 'react-dom';

window.React = React;

const HelloWorld = () => <h1>Hello, World!</h1>;

render(
    <HelloWorld/>,
    document.getElementById('react-container')
);