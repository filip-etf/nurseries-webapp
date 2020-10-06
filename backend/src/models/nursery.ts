import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Nursery = new Schema({
    farmer: {
        type: String
    },
    name: {
        type: String
    },
    location: {
        type: String
    },
    width: {
        type: String
    },
    height: {
        type: String
    },
    temperature: {
        type: String
    },
    water: {
        type: String
    },
    plants: {
        type: Array
    }
});

export default mongoose.model('Nursery', Nursery, 'nurseries');