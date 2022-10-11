import NotFoundException from "../../errors/NotFoundException";
import TokenHelper from "../../helpers/TokenHelper";
import ObjectHelper from "../../helpers/ObjectHelper";
import UserRepository from "../Users/UserRepository";
import UserService from "../Users/UserService";
import AuthService from "./AuthService";
import EntityAlreadyExists from "../../errors/EntityAlreadyExists";
import EncryptionHelper from "../../helpers/EncryptionHelper";
import UserRole from "../Users/constants/UserRoles";
import IncorrectCredentials from "../../errors/IncorrectCredentials";

export default class AuthController {
    static login = async (req, res, next) => {
        try {
            const username = req.body.user.username;
            const password = req.body.user.password;

            const user = await UserRepository.findByUsername(username);
            if(!user) { 
                throw new NotFoundException(404, 'No users found with provided credentials');
            }

            if(!await EncryptionHelper.verifyPassword(user.password, password)) {
                throw new IncorrectCredentials(401, 'Incorrect credentials');
            }

            const token = TokenHelper.sign(AuthService.getJWTPayload(user));
            
            return res.status(200).json({ token });
        } catch (error) {
            return next(error);
        }
    }

    static register = async (req, res, next) => {
        try {
            const username = req.body.user.username;
            const email = req.body.user.email;

            const user = await UserRepository.findIdentity(username, email);
            if(user) {
                throw new EntityAlreadyExists(403, 'User already registered');
            }

            const dbMappedFields = ObjectHelper.deleteEmptyProperties(UserService.mapRequestToDatabaseFields(req.body.user));

            // hash password
            dbMappedFields.password = await EncryptionHelper.encryptPassword(dbMappedFields.password);

            dbMappedFields.role = UserRole.USER;

            await UserRepository.create(dbMappedFields);

            return res.status(200).json({ message: 'User successfully registered' });
        } catch (error) {
            return next(error);
        }
    }
}