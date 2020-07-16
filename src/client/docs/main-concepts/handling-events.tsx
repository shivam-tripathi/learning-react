import React from 'react';

/**
 * Notes:
 * - We cannot return false to disable default behavior. It must explicitly be prevented.
 * - We generally do not need to call addEventListener to add listeners to DOM element. We can
 * specify listeners when the elements are first rendered.
 * - If we use arrow function in callbacks, a different callback is created everytime event is
 * fired. Also, if the callback is passed as props to children, it might lead to re-rendering. Use
 * bind or use class fields syntax.
 * - In case we want to send some additional arguments to handle event function, bind it to the
 * function if it is already known.
 */

function ActionLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    alert('Link clicked'); // eslint-disable-line
    e.preventDefault();
  };

  return (
    <a onClick={handleClick} href="/">
      Link
    </a>
  );
}

class Toggle extends React.Component<{}, { isToggleOn: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { isToggleOn: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({ isToggleOn: !state.isToggleOn }));
  }

  render() {
    const { isToggleOn } = this.state;
    return (
      <button type="button" onClick={this.handleClick}>
        {isToggleOn ? 'OFF' : ' ON'}
      </button>
    );
  }
}

class PassingArguments extends React.Component<{}, { active?: number }> {
  constructor(props: {}) {
    super(props);
    this.state = { active: null };
  }

  handleClick(id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    this.setState({ active: id });
  }

  render() {
    const { active } = this.state;
    const buttons = [];
    for (let i = 1; i <= 10; i += 1) {
      const button = (
        <button type="button" onClick={this.handleClick.bind(this, i)}>
          {i}
        </button>
      );
      buttons.push(button);
    }

    return (
      <>
        <h5>{active ? `Active Element ${active}` : 'No active element'}</h5>
        {buttons}
      </>
    );
  }
}

function HandlingEvents() {
  return (
    <>
      <h1>Handling Events</h1>
      <ActionLink /> <br />
      <Toggle /> <br />
      <PassingArguments />
    </>
  );
}

export default {
  url: 'handling-events',
  name: 'Handling Events',
  Component: HandlingEvents,
};
