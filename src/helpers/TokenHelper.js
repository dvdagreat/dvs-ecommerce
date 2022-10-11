import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export default class TokenHelper {
    static privateKey = fs.readFileSync(path.resolve('src/ssh-keys/private.pem'), 'utf-8');
    static publicKey = fs.readFileSync(path.resolve('src/ssh-keys/public.pem'), 'utf-8');

    static signingOptions = {
        issuer: 'DVS Ecommerce',
        subject: 'user@gmail.com',
        audience: 'https://dvs-ecommerce.com',
        expiresIn: '12h',
        algorithm: 'ES256'
    };

    static sign = (payload) => {
        return jwt.sign(payload, TokenHelper.privateKey, TokenHelper.signingOptions);
    }

    static verify = (token) => {
        return jwt.verify(token, TokenHelper.publicKey)
    }
}