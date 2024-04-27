import {
    SatuSehatMasterPatientCallbackEntry,
    SatuSehatMasterPatientCallbackIdentifier,
    SatuSehatMasterPatientCallbackRequest
} from "./MasterPatientGetCallback";
import exp from "constants";


type oneToNine = 1|2|3|4|5|6|7|8|9
type zeroToNine = 0|1|2|3|4|5|6|7|8|9
/**
 * Years
 */
type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
/**
 * Months
 */
type MM = `0${oneToNine}` | `1${0|1|2}`
/**
 * Days
 */
type DD = `${0}${oneToNine}` | `${1|2}${zeroToNine}` | `3${0|1}`
/**
 * YYYYMMDD
 */
export type RawDateString = `${YYYY}-${MM}-${DD}`;

export interface MasterPatientByNikAddress {
    use ?: string,
    line ?: string,
    city ?: string,
    postalCode ?: string;
    country ?: string;
    extension ?: string;
}

export interface MasterPatientByNikAddressExtention {
    province : number,
    city : number
    district : number
    village : number;
    rw : string | number;
    rt : string | number;
}

export interface MasterPatientQueryWithNik {
    identifier : number,
    name : string,
    birthDate : RawDateString,
    birthPlace ?: string,
    gender : "male" | "female",
    "Nomor Kartu Keluarga" ?: string,
    address : MasterPatientByNikAddress,
    "address-extension" : MasterPatientByNikAddressExtention;
    telecom : string;
    maritalStatus : "S" | "M" | "W" | "D",
    citizenshipStatus : "WNI" | "WNA"
}

export interface MasterPatientQueryGetterPersonal {
    identifier ?: number
}

export interface MasterPatientQueryGetterNewBorn{
    identifier ?: number,
    name ?: string;
    birthDate ?: RawDateString,
    gender ?: "male" | "female"
}

export interface MasterPatientQueryInserter {
    resourceType : "Patient",
    identifier : SatuSehatMasterPatientCallbackIdentifier[],
    name : string,
    birthDate : RawDateString,
}

export type MasterPationGetterAction = "personal" | "newBorn";

export type CheckedPatientActionGetter<action extends MasterPationGetterAction> = action extends "personal" ? MasterPatientQueryGetterPersonal : MasterPatientQueryGetterNewBorn;


export interface SatuSehatCallbackGetter {
    status : boolean,
    code : number,
    msg : string
}

export interface SatuSehatMasterPatientCallback extends SatuSehatCallbackGetter {
    data : SatuSehatMasterPatientCallbackRequest
}
