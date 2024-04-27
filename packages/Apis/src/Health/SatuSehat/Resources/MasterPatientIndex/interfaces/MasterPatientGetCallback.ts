/**
 * Request
 */
export interface SatuSehatMasterPatientCallbackRequest {
    entry: SatuSehatMasterPatientCallbackEntry[];
    link: SatuSehatMasterPatientCallbackRequestLink[];
    resourceType: string;
    total: number;
    type: string;
}

export interface SatuSehatMasterPatientCallbackEntry {
    fullUrl: string;
    resource : SatuSehatMasterPatientCallbackResource;
}

export interface SatuSehatMasterPatientCallbackResource {
    active: boolean;
    id: string;
    identifier: SatuSehatMasterPatientCallbackIdentifier[];
    link: SatuSehatMasterPatientCallbackResourceLink[];
    meta: SatuSehatMasterPatientCallbackMeta;
    name: SatuSehatMasterPatientCallbackName[];
    resourceType: string;
}

export interface SatuSehatMasterPatientCallbackIdentifier {
    system: string;
    use: string;
    value: string;
}

export interface SatuSehatMasterPatientCallbackResourceLink {
    other?: SatuSehatMasterPatientCallbackOther;
    type?: string;

}

export interface SatuSehatMasterPatientCallbackOther {
    reference: string;

}

export interface SatuSehatMasterPatientCallbackMeta {
    lastUpdated: string;
    profile: string[];
    versionId: string;
}

export interface SatuSehatMasterPatientCallbackName {
    text?: string;
    use?: string;
}

export interface SatuSehatMasterPatientCallbackRequestLink {
    relation: string;
    url: string;
}
