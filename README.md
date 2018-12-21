# React set up for beginners

--------------------------------------------------------------------------------

This is a basic template setup building react apps with node backend from
scratch. It also supports server side code in es6. It uses webpack to bundle all
the client side code to be directly included in the browser, and babel setup to
transpile server side.

All server side code goes in `src/server` directory. Similarly, all client side
code goes in `src/client/`. For other static files like css, you can add them
in the relevant folders in `static/client/`. Views reside in `static/views`.


Run the following to build all server side and client side code.
```shell
npm start
```

Alternatively, you can run the following to clear transpiled code and build:
```shell
npm run clean
npm run build
npm run runserver
```