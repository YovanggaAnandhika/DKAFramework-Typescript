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


export interface generateCSRSettingsAttrsFieldsExtensionRequestSubjectAltNamesDNS {
    type : 2,
    value : string
}

export interface generateCSRSettingsAttrsFieldsExtensionRequestSubjectAltNamesIP {
    type : 7,
    ip : string
}

export interface generateCSRSettingsAttrsFieldsExtensionRequestSubjectAltNames {
    name : "subjectAltName",
    altNames : Array<generateCSRSettingsAttrsFieldsExtensionRequestSubjectAltNamesIP | generateCSRSettingsAttrsFieldsExtensionRequestSubjectAltNamesDNS>
}

export interface generateCSRSettingsAttrsFieldsChallengePassword {
    name : "challengePassword",
    value : string
}

export interface generateCSRSettingsAttrsFieldsExtensionRequest{
    name : "extensionRequest",
    extensions : Array<generateCSRSettingsAttrsFieldsExtensionRequestSubjectAltNames>
}

export type generateCSRSettingsAttrsFields = Array<generateCSRSettingsAttrsFieldsExtensionRequest | generateCSRSettingsAttrsFieldsChallengePassword>

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


export interface generateCertSettingsKeys extends KeyPairsData {}


export interface generateCertFieldsDataAsShort {
    shortName ?: "CN" | "L" | "ST" | "O" | "OU" | "C";
    value ?: any[] | string | undefined;
    extensions?: any[] | undefined;
}
export interface generateCertFieldsDataAsLong {
    name : "commonName" | "countryName" | "localityName" | "organizationName" | "stateOrProvinceName" | "organizationalUnitName" | "serialNumber" | "streetAddress" | "challengePassword" | "extensionRequest"
    value ?: any[] | string | undefined;
}

export type generateCertSettingsFields = Array<generateCertFieldsDataAsLong | generateCertFieldsDataAsShort>

// Union type for extension names
type CertExtensionNames =
    | "basicConstraints"
    | "keyUsage"
    | "nsCertType"
    | "subjectKeyIdentifier"
    | "authorityKeyIdentifier"
    | "extKeyUsage"
    | "subjectAltName";

// Selector type that maps names to their respective types
export type generateCertSettingsExtensionsSelector<T extends { name: CertExtensionNames }> =
    T['name'] extends "basicConstraints" ? CertExtensionsBasicConstraints :
        T['name'] extends "keyUsage" ? (T extends CertExtensionsKeyUsageCA ? CertExtensionsKeyUsageCA : CertExtensionsKeyUsageCert) :
            T['name'] extends "nsCertType" ? CertExtensionsNSCertType :
                T['name'] extends "subjectKeyIdentifier" ? CertExtensionsSubjectKeyIdentifier :
                    T['name'] extends "authorityKeyIdentifier" ? CertExtensionsAuthorityKeyIdentifier :
                        T['name'] extends "extKeyUsage" ? CertExtensionsExtKeyUsage :
                            T['name'] extends "subjectAltName" ? CertExtensionsSubjectAltName :
                                never;

// Define an array of extension objects
export type generateCertSettingsExtensions<T extends Array<{ name: CertExtensionNames }>> = {
    [K in T[number] as K['name']]: generateCertSettingsExtensionsSelector<K>
}[T[number]['name']][];



export interface generateCertSettings {
    keys : generateCertSettingsKeys;
    subject : generateCertSettingsFields;
    digest ?: md.MessageDigest | undefined;
    expiresYears ?: number | undefined;
    passphrase ?: string | undefined;
    extensions ?: generateCertSettingsExtensions<any>;
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
    keys : {
        privateKey : string;
        publicKey : string;
    }
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
    keys : KeyPairsData,
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

