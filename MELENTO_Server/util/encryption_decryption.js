const crypto = require('crypto');
const { publicEncrypt } = require('crypto');
const { privateDecrypt } = require('crypto');
const fs=require('fs')
const path = require('path');




const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
 
  function decrypt(encryptedText) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
 
  // Usage example
  let plainText = 'Hello, World!';
  let encryptedText = encrypt(plainText);
  let decryptedText = decrypt(encryptedText);
 
  console.log('Original:', plainText);
  console.log('Encrypted:', encryptedText);
  console.log('Decrypted:', decryptedText);
 
