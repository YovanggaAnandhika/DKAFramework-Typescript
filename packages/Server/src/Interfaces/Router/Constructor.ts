import {SchemaReactArray} from "../../Type/types";

export type RouterMode = "BROWSER_ROUTER" | "HASH_ROUTER" | "NONE"

export interface RouterConstructor {
    schema: SchemaReactArray,
    RouterMode?: RouterMode
}