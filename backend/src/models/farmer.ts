import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Farmer = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    birthday_date: {
        type: String
    },
    birthday_city: {
        type: String
    },
    phone: {
        type: String
    },
    mail: {
        type: String
    }
});

export default mongoose.model('Farmer', Farmer, 'farmers');