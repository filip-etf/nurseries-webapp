import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Comment = new Schema({
    username: {
        type: String
    },
    rating: {
        type: Number
    },
    product_name: {
        type: String
    },
    describe: {
        type: String
    },
    company: {
        type: String
    }
});

export default mongoose.model('Comment', Comment, 'comments');