import * as Crypto from "crypto";
import {md, pki, random, util, pem} from "node-forge";
import {
    CertificateAuthority, CertificateAuthorityData,
    CertificateData, CertificateParentData, CertificateRequestData,
    generateCASettings,
    generateCertSettings, GenerateCSRSettings,
    GenerateKeys,
    KeyPairsData
} from "./Types/GeneralCertOptionsMethod";
import errorToJson from "error-to-json";

export class OpenSSL {
    generateKey(Options : GenerateKeys): KeyPairsData {
        if (Options.privateKeyEncoding.passphrase !== undefined){
            Options.privateKeyEncoding.cipher =  'aes-256-cbc';
            Options.privateKeyEncoding.passphrase = 'Cyberhack2010';
        }
        let {privateKey, publicKey} = Crypto.generateKeyPairSync("rsa", Options);
        return {
            privateKey: privateKey,
            publicKey: publicKey
        }
    }

    generateCSR(CSROptions : GenerateCSRSettings) : Promise<CertificateRequestData> {
        let CSR = pki.createCertificationRequest();
        return new Promise((resolve, rejected) => {
            CSR.publicKey = pki.publicKeyFromPem(CSROptions.keys.publicKey);
            if (CSROptions.subject !== undefined) CSR.setSubject(CSROptions.subject);
            if (CSROptions.attrs !== undefined) CSR.setAttributes(CSROptions.attrs);
            //#####################################################################
            let digest = (CSROptions.options?.digest !== undefined) ? CSROptions.options.digest : md.sha512.create();
            //######################################################################
            try {
                let ObjectPEM = pem.decode(CSROptions.keys.privateKey)[0];
                switch (ObjectPEM.type) {
                    case "PRIVATE KEY" :
                        let privateKey = pki.privateKeyFromPem(CSROptions.keys.privateKey);
                        CSR.sign(privateKey, digest);
                        return resolve({
                            certificateRequest : pki.certificationRequestToPem(CSR)
                        });
                    case "ENCRYPTED PRIVATE KEY" :
                        if (CSROptions.options?.passphrase !== undefined && CSROptions.options?.passphrase !== ""){
                            try {
                                let privateKey = pki.decryptRsaPrivateKey(CSROptions.keys.privateKey, CSROptions.options?.passphrase);
                                CSR.sign(privateKey, digest);
                                return resolve({
                                    certificateRequest : pki.certificationRequestToPem(CSR)
                                });
                            }catch (error) {
                                rejected({ status : false, code : 400, msg : `error decode private key with passphrase. passphrase not match`, error : errorToJson(error as Error)});
                            }
                        }else{
                            return rejected({ status : false, code : 400, msg : `private keys is "ENCRYPTED PRIVATE KEY". require options.passphrase `});
                        }
                        break;
                    default :
                        return rejected({ status : false, code : 503, msg : `unknown pem type. illegal pem type`});
                }
            }catch (error) {
                return rejected({ status : false, code : 503, msg : `private key pem not valid format`, error : errorToJson(error as Error)});
            }
        })
    }

