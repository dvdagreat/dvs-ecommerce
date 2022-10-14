import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Cart from './cart';
import Product from './product';

class CartDetail extends Model { }

CartDetail.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cart_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Cart,
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Product,
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'CartDetail'
  },
);

export default CartDetail;