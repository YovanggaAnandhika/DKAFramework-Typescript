import {RSAKeyPairOptions} from "crypto";
import {
    CertExtensionsAuthorityKeyIdentifier,
    CertExtensionsBasicConstraints,
    CertExtensionsExtKeyUsage,
    CertExtensionsKeyUsageCA,
    CertExtensionsKeyUsageCert,
    CertExtensionsNSCertType,
    CertExtensionsSubjectAltName,
    CertExtensionsSubjectKeyIdentifier
} from "./CertExtensions";
import {md, pki} from "node-forge";


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
    digest ?: md.MessageDigest | undefined;
    extensions ?: Array<CertExtensionsBasicConstraints | CertExtensionsKeyUsageCA | CertExtensionsSubjectAltName>
}
export interface generateCASettings {
    keys : generateCASettingsKeys;
    options ?: generateCASettingsOptions;
    attrs : generateCASettingsFields;
}


export type generateCSRSettingsSubjectFields = Array<generateCACertificateFieldsDataAsLong | generateCACertificateFieldsDataAsShort>
export type generateCSRSettingsAttrsFields = Array<generateCACertificateFieldsDataAsLong | generateCACertificateFieldsDataAsShort>

export interface generateCSRSettingsKeys extends KeyPairsData {

}

export interface generateCSRSettingsOptions {
    passphrase ?: string,
    digest ?: md.MessageDigest | undefined;
}

export interface GenerateCSRSettings {
    keys : generateCSRSettingsKeys;
    options ?: generateCSRSettingsOptions;
    subject ?: generateCSRSettingsSubjectFields;
    attrs ?: generateCSRSettingsAttrsFields;
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
    digest ?: md.MessageDigest | undefined;
    expiresYears ?: number | undefined;
    passphrase ?: string | undefined;
    extensions ?: generateCertSettingsExtensions
}



export interface KeyPairsData {
    privateKey: string,
    publicKey: string
}

export interface CertificateAuthorityDataValidity {
    notBefore : string,
    notAfter : string
}
export interface CertificateAuthorityDataDetails {
    certificate : string,
    validity ?: CertificateAuthorityDataValidity | undefined
}

export type CertificateAuthorityData = CertificateAuthorityDataDetails

export interface CertificateRequestDataDetail {
    certificateRequest : string
}

export type CertificateRequestData = CertificateRequestDataDetail;

export interface CertificateAuthorityRaw {
    certificate : string,
    privateKey : string,
    passphrase ?: string
}
export type CertificateAuthority = CertificateAuthorityRaw

export interface CertificateDataValidity {
    notBefore : string,
    notAfter : string
}

export interface CertificateData {
    certificate ?: string,
    validity ?: CertificateDataValidity;
}
export interface CertificateComparisonString {
    parent : string,
    child : string
}

export interface CertificateComparisonCert {
    parent : pki.Certificate,
    child : pki.Certificate
}

export type CertificateParentData = CertificateComparisonString | CertificateComparisonCert;
export interface GenerateKeys extends RSAKeyPairOptions<"pem", "pem"> {

}

