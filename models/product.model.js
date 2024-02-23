import mongoose from 'mongoose';

import mongoosePaginate from 'mongoose-paginate-v2';

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

productSchema.plugin(mongoosePaginate);

export const productModel =  mongoose.model(productCollection, productSchema);