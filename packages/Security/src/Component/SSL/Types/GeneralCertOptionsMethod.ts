import exp from "constants";
import {RSAKeyPairOptions} from "crypto";
import {
    CertExtensionsAuthorityKeyIdentifier,
    CertExtensionsBasicConstraints, CertExtensionsExtKeyUsage,
    CertExtensionsKeyUsageCA, CertExtensionsKeyUsageCert,
    CertExtensionsNSCertType, CertExtensionsSubjectAltName,
    CertExtensionsSubjectKeyIdentifier
} from "./CertExtensions";
import {pki} from "node-forge";


export interface generateCACertificateFieldsDataAsShort {
    shortName ?: "CN" | "L" | "ST" | "O" | "OU" | "C";
    value ?: any[] | string | undefined;
    extensions?: any[] | undefined;
}
export interface generateCACertificateFieldsDataAsLong {
    name : "commonName" | "countryName" | "localityName" | "organizationName" | "stateOrProvinceName" | "organizationalUnitName" | "serialNumber" | "streetAddress"
    value ?: any[] | string | undefined;
    extensions?: any[] | undefined;
}

export type generateCASettingsFields = Array<generateCACertificateFieldsDataAsLong | generateCACertificateFieldsDataAsShort>


export interface generateCASettingsKeys extends KeyPairsData {

}

export interface generateCASettingsOptions {
    expiresYears ?: number | undefined,
    passphrase ?: string,
    extensions ?: Array<CertExtensionsBasicConstraints | CertExtensionsKeyUsageCA>
}
export interface generateCASettings {
    keys : generateCASettingsKeys;
    options ?: generateCASettingsOptions;
    attrs : generateCASettingsFields;
}


export interface generateCertSettingsKeys extends KeyPairsData {

}


export interface generateCertFieldsDataAsShort {
    shortName ?: "CN" | "L" | "ST" | "O" | "OU" | "C";
    value ?: any[] | string | undefined;
    extensions?: any[] | undefined;
}
export interface generateCertFieldsDataAsLong {
    name : "commonName" | "countryName" | "localityName" | "organizationName" | "stateOrProvinceName" | "organizationalUnitName" | "serialNumber" | "streetAddress" | "challengePassword" | "extensionRequest"
    value ?: any[] | string | undefined;
    extensions?: any[] | undefined;
}

export type generateCertSettingsFields = Array<generateCertFieldsDataAsLong | generateCertFieldsDataAsShort>



export type generateCertSettingsExtensions = Array<
    CertExtensionsBasicConstraints |
    CertExtensionsKeyUsageCert |
    CertExtensionsNSCertType |
    CertExtensionsSubjectKeyIdentifier |
    CertExtensionsAuthorityKeyIdentifier |
    CertExtensionsExtKeyUsage |
    CertExtensionsSubjectAltName
>;

export interface generateCertSettings {
    keys : generateCASettingsKeys;
    subject : generateCertSettingsFields;
    expiresYears ?: number | undefined;
    extensions ?: generateCertSettingsExtensions
}



export interface KeyPairsData {
    privateKey : string,
    publicKey : string,
    encrypted ?: boolean
}

export interface CertificateAuthorityDataPrivate {
    pem : string,
    rsa : pki.rsa.PrivateKey
}

export interface CertificateAuthorityDataPublic {
    pem : string,
    rsa : pki.rsa.PublicKey
}

export interface CertificateAuthorityDataCert {
    pem : string,
    rsa : pki.Certificate
}

export interface CertificateAuthorityDataValidity {
    notBefore : string,
    notAfter : string
}
export interface CertificateAuthorityData {
    certificate : CertificateAuthorityDataCert,
    privateKey : CertificateAuthorityDataPrivate,
    publicKey : CertificateAuthorityDataPublic;
    validity : CertificateAuthorityDataValidity
}



export interface CertificateDataCert {
    pem : string,
    rsa : pki.Certificate
}

export interface CertificateDataPrivate {
    pem : string,
    rsa : pki.rsa.PrivateKey
}

export interface CertificateDataPublic {
    pem : string,
    rsa : pki.rsa.PublicKey
}

export interface CertificateDataValidity {
    notBefore : string,
    notAfter : string
}

export interface CertificateData {
    certificate : CertificateDataCert,
    privateKey : CertificateDataPrivate,
    publicKey : CertificateDataPublic;
    validity : CertificateDataValidity
}

export interface GenerateKeys extends RSAKeyPairOptions<"pem", "pem"> {

}

