import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Request = new Schema({
    company_name: {
        type: String
    },
    company_acronym: {
        type: String
    },
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
    date: {
        type: String
    },
    location: {
        type: String
    },
    phone: {
        type: String
    },
    mail: {
        type: String
    },
    type: {
        type: String
    }
});

export default mongoose.model('Request', Request, 'requests');