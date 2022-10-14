import { Router } from "express";
import CartController from "./CartController";

const cartRouter = Router();

/**
 * 
 * -- USER ENDPOINTS --
 * 
 * 1. get all cart items
 * GET /cart
 * 
 * 2. add item to cart
 * POST /cart
 * 
 * 3. remove a specific item from cart
 * DELETE /cart/item/:id
 * 
 * 4. change quantity of a cart item
 * PATCH /cart/change-quantity/:itemId/:quantity
 */

cartRouter.get('/', CartController.getCart);
cartRouter.post('/', CartController.addItem);
cartRouter.delete('/item/:id([0-9]+)', CartController.deleteItem);
cartRouter.patch('/change-quantity/:itemId([0-9]+)/:quantity([0-9]+)', CartController.changeQuantity);

export default cartRouter;