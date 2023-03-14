import {ConfigEngine, ConfigEngineSocketIO, ConfigHost, ConfigPort, ConfigState} from "../../Interfaces/Global";

export const State : ConfigState = {
    SERVER_STATE_DEVELOPMENT : "development",
    SERVER_STATE_PRODUCTION : "production"
}

export const EngineSocketIO : ConfigEngineSocketIO = {
    Server : "SOCKET.IO",
    Client : "SOCKET.IO-CLIENT"
};

export const Engine : ConfigEngine = {
    FASTIFY : "FASTIFY",
    HTTP : "HTTP",
    UDP : "UDP",
    SOCKETIO : EngineSocketIO,
    REACTJS : "REACTJS",
    EXPRESSSJS : "EXPRESSJS"
}
export const Host : ConfigHost = {
    LOCALHOST : "127.0.0.1",
    WILDCARD : "0.0.0.0"
}

export const Port : ConfigPort = {
    DEFAULT : 80
}


const Server = {
    State : State,
    Engine : Engine,
    Host : Host,
    Port : Port,
}

export default Server;