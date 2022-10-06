export default class NotFoundException extends Error {
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}