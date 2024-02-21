import mongoose from 'mongoose';

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
    thumbnail: Array,
    status: Boolean
});

export const productModel =  mongoose.model(productCollection, productSchema);