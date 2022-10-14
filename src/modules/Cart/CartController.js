import CartService from "./CartService";

export default class CartController {
    static getCart = async (req, res, next) => {
        try {
            const response = await CartService.getCart(req.__decodedUserData.id);
            return res.status(200).json(response);
        } catch (error) {
            return next(error);
        }
    }
    
    static addItem = async (req, res, next) => {
        try {
            await CartService.addItem(req.__decodedUserData.id, req.body.item);
            return res.status(200).json({ message: 'Cart item added' });
        } catch (error) {
            return next(error);
        }
    }    
    
    static deleteItem = async (req, res, next) => {
        try {            
            await CartService.deleteItem(req.__decodedUserData.id, req.params.id)
            return res.status(200).json({ message: 'Cart item deleted' });
        } catch (error) {
            return next(error);
        }
    }
    
    static changeQuantity = async (req, res, next) => {
        try {
            await CartService.changeQuantity(req.__decodedUserData.id, req.params.itemId, req.params.quantity);
            return res.status(200).json({message: 'Product quantity updated'});
        } catch (error) {
            return next(error);
        }
    }
}