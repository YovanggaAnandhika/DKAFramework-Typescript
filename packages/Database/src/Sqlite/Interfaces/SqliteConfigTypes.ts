

export interface SqliteConfigConstructor {
    state ?: "DEVELOPMENT" | "PRODUCTION",
    filename : string,
    version ?: 4 | 3 | undefined,
    phrasepass ?: string | undefined
}

export interface SqliteInsertOptionsData {
    [nameColumn : string ] : any
}
export interface SqliteInsertOptions {
    data : SqliteInsertOptionsData
}
export interface SqliteSelectOptions {
    column ?: string[] | undefined,
    limit ?: number | undefined
}


export interface SqliteCreateTablesOptionsDataType {
    columnName : string,
    typeData : "TEXT" | "INTEGER" | "BLOB" | "NULL" | "REAL"
}
export interface SqliteCreateTablesOptions {
    column : Array<SqliteCreateTablesOptionsDataType>,
    limit ?: number | undefined,
    ifNotExist ?: true
}