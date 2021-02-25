import React, { RefCallback, RefObject } from 'react';

// Refs provide a way to access DOM nodes or React elements created in the render method
// Typically, parent components interact with children components via props only; but when
// have to modify a child (React component or DOM element) outside of the typical dataflow
// we can use refs.

// Use cases:
// 1. Managing focus, text selection, or media playback.
// 2. Triggering imperative animations.
// 3. Integrating with third-party DOM libraries.
// We need to avoid using refs when the action can be done declaratively. For example, instead of
// exposing open() and close() methods on a Dialog component, pass an isOpen prop to it. Refs must
// not be overused.

// # Create refs
class CreateRef extends React.Component {
  myRef: RefObject<HTMLDivElement>; // can be referenced throughout the component

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return (
      <>
        <h3>Create Refs</h3>
        <ul>
          <li>
            Refs provide a way to access DOM nodes or React elements created in the render method.
          </li>
          <li>
            Typically, parent components interact with children components via props only; but when
            have to modify a child (React component or DOM element) outside of the typical dataflow
            we can use refs.{' '}
          </li>
          <li>
            Use cases:
            <ol>
              <li>Managing focus, text selection, or media playback.</li>
              <li>Triggering imperative animations.</li>
              <li>
                Integrating with third-party DOM libraries. We need to avoid using refs when the
                action can be done declaratively. For example, instead of exposing open() and
                close() methods on a Dialog component, pass an isOpen prop to it.
              </li>
            </ol>
          </li>
          Refs must not be overused
        </ul>
        <div ref={this.myRef}></div>
      </>
    );
  }
}

// # Access refs
// When a ref is passed to an element in render, a reference to the node becomes accessible at the
// current attribute of the ref.
// #1 Ref to DOM element
class RefToDOM extends React.Component<{}, undefined> {
  textInput: RefObject<HTMLInputElement>;

  focusTextInput: () => void;

  constructor(props = {}) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = () => {
      this.textInput.current.focus();
    };
  }

  render() {
    return (
      <div>
        <h3>Access Refs: Ref to DOM element</h3>
        <ul>
          <li>
            When a ref is passed to an element in render, a reference to the node becomes accessible
            at the current attribute of the ref.
          </li>
          <li>
            React will assign the current property with the DOM element when the component mounts.
            It assigns it back to null when it unmounts. Ref updates happen before componentDidMount
            and componentDidUpdate
          </li>
        </ul>
        <input ref={this.textInput}></input>
        <input type="button" value="focus the text input" onClick={this.focusTextInput}></input>
      </div>
    );
  }
}
// React will assign the current property with the DOM element when the component mounts.
// It assigns it back to null when it unmounts. Ref updates happen before componentDidMount and componentDiUpdate

// #2 Ref to class component
class CustomTextInput extends React.Component<{}, { backgroundColor: string; color: string }> {
  constructor(props = {}) {
    super(props);
    this.state = { backgroundColor: 'aqua', color: 'gray' };
  }

  changeColor() {
    const { backgroundColor } = this.state;
    this.setState({ backgroundColor: backgroundColor === 'aqua' ? 'aquamarine' : 'aqua' });
  }

  render() {
    const { backgroundColor, color } = this.state;
    return (
      <>
        <h3>Access Refs: Ref to class component</h3>
        <input
          type="defaultValue"
          placeholder="Custom Text Input"
          style={{ backgroundColor, color }}
        ></input>
      </>
    );
  }
}

class RefToClass extends React.Component<{}> {
  textInput: RefObject<CustomTextInput>;

  constructor(props = {}) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    setInterval(() => this.textInput.current.changeColor(), 1000);
  }

  render() {
    return <CustomTextInput ref={this.textInput} />;
  }
}

// #3 Refs and functional components
// By default, you may not use the ref attribute on function components because they don’t have instances
// We can use the ref attribute inside a function component as long as you refer to a DOM element or a
// class component:
const RefInFunctionalComponents = () => {
  const textInput = React.useRef<HTMLInputElement>(null);
  const handleClick = () => textInput.current.focus();
  return (
    <div>
      <h3>Access Refs: Functional Components</h3>
      <ul>
        <li>
          By default, you may not use the ref attribute on function components because they don’t
          have instances
        </li>
        <li>
          We can use the ref attribute inside a function component as long as you refer to a DOM
          element or a class component
        </li>
      </ul>
      <input type="text" ref={textInput} />
      <input type="button" value="focus" onClick={handleClick} />
    </div>
  );
};

// Exposing DOM Refs to Parent Components
// Sometimes, we want to access a child's DOM from parent. It breaks encapsulation so it is not recommended.
// We can use ref forwarding, which lets components opt into exposing any child component’s ref as their own.
// Otherwise, we'll have to pass ref as props to child component. Last resort can be findDOMNode(), but it is
// no recommended.

// Callback refs
// React will call the ref callback with the DOM element when the component mounts, and call it with null
// when it unmounts. Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.
class CallbackRefsCustomInput extends React.Component<{}, {}> {
  textInput: HTMLInputElement;

  focusTextInput: () => void;

  setTextInputRef: RefCallback<HTMLInputElement>;

  constructor(props = {}) {
    super(props);
    this.textInput = null;
    this.setTextInputRef = ref => {
      this.textInput = ref;
    };
    this.focusTextInput = () => {
      if (this.textInput !== null) {
        this.textInput.focus();
      }
    };
  }

  componentDidMount() {
    this.focusTextInput(); // autofocus
  }

  render() {
    return (
      <div>
        <h3>Exposing DOM refs to Parent Components</h3>
        <ul>
          <li>
            Sometimes, we want to access a child&apos;s DOM from parent. It breaks encapsulation so
            it is not recommended.
          </li>
          <li>
            We can use ref forwarding, which lets components opt into exposing any child component’s
            ref as their own.
          </li>
          <li>
            Otherwise, we&apos;ll have to pass ref as props to child component. Last resort can be
            findDOMNode(), but it is not recommended.
          </li>
        </ul>
        <h3>Callback refs</h3>
        <ul>
          <li>
            React will call the ref callback with the DOM element when the component mounts, and
            call it with null when it unmounts. Refs are guaranteed to be up-to-date before
            componentDidMount or componentDidUpdate fires. Make sure to add not equals null while
            accessing refs.
          </li>
          <li>
            Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate
            fires.
          </li>
          <li>Callback refs can be passed as props as well.</li>
        </ul>
        <input ref={this.setTextInputRef}></input>
        <input type="button" onClick={this.focusTextInput} value="Click Me!" />
      </div>
    );
  }
}

const Caveats = () => (
  <>
    <h3>Caveats</h3>
    <ul>
      <li>
        If ref callback is inline, it will be invoked twice during updates - once with null and then
        with DOM
      </li>
      <li>
        This is because inline method is created on each render, and old ref have to cleared. It can
        be fixed using callback bound to the class, though it should not matter in most cases.
      </li>
    </ul>
  </>
);

const RefsAndTheDOM = () => {
  React.useEffect(() => {
    document.title = 'Refs and the DOM: Learning React';
  });
  return (
    <>
      <h1>Refs And The DOM</h1>
      <CreateRef />
      <RefToDOM />
      <RefToClass />
      <RefInFunctionalComponents />
      <CallbackRefsCustomInput />
      <Caveats />
    </>
  );
};

export default {
  url: 'refs-and-the-dom',
  name: 'Refs And The DOM',
  Component: RefsAndTheDOM,
};
