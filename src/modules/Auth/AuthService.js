export default class AuthService {
    static getJWTPayload(dbUser) {
        return {
            username: dbUser.username,
            role: dbUser.role,
            email: dbUser.email_address,
            id: dbUser.id
        }
    }
}