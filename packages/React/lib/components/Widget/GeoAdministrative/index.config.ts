import {GeoAdministrativeConfig, GeoAdministrativeConfigURL} from "./index.types.ts";
import {GeoAdministrativeType} from "./index.enum.ts";


/**
 * eslint-disable-next-line @typescript-eslint/ban-ts-comment
 * @ts-expect-error
 */
export const GeoAdministrativeDefaultConfig : GeoAdministrativeConfig = {
    type : GeoAdministrativeType.FIREBASE_DATABASE
}

export const GeoAdministrativeDefaultConfigURL : GeoAdministrativeConfigURL = {
    type : GeoAdministrativeType.URL,
    host : "https://raw.githubusercontent.com/YovanggaAnandhika",
    endpoint : {
        province : "/GeoAdministrativeIndonesiaJson/main/provinces.json",
        regency : "/GeoAdministrativeIndonesiaJson/main/regencies.json",
        district : "/GeoAdministrativeIndonesiaJson/main/districts.json",
        village : "/GeoAdministrativeIndonesiaJson/main/villages.json"
    }
}