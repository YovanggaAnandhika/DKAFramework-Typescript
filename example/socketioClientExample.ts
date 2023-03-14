import { Client, Options } from "@dkaframework/server";
import {attempt} from "lodash";

(async () => {
    Client({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT, // State Server
        engine : Options.Server.Engine.SOCKETIO.Client,
        host : Options.Server.Host.LOCALHOST, // Your Server Address
        port : Options.Server.Port.DEFAULT, // Your Server Port
        io: async (io) => {
            //@todo Your Code After Socket Server Created
        },
        settings : {
            //@todo Your Code Settings IO Client
        },
        on : {
            Connect : async (io) => {
                //@todo Your Code After Client Succefully Connected
            },
            ConnectError : async (error) => {
                //@todo Your Code After Client Error Connect
            },
            Disconnect : async (id) => {
                //@todo Your Code After Client Disconnected
            },
            Manager : {
                Ping : async (delay) => {
                    //@todo Your Code ping Heartbeat
                },
                Reconnect : async (attempt) => {
                    //@todo Your code if CLient Reconnect
                },
                ReconnectAttempt : async (attempt) => {
                    //@todo Your code if CLient Reconnect Attempt
                },
                ReconnectError : async (attempt) => {
                    //@todo Your code if CLient Reconnect Error
                },
                ReconnectFailed : async () => {
                    //@todo Your code if CLient Reconnect Failed
                },
                Packet : async (packet) => {
                    //@todo Detect Packet IO Client from Server
                }
            }
        }
    }).then(async (result) => {
        console.log(result)
    }).catch(async (error) => {
        console.log(error)
    })
})()