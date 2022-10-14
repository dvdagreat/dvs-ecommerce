import CartRepository from "./CartRepository"
import NotFoundException from "../../errors/NotFoundException";

export default class CartService {
    static mapRequestToDatabaseFields({name, price, quantity}) {
        return {name, price, quantity}
    }

    static async getCart(userId) {
        const cart = await CartRepository.getByUserId(userId);

        if (!cart) {
            throw new NotFoundException(404, 'Cart not found');
        }

        return await CartRepository.getCartItems(cart.id);
    }

    static async addItem(userId, item) {
        let cart = await CartRepository.getByUserId(userId);

        if (!cart) {
            cart = await CartRepository.createCart(userId);
        }

        const cartItem = {
            cart_id: cart.id,
            product_id: item.productId,
            quantity: item.quantity
        }

        await CartRepository.addItem(cartItem);
    }

    static async delete(userId) {
        
    }

    static async deleteItem(userId, itemId) {
        const cart = await CartRepository.getByUserId(userId);
        if (!cart) {
            throw new NotFoundException(404, 'Cart not found');
        }

        const item = await CartRepository.getCartItem(cart.id, itemId);
        if(!item) {
            throw new NotFoundException(404, 'Item does not exist in the cart');
        }

        await CartRepository.deleteItemById(itemId);

        const remainingProducts = await CartRepository.getCartItems(cart.id);
        if(remainingProducts.length === 0) {
            await CartRepository.deleteCart(cart.id);
        }
    }

    static async changeQuantity(userId, itemId, newQuantity) {
        const cart = await CartRepository.getByUserId(userId);
        if (!cart) {
            throw new NotFoundException(404, 'Cart not found');
        }

        const item = await CartRepository.getCartItem(cart.id, itemId);
        if(!item) {
            throw new NotFoundException(404, 'Item does not exist in the cart');
        }

        await CartRepository.changeItemQuantity(itemId, newQuantity);
    }
}