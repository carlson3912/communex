import { encrypt, decrypt, PrivateKey } from 'eciesjs';
export const Decrypt = () =>{

function encryptOrder(dataIn){
console.log("decrypt started");
const k1 = new PrivateKey();
console.log(k1.publicKey.toHex());
console.log(k1.toHex());
const data = Buffer.from(dataIn);
const encrypted_Data = encrypt(k1.publicKey.toHex(), data);
console.log("encrydata: "+ encrypted_Data)
console.log(decrypt(k1.toHex(),encrypt(k1.publicKey.toHex(), data) ).toString());
}
return(
    <button onClick={encryptOrder}>Hello</button>
)
}

export default Decrypt;