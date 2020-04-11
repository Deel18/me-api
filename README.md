[![Build Status](https://travis-ci.org/Deel18/me-api.svg?branch=master)](https://travis-ci.org/Deel18/me-api)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Deel18/me-api/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Deel18/me-api/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/Deel18/me-api/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Deel18/me-api/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Deel18/me-api/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Deel18/me-api/build-status/master)

Backend for my JS-framework page.
================================


### Setup

```
npm install
```

### Create .env file

```
#server variables

# Server variables
#PORT=8333

# JWT Config
JWT_SECRET='<YOUR SECRET HERE>'
```

### Create Sqlite database

1. Ensure you have Sqlite3 installed on your computer.

2. Move to the db folder. Run below command.

```
$ sqlite3 texts.sqlite
sqlite> .read migrate.sql
sqlite> .exit
```

### Start server
Everything has been setup. Let's start up the server.

```
npm start
```
