import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Delivers = new Schema({
    company: {
        type: String
    },
    delivers: {
        type: Array
    },
    request: {
        farmer: {
            type: String
        },
        nursery: {
            type: String
        }
    }
});

export default mongoose.model('Delivers', Delivers, 'delivers');