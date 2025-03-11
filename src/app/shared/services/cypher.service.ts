import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CypherService {

  private readonly keyName = 'secretKey';

  constructor() { }

  getOrCreateSecretKey(): string {
    let secretKey = sessionStorage.getItem(this.keyName);
    if (!secretKey) {
      secretKey = this._generateSecretKey();
      sessionStorage.setItem(this.keyName, secretKey);
    }
    return secretKey;
  }

  private _generateSecretKey(): string {
    return CryptoJS.lib.WordArray.random(32).toString();
  }

  encrypt(text: string): string {
    const secretKey = this.getOrCreateSecretKey();
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  }

  decrypt(encryptedText: string): string {
    const secretKey = this.getOrCreateSecretKey();
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}