import {RawDateString} from "./MasterPatientIndex";

/**
 * Request
 */
export interface SatuSehatPatientModelInsertRequest {
    identifier ?: SatuSehatPatientModelInsertIdentifier[];
    active ?: boolean;
    address ?: SatuSehatPatientModelInsertAddress[];
    birthDate ?: RawDateString;
    communication?: SatuSehatPatientModelInsertCommunication[];
    contact?: Contact[];
    extension?: RequestExtension[];
    gender?: "male" | "female";
    maritalStatus ?: SatuSehatPatientModelInsertMaritalStatus;
    meta ?: SatuSehatPatientModelInsertMeta;
    multipleBirthInteger?: number;
    name ?: SatuSehatPatientModelInsertNameElement[];
    resourceType ?: "Patient";
    telecom ?: SatuSehatPatientModelInsertRequestTelecom[];
}

export interface SatuSehatPatientModelInsertAddress {
    city?: string;
    country?: string;
    extension?: SatuSehatPatientModelInsertAddressExtension[];
    line?: string[];
    postalCode?: string;
    use?: string;
}

export interface SatuSehatPatientModelInsertAddressExtension {
    extension?: SatuSehatPatientModelInsertExtensionExtension[];
    url?: string;
}

export interface SatuSehatPatientModelInsertExtensionExtension {
    url: string;
    valueCode: string;
}

export interface SatuSehatPatientModelInsertCommunication {
    language?: SatuSehatPatientModelInsertLanguage;
    preferred?: boolean;

}

export interface SatuSehatPatientModelInsertLanguage {
    coding: SatuSehatPatientModelInsertLanguageCoding[];
    text: string;

}

export interface SatuSehatPatientModelInsertLanguageCoding {
    code?: string;
    display?: string;
    system?: string;

}

export interface Contact {
    name?: ContactName;
    relationship?: SatuSehatPatientModelInsertRelationship[];
    telecom?: SatuSehatPatientModelInsertContactTelecom[];

}

export interface ContactName {
    text: string;
    use: string;

}

export interface SatuSehatPatientModelInsertRelationship {
    coding?: SatuSehatPatientModelInsertRelationshipCoding[];

}

export interface    SatuSehatPatientModelInsertRelationshipCoding {
    code?: string;
    system?: string;

}

export interface SatuSehatPatientModelInsertContactTelecom {
    system?: string;
    use?: string;
    value?: string;

}

export interface RequestExtension {
    url: string;
    valueAddress?: SatuSehatPatientModelInsertValueAddress;
    valueCode?: string;

}

export interface SatuSehatPatientModelInsertValueAddress {
    city: string;
    country: string;

}

export interface SatuSehatPatientModelInsertIdentifier {
    system: string;
    use: string;
    value: string;

}

export interface SatuSehatPatientModelInsertMaritalStatus {
    coding: SatuSehatPatientModelInsertMaritalStatusCoding[];
    text: string;

}

export interface SatuSehatPatientModelInsertMaritalStatusCoding {
    code?: string;
    display?: string;
    system?: string;

}

export interface SatuSehatPatientModelInsertMeta {
    profile: string[];

}

export interface SatuSehatPatientModelInsertNameElement {
    text?: string;
    use?: string;

}

export interface SatuSehatPatientModelInsertRequestTelecom {
    system: string;
    use: string;
    value: string;

}
