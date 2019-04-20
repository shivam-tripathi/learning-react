# A simple web site

## Written in typescript and reactjs

---

To just test out the code:

```shell
npm start
```

In development mode, to build, start and watch for changes in server code:

```shell
npm run dev:run:server
```

In production, to build server:

```shell
npm run prod:build:server
```

In production to start the server:

```shell
npm run pm2:run:server
```

In production to stop the server:

```shell
npm run pm2:stop:server
```

To build and watch client side code:

```shell
npm run watch:client
```

A more verbose procedure could be:

```shell
npm run clean
npm run build
npm run dev:start:server
```
