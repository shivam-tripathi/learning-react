import React from 'react';

/**
 * Notes:
 * - Functions with hooks state are called function components.
 * - Hooks don't work inside a class
 * - A Hook is a special function that lets you “hook into” React features. For example, useState.
 */

function Example() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)} type="button">
        Click Me
      </button>
    </div>
  );
}

function StateHook() {
  return (
    <>
      <h1>Using the State Hook</h1>
      <Example />
    </>
  );
}

export default {
  url: 'using-the-state-hook',
  name: 'Using the State Hook',
  Component: StateHook,
};
