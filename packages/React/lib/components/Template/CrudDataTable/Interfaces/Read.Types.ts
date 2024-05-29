/**
 *  Fungsi Untuk melakukan baca Data di dalam Api data master Untuk table data read
 *
 *  @corporation PT. Oxy Technolofgi management
 *  @Author Yovangga anandhika hadi putra
 *
 */

/**
 * Fungsi Untuk melakukan deklarasi Enum Di dalam variable method Endpoint data Rest Api Untuk Modeling data
 */
 export enum METHOD {
     GET,
     POST,
     PUT,
     OPTIONS,
     DELETE
}


export interface ReadTypes {
    endpoint : string | undefined,
    method : METHOD,

}