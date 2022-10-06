export default class CannotDeleteException extends Error {
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}