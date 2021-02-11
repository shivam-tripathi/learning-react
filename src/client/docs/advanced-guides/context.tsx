import React from 'react';

// Context provides a way to pass data through the component tree without having
// to pass props down manually at every level.

const ThemeContext = React.createContext('light'); // Pass default value
const ThemedButton = () => {
  return (
    <ThemeContext.Consumer>
      {value => <button type="button">{`Button:${value}`}</button>}
    </ThemeContext.Consumer>
  );
};
const ToolBar = () => (
  <div>
    <ThemedButton />
  </div>
);
const App = () => {
  return (
    <ThemeContext.Provider value="dark">
      <ToolBar />
    </ThemeContext.Provider>
  );
};

// We can utilise IOC to send children directly instead of props drilling.
// See composition vs inheritence for more details.

// API
// - React.createContext
// - Context.Provider:
//    - The value prop is passed to consuming components that are descendants of the Provider.
//    - Providers can be nested to override values deeper within the tree.
//    - All consumers that are descendants of a Provider will re-render whenever the Provider’s
//      value prop changes. It is not subject to the shouldComponentUpdate method, so the consumer
//      is updated even when an ancestor component skips an update.
//    - Changes are determined by comparing the new and old values using the same algorithm as Object.is.
// - Class.contextType
//    - The contextType property on a class can be assigned a Context object created by
//      React.createContext().
//    - This lets you consume the nearest current value of that Context type using this.context.
//    - You can reference this in any of the lifecycle methods including the render function.
// - Context.Consumer
//    - A React component that subscribes to context changes.
//    - This lets you subscribe to a context within a function component.
//    - The value argument passed to the function will be equal to the value prop of the closest
//      Provider for this context above in the tree. If there is no Provider for this context above, the value argument will be equal to the defaultValue that was passed to createContext().
// - Context.displayName

interface Theme {
  foreground: string;
  background: string;
  name: string;
}
interface Themes {
  light: Theme;
  dark: Theme;
}
const themes: Themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
    name: 'light',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    name: 'dark',
  },
};

// #1 Dynamic Context
const DynamicContextTheme = React.createContext(themes.dark);
class DynamicContextButton extends React.Component<{
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> {
  static contextType = DynamicContextTheme;

  render() {
    const {
      context: theme,
      props,
    }: {
      context: Theme;
      props: { onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void };
    } = this;
    return (
      <button
        type="button"
        onClick={props.onClick}
        style={{ backgroundColor: theme.background, color: theme.foreground, height: '30px' }}
      >
        {theme.name}
      </button>
    );
  }
}
const DynamicContextToolbar = ({ changeTheme }) => (
  <DynamicContextButton onClick={changeTheme}></DynamicContextButton>
);
class DynamicContextApp extends React.Component<{}, { theme: Theme }> {
  toggleTheme: () => void;

  constructor(props) {
    super(props);
    this.state = { theme: themes.light };
    this.toggleTheme = () => {
      const { theme: curTheme } = this.state;
      this.setState({
        theme: curTheme === themes.dark ? themes.light : themes.dark,
      });
    };
  }

  render() {
    const { theme } = this.state;
    return (
      <DynamicContextTheme.Provider value={theme}>
        <DynamicContextToolbar changeTheme={this.toggleTheme}></DynamicContextToolbar>
        <div>
          <DynamicContextButton onClick={() => {}}></DynamicContextButton>
        </div>
      </DynamicContextTheme.Provider>
    );
  }
}

// #2 Updating context from a nested component
const UpdateContextTheme = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

const UpdateContextButton = () => {
  return (
    <UpdateContextTheme.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          type="button"
          onClick={toggleTheme}
          style={{ backgroundColor: theme.background, color: theme.foreground }}
        >
          Update Context
        </button>
      )}
    </UpdateContextTheme.Consumer>
  );
};

class UpdateContextApp extends React.Component<{}, { theme: Theme; toggleTheme: () => void }> {
  toggleTheme: () => void;

  constructor(props?: {}) {
    super(props);
    this.toggleTheme = () => {
      const { theme } = this.state;
      this.setState({
        theme: theme === themes.dark ? themes.light : themes.dark,
      });
    };
    this.state = { theme: themes.dark, toggleTheme: this.toggleTheme };
  }

  render() {
    const { theme, toggleTheme } = this.state;
    return (
      <UpdateContextTheme.Provider value={{ theme, toggleTheme }}>
        <UpdateContextButton />
      </UpdateContextTheme.Provider>
    );
  }
}

// #3 Consuming multiple contexts
// To keep re-rendering fast, react needs to make each context consumer a separate node in the tree
const MultiContextTheme = React.createContext('light');
const MultiContextUser = React.createContext({ name: 'guest' });
const MultiContextContent = () => (
  <MultiContextUser.Consumer>
    {user => (
      <MultiContextTheme.Consumer>
        {theme => (
          <p
            style={{
              backgroundColor: themes[theme].background,
              color: themes[theme].foreground,
            }}
          >{`User: ${user.name}`}</p>
        )}
      </MultiContextTheme.Consumer>
    )}
  </MultiContextUser.Consumer>
);
const Layout = () => (
  <div>
    <MultiContextContent />
  </div>
);
const MultiContextApp = ({
  signedInUser,
  theme,
}: {
  signedInUser: { name: string };
  theme: keyof Themes;
}) => {
  return (
    <MultiContextTheme.Provider value={theme}>
      <MultiContextUser.Provider value={signedInUser}>
        <Layout />
      </MultiContextUser.Provider>
    </MultiContextTheme.Provider>
  );
};

// Final
const Context = () => {
  return (
    <>
      <h1>Context</h1>
      <App />
      <DynamicContextApp />
      <UpdateContextApp />
      <MultiContextApp signedInUser={{ name: 'shivam' }} theme="light" />
    </>
  );
};
export default {
  url: 'context',
  name: 'Context',
  Component: Context,
};
