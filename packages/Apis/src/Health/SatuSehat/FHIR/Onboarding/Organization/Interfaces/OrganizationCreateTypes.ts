/**
 * ApidogModel
 */
export interface OrganizationCreateModel {
    active: boolean;
    address: OrganizationCreateModelAddress[];
    entry: Entry[];
    identifier: OrganizationCreateModelApidogModelIdentifier[];
    name: string;
    partOf: OrganizationCreateModelPartOf;
    resourceType: "Organization";
    telecom: OrganizationCreateModelTelecom[];
    type: ApidogModelType[];
}

export interface OrganizationCreateModelAddress {
    city?: string;
    country?: string;
    extension?: OrganizationCreateModelAddressExtension[];
    line?: string[];
    postalCode?: string;
    type?: string;
    use?: string;
}

export interface OrganizationCreateModelAddressExtension {
    extension?: OrganizationCreateModelExtensionExtension[];
    url?: string;
}

export interface OrganizationCreateModelExtensionExtension {
    url: string;
    valueCode: string;
}

export interface Entry {
    fullUrl: string;
    request: OrganizationCreateModelRequest;
    resource: OrganizationCreateModelResource;
}

export interface OrganizationCreateModelRequest {
    method: string;
    url: string;
}

export interface OrganizationCreateModelResource {
    category: OrganizationCreateModelCategory[];
    class?: OrganizationCreateModelClass;
    clinicalStatus: OrganizationCreateModelClinicalStatus;
    code: OrganizationCreateModelCode;
    diagnosis?: OrganizationCreateModelDiagnosis[];
    encounter: OrganizationCreateModelEncounter;
    identifier?: OrganizationCreateModelResourceIdentifier[];
    location?: OrganizationCreateModelLocationElement[];
    participant?: OrganizationCreateModelParticipant[];
    period?: OrganizationCreateModelResourcePeriod;
    resourceType: string;
    serviceProvider?: OrganizationCreateModelServiceProvider;
    status?: string;
    statusHistory?: OrganizationCreateModelStatusHistory[];
    subject: OrganizationCreateModelSubject;

}

export interface OrganizationCreateModelCategory {
    coding: OrganizationCreateModelCategoryCoding[];
}

export interface OrganizationCreateModelCategoryCoding {
    code: string;
    display: string;
    system: string;
}

export interface OrganizationCreateModelClass {
    code: string;
    display: string;
    system: string;
}

export interface OrganizationCreateModelClinicalStatus {
    coding: OrganizationCreateModelClinicalStatusCoding[];
}

export interface OrganizationCreateModelClinicalStatusCoding {
    code: string;
    display: string;
    system: string;
}

export interface OrganizationCreateModelCode {
    coding: OrganizationCreateModelCodeCoding[];
}

export interface OrganizationCreateModelCodeCoding {
    code: string;
    display: string;
    system: string;
}

export interface OrganizationCreateModelDiagnosis {
    condition: OrganizationCreateModelCondition;
    rank: number;
    use: OrganizationCreateModelUse;
}

export interface OrganizationCreateModelCondition {
    display: string;
    reference: string;
}

export interface OrganizationCreateModelUse {
    coding: OrganizationCreateModelUseCoding[];
}

export interface OrganizationCreateModelUseCoding {
    code: string;
    display: string;
    system: string;
}

export interface OrganizationCreateModelEncounter {
    display: string;
    reference: string;
}

export interface OrganizationCreateModelResourceIdentifier {
    system?: string;
    value?: string;
}

export interface OrganizationCreateModelLocationElement {
    location?: OrganizationCreateModelLocationLocation;
}

export interface OrganizationCreateModelLocationLocation {
    display: string;
    reference: string;
}

export interface OrganizationCreateModelParticipant {
    individual?: OrganizationCreateModelIndividual;
    type?: OrganizationCreateModelParticipantType[];
}

export interface OrganizationCreateModelIndividual {
    display: string;
    reference: string;
}

export interface OrganizationCreateModelParticipantType {
    coding?: OrganizationCreateModelPurpleCoding[];
}

export interface OrganizationCreateModelPurpleCoding {
    code?: string;
    display?: string;
    system?: string;
}

export interface OrganizationCreateModelResourcePeriod {
    end: string;
    start: string;
}

export interface OrganizationCreateModelServiceProvider {
    reference: string;
}

export interface OrganizationCreateModelStatusHistory {
    period: OrganizationCreateModelStatusHistoryPeriod;
    status: string;
}

export interface OrganizationCreateModelStatusHistoryPeriod {
    end: string;
    start: string;
}

export interface OrganizationCreateModelSubject {
    display: string;
    reference: string;
}

export interface OrganizationCreateModelApidogModelIdentifier {
    system?: string;
    use?: string;
    value?: string;
}

export interface OrganizationCreateModelPartOf {
    reference: string;
}

export interface OrganizationCreateModelTelecom {
    system: string;
    use: string;
    value: string;
}

export interface ApidogModelType {
    coding?: OrganizationCreateModelFluffyCoding[];
}

export interface OrganizationCreateModelFluffyCoding {
    code?: string;
    display?: string;
    system?: string;
}
