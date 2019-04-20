import * as React from 'react';
import * as ReactDOM from 'react-dom';

(window as any).React = React;

const HelloWorld = () => {
  return (
    <div>
      <h1>Hello, World! How are you doing?</h1>
      <p> I am doing fine, how are you?</p>
    </div>
  );
};

ReactDOM.render(<HelloWorld />, document.getElementById('react-container'));
