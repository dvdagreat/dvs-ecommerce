import CannotDeleteException from "../../errors/CannotDeleteException";
import CannotUpdateException from "../../errors/CannotUpdateException";
import NotFoundException from "../../errors/NotFoundException";
import UserRepository from "./UserRepository";

export default class UserController {
    static getAllUsers = async (req, res, next) => {
        try {
            const response = await UserRepository.getAllUsers();
            if(!response) throw new NotFoundException(404, 'No users found')
            
            return res.status(200).json(response);
        } catch (error) {
            return next(error);
        }
    }

    static getUserById = async (req, res, next) => {
        try {
            const response = await UserRepository.getUserById(req.params.id);
            if(!response) throw new NotFoundException(404, 'No users found')
    
            return res.status(200).json(response);
        } catch (error) {
            return next(error);
        }
    }
    
    static createUser = async (req, res, next) => {
        try {
            const response = await UserRepository.create(req.body.user);
            return res.status(200).json(response);
        } catch (error) {
            return next(error);
        }
    }
    
    static deleteUser = async (req, res, next) => {
        try {
            if(!await UserRepository.deleteById(req.params.id)){
                throw new CannotDeleteException(403, 'The user was not deleted, please try again sometime later');
            };
    
            return res.status(200).json(response);
        } catch (error) {
            return next(error);
        }
    }
    
    static patchUser = async (req, res, next) => {
        try {
            if(!await UserRepository.getUserById(req.params.id)) { 
                throw new NotFoundException(404, 'No users found')
            }
    
            if(!await UserRepository.patchById(req.params.id, req.body.user)) {
                throw new CannotUpdateException(403, 'The user was not updated, please try again sometime later');
            }
    
            return res.status(200).json({message: 'User updated/patched successfully'});
        } catch (error) {
            return next(error);
        }
    }
}