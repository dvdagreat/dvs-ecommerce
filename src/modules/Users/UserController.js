import CannotDeleteException from "../../errors/CannotDeleteException";
import CannotUpdateException from "../../errors/CannotUpdateException";
import EntityAlreadyExists from "../../errors/EntityAlreadyExists";
import NotFoundException from "../../errors/NotFoundException";
import EncryptionHelper from "../../helpers/EncryptionHelper";
import ObjectHelper from "../../helpers/ObjectHelper";
import UserRepository from "./UserRepository";
import UserService from "./UserService";

export default class UserController {
    static getAllUsers = async (req, res, next) => {
        try {
            const response = await UserRepository.getAllUsers();
            if(!response) { 
                throw new NotFoundException(404, 'No users found');
            }
            
            return res.status(200).json(response);
        } catch (error) {
            return next(error);
        }
    }

    static getUserById = async (req, res, next) => {
        try {
            const response = await UserRepository.getUserById(req.params.id);
            if(!response) {
                throw new NotFoundException(404, 'No users found');
            }
    
            return res.status(200).json(response);
        } catch (error) {
            return next(error);
        }
    }
    
    static createUser = async (req, res, next) => {
        try {
            const username = req.body.user.username;
            const email = req.body.user.email;

            const user = await UserRepository.findIdentity(username, email);
            if(user) {
                throw new EntityAlreadyExists(403, 'User already registered');
            }

            const dbMappedUser = ObjectHelper.deleteEmptyProperties(UserService.mapRequestToDatabaseFields({...req.body.user}));
            dbMappedFields.password = EncryptionHelper.encryptPassword(dbMappedFields.password);

            await UserRepository.create(dbMappedUser);

            return res.status(200).json({ message: 'User successfully created' });
        } catch (error) {
            return next(error);
        }
    }
    
    static deleteUser = async (req, res, next) => {
        try {            
            if(!await UserRepository.deleteById(req.params.id)){
                throw new CannotDeleteException(403, 'The user was not deleted, please try again sometime later');
            };
    
            return res.status(200).json({ message: 'User successfully deleted' });
        } catch (error) {
            return next(error);
        }
    }
    
    static patchUser = async (req, res, next) => {
        try {
            const userId = req.params.id;
            const userObject = {...req.body.user};

            if(!await UserRepository.getUserById(userId)) { 
                throw new NotFoundException(404, 'No users found')
            }

            const dbMappedFields = ObjectHelper.deleteEmptyProperties(UserService.mapRequestToDatabaseFields(userObject));

            if(!await UserRepository.patchById(userId, dbMappedFields)) {
                throw new CannotUpdateException(403, 'The user was not updated, please try again sometime later');
            }
    
            return res.status(200).json({message: 'User updated/patched successfully'});
        } catch (error) {
            return next(error);
        }
    }
}