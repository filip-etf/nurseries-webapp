import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Business_report = new Schema({
    company: {
        type: String
    },
    day: {
        type: Date
    },
    orders: {
        products: {
            product_name : {
                type: Array
            }
        },
        bill: {
            type: String
        },
        farmer_firstname: {
            type: String
        },
        farmer_lastname: {
            type: String
        },
        nursery_location: {
            type: String
        }
    }
});

export default mongoose.model('Business_report', Business_report, 'business_report');