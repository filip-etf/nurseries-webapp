import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Product_request = new Schema({
    username: {
        type: String
    },
    product_array: {
        type: Array
    },
    producer: {
        type: String
    },
    location: {
        type: String
    },
    nursery_name: {
        type: String
    },
    filing_date: {
        type: String
    },
    status: {
        type: String
    }
});

export default mongoose.model('Product_request', Product_request, 'products_requests');