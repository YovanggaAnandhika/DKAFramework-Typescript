# @dkaframework/database

[![GitHub last commit](https://img.shields.io/github/last-commit/YovanggaAnandhika/DKAFramework-Typescript)]()
[![GitHub contributors](https://img.shields.io/github/contributors/YovanggaAnandhika/DKAFramework-Typescript)]()
[![GitHub pull requests](https://img.shields.io/github/issues-pr/YovanggaAnandhika/DKAFramework-Typescript)]()
[![GitHub issues](https://img.shields.io/github/issues/YovanggaAnandhika/DKAFramework-Typescript)]()
[![GitHub repo size](https://img.shields.io/github/repo-size/YovanggaAnandhika/DKAFramework-Typescript)]()
[![GitHub version](https://img.shields.io/badge/version-v.1.0.145-green)]()

## Features

**[@dkaframework/database](https://github.com/fastify/fastify)** combines other frameworks into a framework and can be used practically to create your project. It consists of:

- a **[MariaDB](https://github.com/mariadb-corporation/mariadb-connector-nodejs)** - SQL dbms from mariadb engine
- a **[MongoDB](https://github.com/mongodb/node-mongodb-native)** - NoSQL dbms Connector
- a **[Firebase Firestore](https://www.npmjs.com/package/firebase)** - a dbms from Google firebase SDK

#### Simple and convenient API

Sample code:

```typescript
import {MariaDB} from "@dkaframework/database";

(async() => {
    let db = await new MariaDB({
        host : "127.0.0.1", // Options.HOST.WILDCARD
        port: 3306,
        ... // Optional Config if you change engine type
    });
    
    db.Read(tableName, {
        search : [],
        limit : 1
    }).then(async (resultData) => {
        // the result Read Database
    }).catch(async (error) => {
        // the result if error read data or not exist
    })
})()
```
