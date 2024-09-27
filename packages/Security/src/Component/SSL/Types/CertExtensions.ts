

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
    keyEncipherment ?: boolean,
    dataEncipherment ?: boolean
}

export interface CertExtensionsNSCertType {
    name : "nsCertType",
    server?: boolean,
    client?: boolean,
    email?: boolean,
    objsign?: boolean,
    sslCA?: boolean,
    emailCA?: boolean,
    objCA?: boolean
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
    serverAuth?: boolean,
    clientAuth?: boolean,
    codeSigning?: boolean,
    emailProtection?: boolean,
    timeStamping?: boolean
}

export interface CertExtensionsSubjectAltNameTypesDNS {
    type : 2,
    value : string
}
export interface CertExtensionsSubjectAltNameTypesIP {
    type : 7,
    ip : string
}
export interface CertExtensionsSubjectAltName {
    name : "subjectAltName",
    altNames : Array<CertExtensionsSubjectAltNameTypesDNS | CertExtensionsSubjectAltNameTypesIP>
}