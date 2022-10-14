import TokenNotFound from '../errors/TokenNotFound';
import TokenHelper from '../helpers/TokenHelper'

export default function userTokenDecoder(req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    try {
        if(!token) {
            throw new TokenNotFound(401, 'token not found in the request');
        }
    } catch(error) {
        return next(error);
    }

    req.__decodedUserData = TokenHelper.verify(token);
    next();
}