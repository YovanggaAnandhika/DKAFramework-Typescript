# @dkaframework/server

[![GitHub last commit](https://img.shields.io/github/last-commit/YovanggaAnandhika/DKAFramework-Typescript)]()
[![GitHub contributors](https://img.shields.io/github/contributors/YovanggaAnandhika/DKAFramework-Typescript)]()
[![GitHub pull requests](https://img.shields.io/github/issues-pr/YovanggaAnandhika/DKAFramework-Typescript)]()
[![GitHub issues](https://img.shields.io/github/issues/YovanggaAnandhika/DKAFramework-Typescript)]()
[![GitHub repo size](https://img.shields.io/github/repo-size/YovanggaAnandhika/DKAFramework-Typescript)]()
[![GitHub version](https://img.shields.io/badge/version-v.1.0.145-green)]()

## Features

**[@dkaframework/server](https://github.com/fastify/fastify)** combines other frameworks into a framework and can be used practically to create your project. It consists of:

- a **[Fastify](https://github.com/fastify/fastify)** - Fast and low overhead web framework, for Node.js
- a **[Socket.io](https://github.com/socketio/socket.io-client)** - real-time bidirectional event-based communication
- a **[Node:dgram - UDP Server](https://nodejs.org/api/dgram.html)** - an udp core udp protocol send files

#### Simple and convenient API

Sample code:

```typescript
import {Server, Options} from "@dkaframework/server";

(async() => {
    await Server({
        engine: Options.ENGINE.FASTIFY, // Options.ENGINE.SOCKETIO || Options.ENGINE.UDP,
        host: Options.HOST.LOCALHOST, // Options.HOST.WILDCARD
        port: Options.PORT.DEFAULT,
        ... // Optional Config if you change engine type
    }).then(async (serverCallback) => {
        console.log(serverCallback)
    }).catch(async (error) => {
        console.error(error)
    });
})()
```
