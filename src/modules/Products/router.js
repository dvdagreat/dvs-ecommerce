import { Router } from "express";
import RequestValidator from "./middleware/RequestValidator";
import ProductController from "./ProductController";

const productRouter = Router();

productRouter.get('/', ProductController.getAll);
productRouter.get('/:id', RequestValidator.getById, ProductController.getById);
productRouter.post('/', RequestValidator.create, ProductController.create);
productRouter.delete('/:id', RequestValidator.delete, ProductController.delete);
productRouter.patch('/:id', RequestValidator.patch, ProductController.patch);

export default productRouter;