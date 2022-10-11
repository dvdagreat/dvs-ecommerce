export default class UserService {
    static mapRequestToDatabaseFields(user) {
        return {
            username: user.username,
            first_name: user.firstName,
            last_name: user.lastName,
            email_address: user.email,
            password: user.password,
            role: user.role
        }
    }
}