    generateCA(CAOptions : generateCASettings) : Promise<CertificateAuthorityData> {
        //########################################
        let cert = pki.createCertificate();
        //########################################
        return new Promise((resolve, reject) => {
            //###################################################
            cert.publicKey = pki.publicKeyFromPem(CAOptions.keys.publicKey);
            //########################################
            cert.serialNumber = this.randomSerialNumber();
            //########################################
            cert.validity.notBefore = new Date();
            cert.validity.notAfter = new Date();
            // set validity #####################################
            (CAOptions.options?.expiresYears !== undefined) ?
                cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + CAOptions.options.expiresYears) :
                cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 5);
            // here we set subject and issuer as the same one
            cert.setSubject(CAOptions.attrs);
            cert.setIssuer(CAOptions.attrs);
            cert.setExtensions((CAOptions.options?.extensions !== undefined) ? CAOptions.options.extensions : []);
            //#####################################################################
            let digest = (CAOptions.options?.digest !== undefined) ? CAOptions.options.digest : md.sha512.create();
            //######################################################################
            try {
                let ObjectPEM = pem.decode(CAOptions.keys.privateKey)[0];
                switch (ObjectPEM.type) {
                    case "PRIVATE KEY" :
                        let privateKey = pki.privateKeyFromPem(CAOptions.keys.privateKey);
                        cert.sign(privateKey, digest);
                        return resolve({
                            certificate : pki.certificateToPem(cert),
                            validity : {
                                notBefore : cert.validity.notBefore.toISOString(),
                                notAfter :  cert.validity.notAfter.toISOString()
                            }
                        });
                    case "ENCRYPTED PRIVATE KEY" :
                        if (CAOptions.options?.passphrase !== undefined && CAOptions.options?.passphrase !== ""){
                            try {
                                let privateKey = pki.decryptRsaPrivateKey(CAOptions.keys.privateKey, CAOptions.options?.passphrase);
                                cert.sign(privateKey, digest);
                                return resolve({
                                    certificate : pki.certificateToPem(cert),
                                    validity : {
                                        notBefore : cert.validity.notBefore.toISOString(),
                                        notAfter :  cert.validity.notAfter.toISOString()
                                    }
                                });
                            }catch (error) {
                                reject({ status : false, code : 400, msg : `error decode private key with passphrase. passphrase not match`, error : errorToJson(error as Error)});
                            }
                        }else{
                            return reject({ status : false, code : 400, msg : `private keys is "ENCRYPTED PRIVATE KEY". require options.passphrase `});
                        }
                        break;
                    default :
                        return reject({ status : false, code : 503, msg : `unknown pem type. illegal pem type`});
                }
            }catch (error) {
                return reject({ status : false, code : 503, msg : `private key pem not valid format`, error : errorToJson(error as Error)});
            }
        });
    }


    generateCert(CARoot : CertificateAuthority, CertOptions : generateCertSettings) : Promise<CertificateData>{
        //########################################
        let cert = pki.createCertificate();
        //########################################
        return new Promise(async (resolve, rejected) => {
            //########################################
            CertOptions.digest = (CertOptions.digest !== undefined) ? CertOptions.digest : md.sha512.create();
            try {
                let ObjectPEM = pem.decode(CARoot.privateKey)[0];
                let CA : { certificate : pki.Certificate, privateKey : pki.PrivateKey };
                //############################################################
                switch (ObjectPEM.type) {
                    case "PRIVATE KEY" :
                        CA = {
                            certificate : pki.certificateFromPem(CARoot.certificate),
                            privateKey : pki.privateKeyFromPem(CARoot.privateKey)
                        }
                        cert.publicKey = pki.publicKeyFromPem(CertOptions.keys.publicKey);
                        cert.serialNumber = this.randomSerialNumber();
                        (CertOptions?.expiresYears !== undefined) ?
                            cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + CertOptions.expiresYears) :
                            cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 5);
                        //@############################################
                        cert.setSubject(CertOptions.subject);
                        //@############################################
                        cert.setIssuer(CA.certificate.subject.attributes);
                        //@############################################
                        let extCert = (CertOptions.extensions !== undefined) ? CertOptions.extensions : [];
                        cert.setExtensions(extCert);
                        //@########################################################################################################
                        await cert.sign(CA.privateKey, CertOptions.digest);
                        //@########################################################################################################
                        return resolve({
                            certificate : pki.certificateToPem(cert),
                            validity : {
                                notBefore : cert.validity.notBefore.toISOString(),
                                notAfter :  cert.validity.notAfter.toISOString()
                            }
                        });
                    case "ENCRYPTED PRIVATE KEY" :
                        if (CARoot.passphrase !== undefined && CARoot.passphrase !== ""){
                            let privateKey = pki.decryptRsaPrivateKey(CARoot.privateKey, CARoot.passphrase);
                            if (privateKey === null) return rejected({ status : false, code : 400, msg : `error decode private key with passphrase. passphrase not match`});
                            CA = {
                                certificate : pki.certificateFromPem(CARoot.certificate),
                                privateKey : privateKey
                            }
                            cert.publicKey = pki.publicKeyFromPem(CertOptions.keys.publicKey);
                            cert.serialNumber = this.randomSerialNumber();
                            (CertOptions?.expiresYears !== undefined) ?
                                cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + CertOptions.expiresYears) :
                                cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 5);
                            //@############################################
                            cert.setSubject(CertOptions.subject);
                            //@############################################
                            cert.setIssuer(CA.certificate.subject.attributes);
                            //@############################################
                            let extCert = (CertOptions.extensions !== undefined) ? CertOptions.extensions : [];
                            cert.setExtensions(extCert);
                            //@########################################################################################################
                            await cert.sign(CA.privateKey, CertOptions.digest);
                            //@########################################################################################################
                            return resolve({
                                certificate : pki.certificateToPem(cert),
                                validity : {
                                    notBefore : cert.validity.notBefore.toISOString(),
                                    notAfter :  cert.validity.notAfter.toISOString()
                                }
                            });
                        }else{
                            return rejected({ status : false, code : 400, msg : `private keys is "ENCRYPTED PRIVATE KEY". require CARoot.passphrase `});
                        }
                    default :
                        return rejected({ status : false, code : 503, msg : `unknown pem type. illegal pem type`});
                }

            }catch (error) {
                return rejected({ status : false, code : 503, msg : `private key pem not valid format`, error : errorToJson(error as Error)});
            }
            /*//##################################
            cert.publicKey = pki.publicKeyFromPem(CertOptions.keys.publicKey);
            cert.serialNumber = this.randomSerialNumber();
            (CertOptions?.expiresYears !== undefined) ?
                cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + CertOptions.expiresYears) :
                cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 5);
            //@############################################
            cert.setSubject(CertOptions.subject);
            //@############################################
            cert.setIssuer(CA.subject.attributes);
            //@############################################
            let extCert = (CertOptions.extensions !== undefined) ? CertOptions.extensions : [];
            cert.setExtensions(extCert);
            CertOptions.digest = (CertOptions.digest !== undefined) ? CertOptions.digest : md.sha512.create();

            await cert.sign(privateKeyCA, CertOptions.digest);

            // @ts-ignore
            if (CertOptions.keys?.encrypted){
                try {
                    let getPrivateKeysFormat = pki.decryptRsaPrivateKey(CertOptions.keys.privateKey, CertOptions.passphrase);
                    await resolve({
                        certificate : {
                            pem : pki.certificateToPem(cert),
                            rsa : cert
                        },
                        publicKey : {
                            pem : CertOptions.keys.publicKey,
                            rsa : pki.publicKeyFromPem(CertOptions.keys.publicKey)
                        },
                        privateKey : {
                            rsa : getPrivateKeysFormat,
                            pem : CertOptions.keys.privateKey
                        },
                        validity : {
                            notBefore : cert.validity.notBefore.toISOString(),
                            notAfter :  cert.validity.notAfter.toISOString()
                        }
                    });
                }catch (e) {
                    await rejected({ status : false, code : 500, msg : `error decrypted key for cert. passphrase may not match`})
                }
            }else{
                if (CertOptions.keys?.privateKey !== undefined){
                    let getPrivateKeysFormat = pki.privateKeyFromPem(CertOptions.keys?.privateKey);
                    await resolve({
                        certificate : {
                            pem : pki.certificateToPem(cert),
                            rsa : cert
                        },
                        privateKey : {
                            pem : CertOptions.keys.privateKey,
                            rsa : getPrivateKeysFormat
                        },
                        publicKey : {
                            pem : CertOptions.keys.publicKey,
                            rsa : pki.publicKeyFromPem(CertOptions.keys.publicKey)
                        },
                        validity : {
                            notBefore : cert.validity.notBefore.toISOString(),
                            notAfter :  cert.validity.notAfter.toISOString()
                        }
                    });
                }else{
                    await rejected({ status : false, code : 500, msg : `options "CertOptions.keys.privateKey" not Exists`});
                }
            }*/
        })
    }


    verify (comparison : CertificateParentData) : Boolean {
        return (typeof comparison.parent === "string" && typeof comparison.child === "string") ?
            pki.certificateFromPem(comparison.parent)
                .verify(pki.certificateFromPem(comparison.child)) :
            (typeof comparison.parent === "object" && typeof comparison.child === "object") ?
                comparison.child
                    .verify(comparison.parent) :
                false;
    }


    private makeNumberPositive (hexString : string) {
        let mostSignificativeHexDigitAsInt = parseInt(hexString[0], 16);
        if (mostSignificativeHexDigitAsInt < 8) return hexString;
        mostSignificativeHexDigitAsInt -= 8
        return mostSignificativeHexDigitAsInt.toString() + hexString.substring(1)
    }

// Generate a random serial number for the Certificate
    private randomSerialNumber () {
        return this.makeNumberPositive(util.bytesToHex(random.getBytesSync(20)));
    }

}

export default OpenSSL;