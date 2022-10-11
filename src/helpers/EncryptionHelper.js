import argon2 from "argon2";

export default class EncryptionHelper {
    static async encryptPassword(password) {
        return await argon2.hash(password);
    }

    static async verifyPassword(hashed, normal) {
        return await argon2.verify(hashed, normal);
    }
}