import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

@Injectable()
export class HashUtil {
  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  }
  comparePassword(password: string, hash: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function (err, res) {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    });
  }
  generateToken(data: any, secretKey: string, expiresIn): string {
    return jwt.sign(data, secretKey, { expiresIn });
  }
  verifyToken(token: string, secretKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, function (err, decoded) {
        if (err) return reject(err);
        return resolve(decoded);
      });
    });
  }
  decodeBase64(encryptData: string): string {
    return Buffer.from(encryptData, 'base64').toString('utf8');
  }
  encodeBase64(decryptData: string): string {
    return Buffer.from(decryptData).toString('base64');
  }
  createChecksum(dataChecksum: string, merchant_secret: string): string {
    const hash = crypto
      .createHash('sha256')
      .update(dataChecksum + merchant_secret)
      .digest('hex');
    return hash.toUpperCase();
  }
  validateChecksum(
    { ...data }: Record<string, unknown>,
    checksum: string,
    merchant_secret: string,
  ): boolean {
    delete data['checksum'];
    const dataChecksum = Object.keys(data)
      .sort()
      .reduce((x, y) => {
        x += data[y];
        return x;
      }, '');
    const hash = crypto
      .createHash('sha256')
      .update(dataChecksum + merchant_secret)
      .digest('hex');
    return hash.toUpperCase() == checksum.toUpperCase();
  }
  create3DESKey(key) {
    let hashKey = crypto.createHash('md5').update(key).digest();
    hashKey = Buffer.concat([hashKey, hashKey.slice(0, 8)]);
    return hashKey;
  }
  tripleDESEncrypt(data, secret_key, output_type) {
    secret_key = this.create3DESKey(secret_key);
    const cipher = crypto.createCipheriv('des-ede3', secret_key, '');
    const encrypted = cipher.update(data, 'utf8', output_type);
    return encrypted + cipher.final(output_type);
  }
  tripleDESDecrypt(data, secret_key, input_type) {
    secret_key = this.create3DESKey(secret_key);
    const decipher = crypto.createDecipheriv('des-ede3', secret_key, '');
    const decrypted = decipher.update(data, input_type);
    return decrypted.toString() + decipher.final().toString();
  }
  createHmac(data: Record<string, string>, secretKey: string): string {
    const hashString = Object.keys(data)
      .sort()
      .reduce((accumulator, key) => (accumulator += data[key]), '');
    const hashedString = crypto
      .createHmac('sha256', secretKey)
      .update(hashString)
      .digest('hex');
    return hashedString;
  }
  validateHmac(
    data: Record<string, string>,
    signature: string,
    secretKey: string,
  ) {
    const hashedString = this.createHmac(data, secretKey);
    return signature === hashedString;
  }
}
