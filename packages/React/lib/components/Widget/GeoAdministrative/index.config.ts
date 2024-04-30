import {GeoAdministrativeConfig} from "./index.types.ts";
import {GeoAdministrativeType} from "./index.enum.ts";
import Province from "./data/provinces.json";
import Regencies from "./data/regencies.json";
import Districts from "./data/districts.json";
import Villages from "./data/villages.json";


export const GeoAdministrativeDefaultConfig : GeoAdministrativeConfig = {
    type : GeoAdministrativeType.LOCAL,
    province : Province,
    regency : Regencies,
    district : Districts,
    village : Villages
}