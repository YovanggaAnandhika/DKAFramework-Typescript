import {createClient, RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts} from 'redis';
import {RedisConfigConstructor} from "./Interfaces/RedisConfigConstructor";
import {merge} from "lodash";
import {DefaultConfig} from "./Config";

export class Redis {

    private RedisInstance : RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;
    constructor(config : RedisConfigConstructor = DefaultConfig) {
        config = merge(DefaultConfig, config);
        this.RedisInstance = createClient(config);
        this.RedisInstance.connect();
    }


}