import {arrayify, hexlify} from "@ethersproject/bytes";
import { encrypt, decrypt, PrivateKey } from 'eciesjs';

export function encryptString(str, key){
    console.log("Encrypt")
    const data= Buffer.from(str);
    const privatKeyBuffer = Buffer.from(key,'hex');
    const encrypted_Data = encrypt(hexlify(privatKeyBuffer), data);
    return encrypted_Data;
}

export function decryptString(str, key){
    console.log("decrypt")
    const data= Buffer.from(str);
    const publicKeyBuffer = Buffer.from(key,'hex');
   const result = decrypt(hexlify(publicKeyBuffer), data).toString();
    return result;
}

export function privateToWalletMe(privateK){

    const util  = require('ethereumjs-util')

    // const privateKey = 'ead75d17f3748b52b863f9358cdc9646fa6caf66399919d375ea6339639d909a';
    const privatKeyBuffer = Buffer.from(privateK,'hex');

    var isValidPrivate = util.isValidPrivate(privatKeyBuffer);


    const publicKey = util.privateToPublic(privatKeyBuffer);

    const isValidPublic = util.isValidPublic(publicKey);

    var address = util.pubToAddress(publicKey);
    const answer = util.addHexPrefix(address).toString('hex');	
    return answer;
}

export function privateToPublicMe(privateK){

    const util  = require('ethereumjs-util')

    // const privateKey = 'ead75d17f3748b52b863f9358cdc9646fa6caf66399919d375ea6339639d909a';
    const privatKeyBuffer = Buffer.from(privateK,'hex');

    var isValidPrivate = util.isValidPrivate(privatKeyBuffer);


    const publicKey = util.privateToPublic(privatKeyBuffer);

    const isValidPublic = util.isValidPublic(publicKey);

    return publicKey.toString("hex");
}