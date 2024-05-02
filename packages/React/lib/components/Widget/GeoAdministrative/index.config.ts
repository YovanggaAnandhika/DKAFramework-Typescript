import {GeoAdministrativeConfig} from "./index.types.ts";
import {GeoAdministrativeType} from "./index.enum.ts";
import Province from "./data/provinces.json";
import Regencies from "./data/regencies.json";
import Districts from "./data/districts.json";
import Villages from "./data/villages.json";



/**
 * eslint-disable-next-line @typescript-eslint/ban-ts-comment
 * @ts-expect-error
 */
export const GeoAdministrativeDefaultConfig : GeoAdministrativeConfig = {
    type : GeoAdministrativeType.LOCAL,
    province : Province,
    regency : Regencies,
    district : Districts,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    village : Villages
}