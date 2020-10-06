import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Company_products = new Schema({
    producer_name: {
        type: String
    },
    type: {
        type: String
    },
    name: {
        type: String
    },
    available_quantity: {
        type: String
    },
    unit_price: {
        type: String
    }
});

export default mongoose.model('Company_products', Company_products, 'company_products');