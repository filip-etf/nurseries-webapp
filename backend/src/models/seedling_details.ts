import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Seedling = new Schema({
    username: {
        type: String
    },
    producer_name: {
        type: String
    },
    growing_time: {
        type: String
    },
    type: {
        type: String
    },
    name: {
        type: String
    },
    preparations: {
        type: Array
    },
    available_quantity: {
        type: String
    },
    avarage_rating: {
        type: String
    },
    unit_price: {
        type: String
    }
});

export default mongoose.model('Seedling', Seedling, 'company_products');