

// @ts-ignore
import {GeoAdministrativeType} from "./index.enum.ts";

// @ts-ignore
export type onChangeEventAutoCompleteTypes = (event ?: React.SyntheticEvent, value: any, reason: string, details?: string | any) => void;


export interface GeoAdministrativeModels {
    province ?: any
    regency ?: any
    district ?: any,
    village ?: any
}

export interface GeoAdministrativeConfigURL {
    type : GeoAdministrativeType.URL,
    province : string;
    regency : string
    district : string,
    village : string
}

export interface GeoAdministrativeConfigLocal {
    type : GeoAdministrativeType.LOCAL,
    province : Array< { id : string, name : string } >;
    regency : Array< { id : string, province_id : string, name : string } >;
    district : Array< { id : string, regency_id : string, name : string } >;
    village : Array< { id : string, district_id: string, name : string } >;

}

export type GeoAdministrativeConfig = GeoAdministrativeConfigURL | GeoAdministrativeConfigLocal;

export interface GeoAdministrativeSelectionProps {
    defaultValue ?: GeoAdministrativeModels;
    config ?: GeoAdministrativeConfig;
    onChange ?: (data : GeoAdministrativeModels) => void
}