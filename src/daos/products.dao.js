import { productModel } from '../../models/product.model.js';

export default class ProductsDao {

    static async getAllProducts(limit) {
        return productModel.find().limit(limit).lean();
    }

    static async getProductById(id) {
        return productModel.findOne({_id: id}).lean();
    }

    static async addProduct({title, description, category, price, code, stock, thumbnail}) {
        let status = true;
        return new productModel({ title, description, category, price, code, stock, thumbnail, status}).save();
    }

    static async updateProduct(id, data) {
        return productModel.updateOne({_id: id}, data);
    }

    static async removeProduct(id) {
        return productModel.deleteOne(id);
    }

}