import * as Crypto from "crypto";
import {md, pki, random, util} from "node-forge";
import {
    CertificateAuthority,
    CertificateAuthorityData,
    CertificateData, CertificateParentData,
    generateCASettings,
    generateCertSettings,
    GenerateKeys,
    KeyPairsData
} from "./Types/GeneralCertOptionsMethod";
import {merge} from "lodash";

export class OpenSSL {
    generateKey(Options : GenerateKeys): KeyPairsData {
        if (Options.privateKeyEncoding.passphrase !== undefined){
            Options.privateKeyEncoding.cipher =  'aes-256-cbc';
            Options.privateKeyEncoding.passphrase = 'Cyberhack2010';
        }

        let {privateKey, publicKey} = Crypto.generateKeyPairSync("rsa", Options);
        return {
            privateKey: privateKey,
            publicKey: publicKey,
            encrypted : (Options.privateKeyEncoding.passphrase !== undefined)
        }
    }

    async generateCA(CAOptions : generateCASettings) : Promise<CertificateAuthorityData> {
        return new Promise(async (resolve, reject) => {
            //########################################
            let cert = pki.createCertificate();
            //########################################
            //###################################################
            cert.publicKey = pki.publicKeyFromPem(CAOptions.keys.publicKey);
            //########################################
            cert.serialNumber = this.randomSerialNumber();
            //########################################
            cert.validity.notBefore = new Date();
            cert.validity.notAfter = new Date();

            (CAOptions.options?.expiresYears !== undefined) ?
                cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + CAOptions.options.expiresYears) :
                cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 5);


            // here we set subject and issuer as the same one
            cert.setSubject(CAOptions.attrs);
            cert.setIssuer(CAOptions.attrs);
            cert.setExtensions((CAOptions.options?.extensions !== undefined) ? CAOptions.options.extensions : []);

            if (CAOptions.keys?.encrypted){
                try {
                    let getPrivateKeysFormat = pki.decryptRsaPrivateKey(CAOptions.keys.privateKey, CAOptions.options?.passphrase);
                    let digest = (CAOptions.options?.digest !== undefined) ? CAOptions.options.digest : md.sha512.create();
                    await cert.sign(getPrivateKeysFormat, digest);
                    await resolve({
                        certificate : {
                            pem : pki.certificateToPem(cert),
                            rsa : cert
                        },
                        publicKey : {
                          pem : CAOptions.keys.publicKey,
                          rsa : pki.publicKeyFromPem(CAOptions.keys.publicKey)
                        },
                        privateKey : {
                            rsa : getPrivateKeysFormat,
                            pem : CAOptions.keys.privateKey
                        },
                        validity : {
                            notBefore : cert.validity.notBefore.toISOString(),
                            notAfter :  cert.validity.notAfter.toISOString()
                        }
                    });
                }catch (e) {
                    await reject({ status : false, code : 500, msg : `error decrypted key for cert. passphrase may not match`})
                }
            }else{
                if (CAOptions.keys?.privateKey !== undefined){
                    let getPrivateKeysFormat = pki.privateKeyFromPem(CAOptions.keys?.privateKey);
                    let digest = (CAOptions.options?.digest !== undefined) ? CAOptions.options.digest : md.sha512.create();
                    await cert.sign(getPrivateKeysFormat, digest);
                    await resolve({
                        certificate : {
                            pem : pki.certificateToPem(cert),
                            rsa : cert
                        },
                        privateKey : {
                            pem : CAOptions.keys.privateKey,
                            rsa : getPrivateKeysFormat
                        },
                        publicKey : {
                            pem : CAOptions.keys.publicKey,
                            rsa : pki.publicKeyFromPem(CAOptions.keys.publicKey)
                        },
                        validity : {
                            notBefore : cert.validity.notBefore.toISOString(),
                            notAfter :  cert.validity.notAfter.toISOString()
                        }
                    });
                }else{
                    await reject({ status : false, code : 500, msg : `options "keys.privateKey" not Exists`});
                }
            }
        });
    }

    async generateCert(CARoot : CertificateAuthority, CertOptions : generateCertSettings) : Promise<CertificateData>{
        //########################################
        let cert = pki.createCertificate();
        //########################################
        let CA = (typeof CARoot.certificate === "string") ?
            pki.certificateFromPem(CARoot.certificate) : CARoot.certificate.rsa;
        let privateKeyCA = (typeof CARoot.privateKey === "string") ?
            pki.privateKeyFromPem(CARoot.privateKey) : CARoot.privateKey.rsa
        //########################################
        return new Promise(async (resolve, rejected) => {
            //##################################
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
            let extCert = (CertOptions.extensions !== undefined) ?
                CertOptions.extensions : [];
            cert.setExtensions(extCert);
            CertOptions.digest = (CertOptions.digest !== undefined) ? CertOptions.digest : md.sha512.create();

            await cert.sign(privateKeyCA, CertOptions.digest);
            // Convert to PEM format
            await resolve({
                certificate : {
                    pem : pki.certificateToPem(cert),
                    rsa : cert
                },
                publicKey : {
                    pem : CertOptions.keys.publicKey,
                    rsa : pki.publicKeyFromPem(CertOptions.keys.publicKey),
                },
                privateKey : {
                    pem : CertOptions.keys.privateKey,
                    rsa : pki.privateKeyFromPem(CertOptions.keys.privateKey)
                },
                validity : {
                    notBefore: cert.validity.notBefore.toISOString(),
                    notAfter: cert.validity.notAfter.toISOString()
                }
            })
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