import CannotDeleteException from "../../errors/CannotDeleteException";
import CannotUpdateException from "../../errors/CannotUpdateException";
import NotFoundException from "../../errors/NotFoundException";
import ObjectHelper from "../../helpers/ObjectHelper";
import ProductRepository from "./ProductRepository";
import ProductService from "./ProductService";

export default class ProductController {
    static getAll = async (req, res, next) => {
        try {
            const response = await ProductRepository.getMany();
            if(!response) {
                throw new NotFoundException(404, 'No Products found');
            }
            
            return res.status(200).json(response);
        } catch (error) {
            return next(error);
        }
    }

    static getById = async (req, res, next) => {
        try {
            const response = await ProductRepository.getById(req.params.id);
            if(!response) {
                throw new NotFoundException(404, 'No Products found');
            }
    
            return res.status(200).json(response);
        } catch (error) {
            return next(error);
        }
    }
    
    static create = async (req, res, next) => {
        try {
            const dbMappedFields = ObjectHelper.deleteEmptyProperties(
                ProductService.mapRequestToDatabaseFields({...req.body.product})
                );
            await ProductRepository.create(dbMappedFields);

            return res.status(200).json({ message: 'Product successfully created' });
        } catch (error) {
            return next(error);
        }
    }
    
    static delete = async (req, res, next) => {
        try {            
            if(!await ProductRepository.deleteById(req.params.id)){
                throw new CannotDeleteException(403, 'No Products were deleted');
            };
    
            return res.status(200).json({ message: 'Product successfully deleted' });
        } catch (error) {
            return next(error);
        }
    }
    
    static patch = async (req, res, next) => {
        try {
            const productId = req.params.id;
            const product = {...req.body.product};

            if(!await ProductRepository.getById(productId)) { 
                throw new NotFoundException(404, 'No Products found')
            }

            const dbMappedFields = ObjectHelper.deleteEmptyProperties(
                ProductService.mapRequestToDatabaseFields(product)
                );

            if(!await ProductRepository.patchById(productId, dbMappedFields)) {
                throw new CannotUpdateException(403, 'No Product was updated');
            }
    
            return res.status(200).json({message: 'Product updated/patched successfully'});
        } catch (error) {
            return next(error);
        }
    }
}