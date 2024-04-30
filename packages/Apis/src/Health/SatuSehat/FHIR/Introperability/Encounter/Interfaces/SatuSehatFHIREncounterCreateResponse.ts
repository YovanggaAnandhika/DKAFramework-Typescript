

/**
 * Request
 */
export interface SatuSehatFHIREncounterCreateRequest {
    class: SatuSehatFHIREncounterCreateClass;
    id: string;
    identifier: SatuSehatFHIREncounterCreateIdentifier[];
    location: SatuSehatFHIREncounterCreateLocationElement[];
    meta: SatuSehatFHIREncounterCreateMeta;
    participant: SatuSehatFHIREncounterCreateParticipant[];
    period: SatuSehatFHIREncounterCreateRequestPeriod;
    resourceType: string;
    serviceProvider: SatuSehatFHIREncounterCreateServiceProvider;
    status: string;
    statusHistory: SatuSehatFHIREncounterCreateStatusHistory[];
    subject: SatuSehatFHIREncounterCreateSubject;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateClass {
    code: string;
    display: string;
    system: string;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateIdentifier {
    system?: string;
    value?: string;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateLocationElement {
    location?: SatuSehatFHIREncounterCreateLocationLocation;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateLocationLocation {
    display: string;
    reference: string;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateMeta {
    lastUpdated: string;
    versionId: string;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateParticipant {
    individual?: SatuSehatFHIREncounterCreateIndividual;
    type?: SatuSehatFHIREncounterCreateType[];
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateIndividual {
    display: string;
    reference: string;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateType {
    coding?: SatuSehatFHIREncounterCreateCoding[];
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateCoding {
    code?: string;
    display?: string;
    system?: string;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateRequestPeriod {
    start: string;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateServiceProvider {
    reference: string;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateStatusHistory {
    period?: SatuSehatFHIREncounterCreateStatusHistoryPeriod;
    status?: string;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateStatusHistoryPeriod {
    start: string;
    [property: string]: any;
}

export interface SatuSehatFHIREncounterCreateSubject {
    display: string;
    reference: string;
    [property: string]: any;
}
