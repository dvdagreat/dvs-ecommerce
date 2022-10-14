import { Cart, CartDetail } from '../../database/models';

export default class CartRepository {
    static async createCart(userId) {
        const cart = await Cart.create({user_id: userId});
        return await cart.save();
    }

    static async deleteCart(cartId) {
        const result = await Cart.destroy({where: { id: cartId }})
        return result == 1;
    }

    static async getByUserId(id) {
        return await Cart.findOne({where: { user_id: id }});
    }

    static async getCartItems(cartId) {
        return await CartDetail.findAll({ where: { cart_id: cartId } });
    }

    static async getCartItem(cartId, itemId) {
        return await CartDetail.findOne({ where: { cart_id: cartId, id: itemId } });
    }

    static async addItem(item) {
        const newItem = await CartDetail.create(item);
        return await newItem.save();
    }

    static async deleteItemById(itemId) {
        const result = await CartDetail.destroy({where: { id: itemId }})
        return result == 1;
    }

    static async changeItemQuantity(itemId, newQuantity) {
        const updateOptions = { where: { id: itemId } }
        const result = await CartDetail.update( { quantity: newQuantity }, updateOptions );
        return result == 1;
    }
}