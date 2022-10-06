export default class CannotUpdateException extends Error {
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}