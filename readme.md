# Clean Architecture Sandbox

A small simple APP built from a curiosity and passion for learning Clean Architecture. Main purpose is to shorten given URL, store and redirect to the long one on request. Teck stack used: `Node.js`, `Express.js`, `Typescript`, `Prisma`, `SQLite`.

Supported endpoints:
* POST `{baseUrl}/api/url` (Returns shortened URL)
* GET `{baseUrl}/shorturl/:url` (Redirects to the corresponding long URL)

## Install dependencies:
```sh
npm i
```

## Run migrations:
```sh
npx prisma migrate deploy
```

## Launch app in prod mode:
```sh
npm run start
```

## Launch app in dev mode (with nodemon):
```sh
npm run dev
```

## Run Unit tests:
```sh
npm run test
```

___
Note: `requests.html` file is provided for request examples. Available to use with VSCode REST Client.
