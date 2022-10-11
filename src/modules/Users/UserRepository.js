import User from '../../database/models/user'
import { Op } from 'sequelize';

export default class UserRepository {
    static async getUserById(id) {
        return await User.findByPk(id);
    }

    static async findByUsername(username) {
        return await User.findOne({
            where: { username }
        });
    }

    static async findIdentity(username, email) {
        const usernameFilter = {
            [Op.eq]: username
        };

        const emailFilter = {
            [Op.eq]: email
        };
        
        return await User.findOne({
            where: {
                [Op.or]: [
                    { 
                        email_address: emailFilter, 
                    },
                    { 
                        username: usernameFilter, 
                    }
                ]
            }
        });
    }

    static async getAllUsers(filters) {
        return await User.findAll();
    }

    static async create(user) {
        const newUser = await User.create(user);
        return await newUser.save();
    }

    static async deleteById(id) {
        const result = await User.destroy({ where: { id } })
        return result == 1;
    }

    static async patchById(id, user) {
        const updateOptions = { where: { id } };
        const result = await User.update(user, updateOptions)
        return result[0] == 1;
    }
}