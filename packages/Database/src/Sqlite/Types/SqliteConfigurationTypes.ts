



export type DEVELOPMENT = "DEVELOPMENT";
export type PRODUCTION = "PRODUCTION";

export type STATES = PRODUCTION | DEVELOPMENT;

export const DEVELOPMENT : DEVELOPMENT = "DEVELOPMENT";
export const PRODUCTION : PRODUCTION = "PRODUCTION";

/** , .sqlite3, .db, .db3, .s3db, .sl3 **/
export type SQLITE_EXT_SQLITE = "sqlite";
export type SQLITE_EXT_DB = "db";
export type SQLITE_EXT_DB3 = "db3";
export type SQLITE_EXT_S3DB = "s3db";
export type SQLITE_EXT_SL3 = "sl3";

export type SQLITE_ALL_EXT = SQLITE_EXT_SQLITE | SQLITE_EXT_DB | SQLITE_EXT_DB3 | SQLITE_EXT_S3DB | SQLITE_EXT_SL3;

export const SQLITE_EXT_SQLITE : SQLITE_EXT_SQLITE = "sqlite";
export const SQLITE_EXT_DB : SQLITE_EXT_DB = "db";
export const SQLITE_EXT_DB3 : SQLITE_EXT_DB3 = "db3";
export const SQLITE_EXT_S3DB : SQLITE_EXT_S3DB = "s3db";
export const SQLITE_EXT_SL3 : SQLITE_EXT_SL3 = "sl3";

// DELETE | TRUNCATE | PERSIST | MEMORY | WAL | OFF
export type SQLITE_JOURNAL_DELETE = "DELETE";
export type SQLITE_JOURNAL_TRUNCATE = "TRUNCATE";
export type SQLITE_JOURNAL_PERSIST = "PERSIST";
export type SQLITE_JOURNAL_MEMORY = "MEMORY";
export type SQLITE_JOURNAL_WAL = "WAL";
export type SQLITE_JOURNAL_OFF = "OFF";

export type SQLITE_JOURNAL_ALL = SQLITE_JOURNAL_DELETE | SQLITE_JOURNAL_TRUNCATE | SQLITE_JOURNAL_PERSIST | SQLITE_JOURNAL_MEMORY | SQLITE_JOURNAL_WAL | SQLITE_JOURNAL_OFF;

export const SQLITE_JOURNAL_DELETE : SQLITE_JOURNAL_DELETE = "DELETE";
export const SQLITE_JOURNAL_TRUNCATE : SQLITE_JOURNAL_TRUNCATE = "TRUNCATE";
export const SQLITE_JOURNAL_PERSIST : SQLITE_JOURNAL_PERSIST = "PERSIST";
export const SQLITE_JOURNAL_MEMORY : SQLITE_JOURNAL_MEMORY = "MEMORY";
export const SQLITE_JOURNAL_WAL : SQLITE_JOURNAL_WAL = "WAL";
export const SQLITE_JOURNAL_OFF : SQLITE_JOURNAL_OFF = "OFF";

// PRAGMA schema.synchronous = 0 | OFF | 1 | NORMAL | 2 | FULL | 3 | EXTRA;
export type SQLITE_SYNCHRONOUS_0 = "0";
export type SQLITE_SYNCHRONOUS_OFF = "OFF";
export type SQLITE_SYNCHRONOUS_1 = "1";
export type SQLITE_SYNCHRONOUS_NORMAL = "NORMAL";
export type SQLITE_SYNCHRONOUS_2 = "2";
export type SQLITE_SYNCHRONOUS_FULL = "FULL";
export type SQLITE_SYNCHRONOUS_3 = "3";
export type SQLITE_SYNCHRONOUS_EXTRA = "EXTRA";

export type SQLITE_SYNCHRONOUS_ALL = SQLITE_SYNCHRONOUS_0 | SQLITE_SYNCHRONOUS_OFF | SQLITE_SYNCHRONOUS_1 | SQLITE_SYNCHRONOUS_NORMAL | SQLITE_SYNCHRONOUS_2 | SQLITE_SYNCHRONOUS_FULL | SQLITE_SYNCHRONOUS_3 | SQLITE_SYNCHRONOUS_EXTRA;

export const SQLITE_SYNCHRONOUS_0 : SQLITE_SYNCHRONOUS_0 = "0";
export const SQLITE_SYNCHRONOUS_OFF : SQLITE_SYNCHRONOUS_OFF = "OFF";
export const SQLITE_SYNCHRONOUS_1 : SQLITE_SYNCHRONOUS_1 = "1";
export const SQLITE_SYNCHRONOUS_NORMAL : SQLITE_SYNCHRONOUS_NORMAL = "NORMAL";
export const SQLITE_SYNCHRONOUS_2 : SQLITE_SYNCHRONOUS_2 = "2";
export const SQLITE_SYNCHRONOUS_FULL : SQLITE_SYNCHRONOUS_FULL = "FULL";
export const SQLITE_SYNCHRONOUS_3 : SQLITE_SYNCHRONOUS_3 = "3";
export const SQLITE_SYNCHRONOUS_EXTRA : SQLITE_SYNCHRONOUS_EXTRA = "EXTRA";