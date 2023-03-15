import Crypto from "crypto";
import {extend} from "lodash";
import {ConfigConstructor} from "./Interfaces/Config";
import {
    AES_128_GCM,
    AES_192_GCM,
    AES_256_GCM,

    DEFAULT_CONFIG_CONSTRUCTOR, ENCRYPTION_STYLE_BASE64, ENCRYPTION_STYLE_BINARY, ENCRYPTION_STYLE_HEX,
    ENCRYPTION_STYLE_NORMAL,
    ENCRYPTION_STYLE_SYMBOL
} from "./Const";
import {CLasses} from "./Interfaces/CLasses";

class Encryption implements CLasses {


    private _Config : ConfigConstructor = {};

    get Config(): ConfigConstructor {
        return this._Config;
    }

    set Config(value: ConfigConstructor) {
        this._Config = value;
    }


    constructor(Config : ConfigConstructor =  DEFAULT_CONFIG_CONSTRUCTOR) {
        this.Config = extend({
            algorithm : AES_256_GCM,
            encryptStyle : ENCRYPTION_STYLE_SYMBOL,
            secretKey : "Cyberhack2010",
            keyLength : undefined
        }, Config);

    }

    encodeIvSync (text : string | object) : string {
        let mReturnEnc: Buffer;
        let res = {
            key : (this.Config.algorithm === AES_256_GCM) ?
                Buffer.alloc(32, this.Config.secretKey) :
                (this.Config.algorithm === AES_192_GCM) ?
                    Buffer.alloc(24, this.Config.secretKey) :
                    (this.Config.algorithm === AES_128_GCM) ?
                        Buffer.alloc(16, this.Config.secretKey) : "",
            iv : Buffer.alloc(16, this.Config.secretKey)
        }
        const crypto = Crypto.createCipheriv(`${this.Config.algorithm}`, res.key, res.iv, {
        } );
        // Updating text
        let mText = ``;
        switch (typeof text){
            case "string":
                mText = text;
                break;
            case "object" :
                mText = JSON.stringify(text);
                break;
        }
        let encrypted = crypto.update(mText);
        // Using concatenation
        encrypted = Buffer.concat([encrypted, crypto.final()]);
        // Returning iv and encrypted data
        mReturnEnc = Buffer.from(`${res.iv.toString('hex')}:${encrypted.toString('hex')}`)

        let mReturnOriginalString = ``;
        //#######################################################################################
        switch (this.Config.encryptStyle) {
            case ENCRYPTION_STYLE_BASE64 :
                mReturnOriginalString = mReturnEnc.toString('base64');
                break;
            case ENCRYPTION_STYLE_HEX :
                mReturnOriginalString = mReturnEnc.toString('hex');
                break;
            case ENCRYPTION_STYLE_BINARY :
                mReturnOriginalString = mReturnEnc.toString("binary");
                break;
            default :
                mReturnOriginalString = mReturnEnc.toString('base64');
                break;
        }

        return mReturnOriginalString;
    }

    decodeIvSync(text : string) : string | object | undefined {
        let mReturn : string | object | undefined = undefined;

        let mReturnOriginalString : Buffer;
        //#######################################################################################
        switch (this.Config.encryptStyle) {
            case ENCRYPTION_STYLE_BASE64 :
                mReturnOriginalString = Buffer.from(text, 'base64')
                break;
            case ENCRYPTION_STYLE_HEX :
                mReturnOriginalString = Buffer.from(text, 'hex')
                break;
            case ENCRYPTION_STYLE_BINARY :
                mReturnOriginalString = Buffer.from(text, 'binary')
                break;
            default :
                mReturnOriginalString = Buffer.from(text, 'base64');
                break;
        }

        const toUtf8 = mReturnOriginalString.toString('utf-8');
        const hash = toUtf8.split(":");

        let res = {
            key : (this.Config.algorithm === AES_256_GCM) ?
                Buffer.alloc(32, this.Config.secretKey) :
                (this.Config.algorithm === AES_192_GCM) ?
                    Buffer.alloc(24, this.Config.secretKey) :
                    (this.Config.algorithm === AES_128_GCM) ?
                        Buffer.alloc(16, this.Config.secretKey) : "",
            iv : Buffer.alloc(16, this.Config.secretKey)
        };
        try {
            const crypto = Crypto.createDecipheriv(`${this.Config.algorithm}`, res.key, res.iv );
            const textUpdate = crypto.update(Buffer.from(hash[1],'hex')).toString();
            try {
                mReturn = JSON.parse(textUpdate);
            }catch (e){
                mReturn = textUpdate;
            }
        }catch (e) {
            mReturn = undefined;
        }
        return mReturn;
    }
}

export default Encryption;