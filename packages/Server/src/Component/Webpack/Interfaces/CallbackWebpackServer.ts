

export interface CallbackWebpackServer {
    status ?: boolean,
    code ?: 200 | 404 | 203 | 300,
    msg ?: string
}