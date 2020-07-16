import React from 'react';

/**
 * Notes:
 * - In applications with many components, it’s very important to free up resources taken by the
 * components when they are destroyed. (For example here, setInterval)
 * - State can only be directly assigned in the constructor. Every other place we use setState.
 * - State and props update may be asynchronous (batched). User (state, props) => void function in
 * the setState method to update instead. This can be arrow or regular function.
 * - State updates are shallow merged.
 * - Date flows down (unidirections or top-down) - state is always local and owned by a specific
 * component, and any UI or component derived from that state can only affect components below them
 * in the tree.
 */

class Clock extends React.Component<{}, { time: Date }> {
  timer: NodeJS.Timeout;

  constructor(props = {}) {
    super(props);
    this.state = { time: new Date() };
    // this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ time: new Date() });
  }

  render() {
    const { time } = this.state;
    return <h3>It is {time.toLocaleTimeString()}.</h3>;
  }
}

function StateAndLifecycle() {
  return (
    <>
      <h1>State and Lifecycle</h1>
      <Clock />
    </>
  );
}

export default {
  url: 'state-and-lifecycle',
  name: 'State And Lifecycle',
  Component: StateAndLifecycle,
};
