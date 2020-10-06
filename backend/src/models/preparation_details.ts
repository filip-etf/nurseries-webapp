import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Preparation = new Schema({
    username: {
        type: String
    },
    producer_name: {
        type: String
    },
    accelerating_time: {
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

export default mongoose.model('Preparation', Preparation, 'company_products');