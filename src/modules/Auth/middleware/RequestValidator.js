import Joi from 'joi'
import InvalidRequestParameter from "../../../errors/InvalidRequestParameter";

export default class RequestValidator {
    static login = async (req, res, next) => {
        if(!req.body.user) {
            throw new InvalidRequestParameter(401, '"user" property not set');
        }
    
        const usernameSchema = Joi.string().alphanum().min(6).max(18).required();
        const passwordSchema = Joi.string().min(6).max(20).required();
    
        const userSchema = Joi.object({
            username: usernameSchema,
            password: passwordSchema,
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

    static register = async (req, res, next) => {
        if(!req.body.user) {
            throw new InvalidRequestParameter(401, '"user" property not set');
        }
    
        const usernameSchema = Joi.string().alphanum().min(6).max(18).required();
        const firstNameSchema = Joi.string().alphanum().max(50).required();
        const lastNameSchema = Joi.string().alphanum().max(50).required();
        const emailSchema = Joi.string().email().required();
        const passwordSchema = Joi.string().min(6).max(20).required();
    
        const userSchema = Joi.object({
            username: usernameSchema,
            firstName: firstNameSchema,
            lastName: lastNameSchema,
            email: emailSchema,
            password: passwordSchema,
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
}