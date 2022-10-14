'use strict';
import { Sequelize } from 'sequelize';
import sequelize from '../db'
import Cart from './cart';
import CartDetail from './cartdetails';
import Product from './product';
import User from './user';

User.hasOne(Cart, {
    foreignKey: 'user_id'
});

Cart.belongsTo(User, {
    foreignKey: 'user_id'
});

Product.belongsToMany(Cart, {
    through: { model: CartDetail },
    foreignKey: 'product_id',
    otherKey: 'cart_id'
});

Cart.belongsToMany(Product, {
    through: { model: CartDetail },
    foreignKey: 'cart_id',
    otherKey: 'product_id'
});

CartDetail.belongsTo(Cart, { foreignKey: 'cart_id' });
CartDetail.belongsTo(Product, { foreignKey: 'product_id' });

export { 
    Sequelize, 
    sequelize, 
    User, 
    Product, 
    Cart, 
    CartDetail 
};