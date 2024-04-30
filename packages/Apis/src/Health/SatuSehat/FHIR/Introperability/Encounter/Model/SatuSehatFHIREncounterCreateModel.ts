/**
 * Request
 */
export interface SatuSehatFHIREncounterCreateModel {
    class ?: SatuSehatFHIREncounterCreateModelClass;
    id ?: string;
    identifier ?: SatuSehatFHIREncounterCreateModelIdentifier[];
    location?: SatuSehatFHIREncounterCreateModelLocationElement[];
    meta?: SatuSehatFHIREncounterCreateModelMeta;
    participant?: SatuSehatFHIREncounterCreateModelParticipant[];
    period?: SatuSehatFHIREncounterCreateModelRequestPeriod;
    resourceType?: "Encounter";
    serviceProvider?: SatuSehatFHIREncounterCreateModelServiceProvider;
    status?: string;
    statusHistory?: SatuSehatFHIREncounterCreateModelStatusHistory[];
    subject?: SatuSehatFHIREncounterCreateModelSubject;

}

export interface SatuSehatFHIREncounterCreateModelClass {
    code: string;
    display: string;
    system: string;

}

export interface SatuSehatFHIREncounterCreateModelIdentifier {
    system?: string;
    value?: string;

}

export interface SatuSehatFHIREncounterCreateModelLocationElement {
    location?: SatuSehatFHIREncounterCreateModelLocationLocation;

}

export interface SatuSehatFHIREncounterCreateModelLocationLocation {
    display: string;
    reference: string;

}

export interface SatuSehatFHIREncounterCreateModelMeta {
    lastUpdated: string;
    versionId: string;

}

export interface SatuSehatFHIREncounterCreateModelParticipant {
    individual?: SatuSehatFHIREncounterCreateModelIndividual;
    type?: SatuSehatFHIREncounterCreateModelType[];

}

export interface SatuSehatFHIREncounterCreateModelIndividual {
    display: string;
    reference: string;

}

export interface SatuSehatFHIREncounterCreateModelType {
    coding?: SatuSehatFHIREncounterCreateModelCoding[];

}

export interface SatuSehatFHIREncounterCreateModelCoding {
    code?: string;
    display?: string;
    system?: string;

}

export interface SatuSehatFHIREncounterCreateModelRequestPeriod {
    start: string;

}

export interface SatuSehatFHIREncounterCreateModelServiceProvider {
    reference: string;

}

export interface SatuSehatFHIREncounterCreateModelStatusHistory {
    period?: SatuSehatFHIREncounterCreateModelStatusHistoryPeriod;
    status?: string;

}

export interface SatuSehatFHIREncounterCreateModelStatusHistoryPeriod {
    start: string;

}

export interface SatuSehatFHIREncounterCreateModelSubject {
    display: string;
    reference: string;

}
