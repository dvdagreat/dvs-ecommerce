import User from '../../database/models/user'

export default class UserRepository {
    static async getUserById(id) {
        return await User.findByPk(id);
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