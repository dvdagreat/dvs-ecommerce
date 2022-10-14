import Joi from 'joi'
import InvalidRequestParameter from "../../../errors/InvalidRequestParameter";

export default class RequestValidator {
    static addItem = async (req, res, next) => {
        if(!req.body.item) {
            throw new InvalidRequestParameter(401, '"item" property not set');
        }

        const schema = Joi.object({
            productId: Joi.number().required().min(0),
            quantity: Joi.number().required().min(0),
        }).required();
    
        try {
            await schema.validateAsync(req.body.item, { abortEarly: false });
            return next();
        } catch (error) {
            // accumulate all error messages and pass to error handler
            const messageAccumulator = (a, c) => (a[c.context.key] = c.message,a)
            return next(new InvalidRequestParameter(401, error.details.reduce(messageAccumulator, {})));
        }    
    }
}