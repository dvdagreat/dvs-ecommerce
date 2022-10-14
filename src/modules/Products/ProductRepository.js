import { Product } from '../../database/models';

export default class ProductRepository {
    static async getById(id) {
        return await Product.findByPk(id);
    }

    static async getMany(filters) {
        return await Product.findAll();
    }

    static async create(product) {
        const newProduct = await Product.create(product);
        return await newProduct.save();
    }

    static async deleteById(id) {
        const result = await Product.destroy({ where: { id } });
        return result == 1;
    }

    static async patchById(id, product) {
        const updateOptions = { where: { id } };
        const result = await Product.update(product, updateOptions);
        return result[0] == 1;
    }
}