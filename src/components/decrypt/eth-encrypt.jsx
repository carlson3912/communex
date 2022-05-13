import {arrayify, hexlify} from "@ethersproject/bytes";
import { encrypt, decrypt, PrivateKey } from 'eciesjs';

export function encryptString(str, key){
    console.log("Encrypt")
    const data= Buffer.from(str);
    const privatKeyBuffer = Buffer.from(key,'hex');
    const encrypted_Data = encrypt(hexlify(privatKeyBuffer), data);
    // console.log(decrypt(hexlify(privatKeyBuffer ),encrypt(hexlify(publicKey), data) ).toString());
    return encrypted_Data;
}

export function decryptString(str, key){
    console.log("decrypt")
    const data= Buffer.from(str);
    const publicKeyBuffer = Buffer.from(key,'hex');
   const result = decrypt(hexlify(publicKeyBuffer), data).toString();
    return result;
}

// export function 




// function encryptOrder(dataIn){
//     const util  = require('ethereumjs-util')    
//     const privateKey = 'ead75d17f3748b52b863f9358cdc9646fa6caf66399919d375ea6339639d909a';
//     const privatKeyBuffer = Buffer.from(privateKey,'hex');
//     var isValidPrivate = util.isValidPrivate(privatKeyBuffer);
//     const publicKey = util.privateToPublic(privatKeyBuffer);
//     const isValidPublic = util.isValidPublic(publicKey);
//     var address = util.pubToAddress(publicKey);
//     return(util.addHexPrefix(address).toString('hex'));	
    // console.log(hexlify(publicKey));
    // console.log("is valid public key ",isValidPublic);
    // console.log("Address: " + address.toString("hex"));
    // const util = require('ethereumjs-util')
    // const privateK = "0xead75d17f3748b52b863f9358cdc9646fa6caf66399919d375ea6339639d909a";
    // const testPub = util.privateToPublic(Buffer.from(arrayify(privateK,"hex")));
    // console.log("arrayify public: " + testPub);
    // const testPH = hexlify(testPub);
    // console.log("hex public: " + testPH);
    // const address = keccak256(Buffer.from(testPH, 'hex')).slice(64 - 40);
    // console.log("Final addres: "+ address);


    // console.log("decrypt started");
    // const k1 = new PrivateKey();
    // // console.log("BEFORE:"+k1.toHex())
    // // console.log("BEFORE2:"+arrayify(k1.toHex()))
    // const testPub = util.privateToPublic(Buffer.from());
    // console.log(hexlify(testPub));
    // console.log(k1.publicKey.toHex());
    // console.log(k1.toHex());
    // console.log("PUBLIC ADDRESS: "+keccak256(testPub));
    // const data = Buffer.from(dataIn);
    // const encrypted_Data = encrypt(hexlify(testPub), data);
    // console.log("encrydata: "+ encrypted_Data)
    // console.log(decrypt(k1.toHex(),encrypt(hexlify(testPub), data) ).toString());
    // return encrypted_Data;
    // }


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