
/**
 * ApidogModel
 */
export interface OrganizationUpdateModel {
    active: boolean;
    address: OrganizationUpdateAddress[];
    entry: OrganizationUpdateEntry[];
    id: string;
    identifier: OrganizationUpdateIdentifier[];
    name: string;
    partOf: OrganizationUpdatePartOf;
    resourceType: string;
    telecom: OrganizationUpdateTelecom[];
    type: OrganizationUpdateType[];
}

export interface OrganizationUpdateAddress {
    city?: string;
    country?: string;
    extension?: OrganizationUpdateAddressExtension[];
    line?: string[];
    postalCode?: string;
    type?: string;
    use?: string;
}

export interface OrganizationUpdateAddressExtension {
    extension?: OrganizationUpdateExtensionExtension[];
    url?: string;
}

export interface OrganizationUpdateExtensionExtension {
    url: string;
    valueCode: string;
}

export interface OrganizationUpdateEntry {
    fullUrl: string;
    request: OrganizationUpdateRequest;
    resource: OrganizationUpdateResource;
}

export interface OrganizationUpdateRequest {
    method: string;
    url: string;
}

export interface OrganizationUpdateResource {
    category: OrganizationUpdateCategory[];
    class?: OrganizationUpdateClass;
    clinicalStatus: OrganizationUpdateClinicalStatus;
    code: OrganizationUpdateCode;
    diagnosis?: OrganizationUpdateDiagnosis[];
    encounter: OrganizationUpdateEncounter;
    identifier?: OrganizationUpdateResourceIdentifier[];
    location?: OrganizationUpdateLocationElement[];
    participant?: OrganizationUpdateParticipant[];
    period?: OrganizationUpdateResourcePeriod;
    resourceType: string;
    serviceProvider?: OrganizationUpdateServiceProvider;
    status?: string;
    statusHistory?: OrganizationUpdateStatusHistory[];
    subject: OrganizationUpdateSubject;
}

export interface OrganizationUpdateCategory {
    coding: OrganizationUpdateCategoryCoding[];
}

export interface OrganizationUpdateCategoryCoding {
    code: string;
    display: string;
    system: string;
}

export interface OrganizationUpdateClass {
    code: string;
    display: string;
    system: string;
}

export interface OrganizationUpdateClinicalStatus {
    coding: OrganizationUpdateClinicalStatusCoding[];
}

export interface OrganizationUpdateClinicalStatusCoding {
    code: string;
    display: string;
    system: string;
}

export interface OrganizationUpdateCode {
    coding: OrganizationUpdateCodeCoding[];
}

export interface OrganizationUpdateCodeCoding {
    code: string;
    display: string;
    system: string;
}

export interface OrganizationUpdateDiagnosis {
    condition: OrganizationUpdateCondition;
    rank: number;
    use: OrganizationUpdateUse;
}

export interface OrganizationUpdateCondition {
    display: string;
    reference: string;
}

export interface OrganizationUpdateUse {
    coding: OrganizationUpdateUseCoding[];
}

export interface OrganizationUpdateUseCoding {
    code: string;
    display: string;
    system: string;
}

export interface OrganizationUpdateEncounter {
    display: string;
    reference: string;
}

export interface OrganizationUpdateResourceIdentifier {
    system?: string;
    value?: string;
}

export interface OrganizationUpdateLocationElement {
    location?: OrganizationUpdateLocationLocation;
}

export interface OrganizationUpdateLocationLocation {
    display: string;
    reference: string;
    [property: string]: any;
}

export interface OrganizationUpdateParticipant {
    individual?: OrganizationUpdateIndividual;
    type?: OrganizationUpdateParticipantType[];
    [property: string]: any;
}

export interface OrganizationUpdateIndividual {
    display: string;
    reference: string;
}

export interface OrganizationUpdateParticipantType {
    coding?: OrganizationUpdatePurpleCoding[];
}

export interface OrganizationUpdatePurpleCoding {
    code?: string;
    display?: string;
    system?: string;
}

export interface OrganizationUpdateResourcePeriod {
    end: string;
    start: string;
}

export interface OrganizationUpdateServiceProvider {
    reference: string;
}

export interface OrganizationUpdateStatusHistory {
    period: OrganizationUpdateStatusHistoryPeriod;
    status: string;
}

export interface OrganizationUpdateStatusHistoryPeriod {
    end: string;
    start: string;
}

export interface OrganizationUpdateSubject {
    display: string;
    reference: string;
}

export interface OrganizationUpdateIdentifier {
    system?: string;
    use?: string;
    value?: string;
}

export interface OrganizationUpdatePartOf {
    reference: string;
}

export interface OrganizationUpdateTelecom {
    system: string;
    use: string;
    value: string;
}

export interface OrganizationUpdateType {
    coding?: OrganizationUpdateFluffyCoding[];
}

export interface OrganizationUpdateFluffyCoding {
    code?: string;
    display?: string;
    system?: string;
}
