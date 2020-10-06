import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Stockroom = new Schema({
    farmer: {
        type: String
    },
    nursery: {
        type: String
    },
    items: {
        type: Array
    }
});

export default mongoose.model('Stockroom', Stockroom, 'stockroom');