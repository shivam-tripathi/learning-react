# Skeleton code for building server side node and client side react apps

---

This is a basic template setup building react apps with node backend from
scratch. It uses es6 for server side code as well as client side code. Webpack is used to bundle all
the client side code, which can then be directly included in the corresponding page. Simple babel is used to
transpile server side, you can find babel config file inside the `src/server`.

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
