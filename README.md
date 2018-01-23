# Simple ES6 and React beginner environment

================================================================================

Simple set-up for react and es6 beginners.
Enter all code in `src` directory. It will be transpiled to code in `lib`
directory, which will be used to run the web server. All client side files (js,
css etc.) will reside in the `src/static` directory, so that they could be
included in the browser.

Run the following to transpile ES6 via babel and run the server.
```shell
npm run buildrun
```

Alternatively, you can run the following to clear transpiled code and build:
```
npm run clean
npm run build
```

To rerun the server, simply enter the following in the command line:
```
npm start
```