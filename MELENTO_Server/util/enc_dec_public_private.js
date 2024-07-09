const crypto = require('crypto');
const { publicEncrypt } = require('crypto');
const { privateDecrypt } = require('crypto');
const fs=require('fs')
const path = require('path');


const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
 
  const data = "Hello World";
  const encryptedData = publicEncrypt(
      {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
      },
      Buffer.from(data)
  );
 
  console.log("Unencrypted Data:", encryptedData.toString());
  const decryptedData = privateDecrypt(
    {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    },
    encryptedData
);
console.log("Decrypted Data:", decryptedData.toString());






 
