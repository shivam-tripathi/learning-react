import React from 'react';

/**
 * Notes:
 * - We can use `if` or ternary operator
 * - We can use variables to store elements
 * - We can use inline with `&&` operator. If evaluation `{}` return false, it is not rendered.
 * - To prevent components from rendering, we can return `null`.
 * - Returning `null` from within the component's render method will not affect the firing of
 * lifecycle methods.
 */

function UserGreeting() {
  return <h3>Welcome back!</h3>;
}

function GuestGreeting() {
  return <h3>Please sign up!</h3>;
}

function Greeting(props: { isLoggedIn: boolean }) {
  const { isLoggedIn } = props;
  return isLoggedIn ? <UserGreeting /> : <GuestGreeting />;
}

function LoginButton(props: { onClick: () => void }) {
  const { onClick } = props;
  return (
    <button type="button" onClick={onClick}>
      Login
    </button>
  );
}

function LogoutButton(props: { onClick: () => void }) {
  const { onClick } = props;
  return (
    <button type="button" onClick={onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component<{}, { isLoggedIn: boolean }> {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn } = this.state;
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <>
        <Greeting isLoggedIn={isLoggedIn} />
        <p>The user is {isLoggedIn ? 'currently' : 'not'} logged in</p>
        {button}
      </>
    );
  }
}

function WarningBanner(props: { warn: boolean }) {
  const { warn } = props;
  if (!warn) return null;
  return <div className="warning">Warning!</div>;
}

function Page() {
  const [pageState, setPageState] = React.useState({ showWarning: true });
  const handleToggleClick = () => setPageState(state => ({ showWarning: !state.showWarning }));
  return (
    <>
      <WarningBanner warn={pageState.showWarning} />
      <button type="button" onClick={handleToggleClick}>
        {pageState.showWarning ? 'Hide' : 'Show'}
      </button>
    </>
  );
}

function MailBox(props: { unreadMessages: string[] }) {
  const { unreadMessages } = props;
  return (
    <>
      <h3> Hello! </h3>
      {unreadMessages.length > 0 && <h5> You have {unreadMessages.length} unread messages.</h5>}
    </>
  );
}

function ConditionalRendering() {
  return (
    <>
      <h1>Conditional Rendering</h1>
      <LoginControl />
      <MailBox unreadMessages={['one', 'two']} />
      <Page />
    </>
  );
}

export default {
  url: 'conditional-rendering',
  name: 'Conditional Rendering',
  Component: ConditionalRendering,
};
