const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
    caseNumber: {
        type: Number,
        required: true
    },
    alienNumber: {
        type: Number,
        required: true,
    },
    arrivalDate: {
        type: Date,
        required: true,
    }
});

const Client = mongoose.model('Client', Client);

module.exports = Client;
