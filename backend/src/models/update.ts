import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Update = new Schema({
    username: {
        type: String
    },
    time: {
        type: Date
    }
});

export default mongoose.model('Update', Update, 'update');