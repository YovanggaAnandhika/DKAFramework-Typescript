

export interface CertExtensionsBasicConstraints {
    name : "basicConstraints",
    cA : boolean
}

export interface CertExtensionsKeyUsageCA {
    name : "keyUsage",
    keyCertSign ?: boolean,
    cRLSign ?: boolean
}

export interface CertExtensionsKeyUsageCert {
    name: 'keyUsage',
    digitalSignature ?: boolean,
    nonRepudiation ?: boolean,
    keyEncipherment ?: boolean
}

export interface CertExtensionsNSCertType {
    name : "nsCertType",
    server : boolean
}

export interface CertExtensionsSubjectKeyIdentifier {
    name: "subjectKeyIdentifier"
}

export interface CertExtensionsAuthorityKeyIdentifier {
    name: "authorityKeyIdentifier",
    authorityCertIssuer : boolean,
    serialNumber ?: string
}

export interface CertExtensionsExtKeyUsage {
    name: "extKeyUsage",
    serverAuth: boolean
}

export interface CertExtensionsSubjectAltNameTypes {
    type : 2 | 7,
    value : string
}
export interface CertExtensionsSubjectAltName {
    name : "subjectAltName",
    altNames : Array<CertExtensionsSubjectAltNameTypes>
}