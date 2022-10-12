import Joi from 'joi'
import InvalidRequestParameter from "../../../errors/InvalidRequestParameter";

export default class RequestValidator {

    static create = async (req, res, next) => {
        if(!req.body.product) {
            throw new InvalidRequestParameter(401, '"product" property not set');
        }

        const schema = Joi.object({
            name: Joi.string().min(6).max(18).pattern(/^[a-zA-Z0-9_ -]*$/).required().error(errors => {
                errors.forEach(err => {
                    switch (err.code) {
                        case 'string.pattern.base':
                            err.message = 'name should only contain alphabets, numbers, underscores (_), spaces ( ) and dashes (-) only';
                            break;
                        default:
                            break;
                    };
                });

                return errors;
            }),
            price: Joi.number().min(0.0).default(0),
            quantity: Joi.number().min(0).default(0)
        }).required();
    
        try {
            await schema.validateAsync(req.body.product, { abortEarly: false });
            next();
        } catch (error) {
            // accumulate all error messages and pass to error handler
            const messageAccumulator = (a, c) => (a[c.context.key] = c.message,a)
            next(new InvalidRequestParameter(401, error.details.reduce(messageAccumulator, {})));
        }    
    }
    
    static delete = (req, res, next) => {
        if(!req.params.id || isNaN(req.params.id)) {
            return next(new InvalidRequestParameter(403, 'Invalid id provided'));
        }
    
        return next();
    }

    static getById = (req, res, next) => {
        if(!req.params.id || isNaN(req.params.id)) {
            throw new InvalidRequestParameter(404, 'Invalid id provided');
        }
    
        return next();
    }

    static patch = async (req, res, next) => {
        if(!req.params.id || isNaN(req.params.id)) {
            return next(new InvalidRequestParameter(403, 'Invalid id provided'));
        }
        
        if(!req.body.product) {
            throw new InvalidRequestParameter(401, '"product" property not set');
        }
    
        const schema = Joi.object({
            name: Joi.string().min(6).max(18).pattern(/^[a-zA-Z0-9_ -]*$/).error(errors => {
                errors.forEach(err => {
                    switch (err.code) {
                        case 'string.pattern.base':
                            err.message = 'name should only contain alphabets, numbers, underscores (_), spaces ( ) and dashes (-) only';
                            break;
                        default:
                            break;
                    };
                });

                return errors;
            }),
            price: Joi.number().min(0.0).default(0),
            quantity: Joi.number().min(0).default(0)
        }).min(1);
    
        try {
            await schema.validateAsync(req.body.product, { abortEarly: false });
            next();
        } catch (error) {
            // accumulate all error messages and pass to error handler
            const messageAccumulator = (a, c) => (a[c.context.key] = c.message,a)
            next(new InvalidRequestParameter(401, error.details.reduce(messageAccumulator, {})));
        }    
    }
}