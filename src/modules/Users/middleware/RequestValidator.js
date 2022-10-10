import Joi from 'joi'
import InvalidRequestParameter from "../../../errors/InvalidRequestParameter";

export default class RequestValidator {

    static createUser = async (req, res, next) => {
        if(!req.body.user) {
            throw new InvalidRequestParameter(401, '"user" property not set');
        }
    
        const usernameSchema = Joi.string().alphanum().min(6).max(18).required();
        const firstNameSchema = Joi.string().alphanum().max(50).required();
        const lastNameSchema = Joi.string().alphanum().max(50).required();
        const emailSchema = Joi.string().email().required();
    
        const userSchema = Joi.object({
            username: usernameSchema,
            firstName: firstNameSchema,
            lastName: lastNameSchema,
            email: emailSchema
        }).required();
    
        try {
            await userSchema.validateAsync(req.body.user, { abortEarly: false });
            next();
        } catch (error) {
            // accumulate all error messages and pass to error handler
            const messageAccumulator = (a, c) => (a[c.context.key] = c.message,a)
            next(new InvalidRequestParameter(401, error.details.reduce(messageAccumulator, {})));
        }    
    }

    static deleteUser = (req, res, next) => {
        if(!req.params.id || isNaN(req.params.id)) {
            return next(new InvalidRequestParameter(403, 'Invalid id provided'));
        }
    
        return next();
    }

    static getUserById = (req, res, next) => {
        if(!req.params.id || isNaN(req.params.id)) {
            throw new InvalidRequestParameter(404, 'Invalid id provided');
        }
    
        return next();
    }

    static patchUser = async (req, res, next) => {
        if(!req.params.id || isNaN(req.params.id)) {
            return next(new InvalidRequestParameter(403, 'Invalid id provided'));
        }
        
        if(!req.body.user) {
            throw new InvalidRequestParameter(401, '"user" property not set');
        }
    
        const usernameSchema = Joi.string().alphanum().min(6).max(18);
        const firstNameSchema = Joi.string().alphanum().max(50);
        const lastNameSchema = Joi.string().alphanum().max(50);
        const emailSchema = Joi.string().email();
    
        const userSchema = Joi.object({
            username: usernameSchema,
            firstName: firstNameSchema,
            lastName: lastNameSchema,
            email: emailSchema
        }).min(1);
    
        try {
            await userSchema.validateAsync(req.body.user, { abortEarly: false });
            next();
        } catch (error) {
            // accumulate all error messages and pass to error handler
            const messageAccumulator = (a, c) => (a[c.context.key] = c.message,a)
            next(new InvalidRequestParameter(401, error.details.reduce(messageAccumulator, {})));
        }    
    }
}