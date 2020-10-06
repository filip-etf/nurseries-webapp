import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Company = new Schema({
    company_name: {
        type: String
    },
    company_acronym: {
        type: String
    },
    password: {
        type: String
    },
    foundation_date: {
        type: String
    },
    location: {
        type: String
    },
    mail: {
        type: String
    }
});

export default mongoose.model('Company', Company, 'companies');