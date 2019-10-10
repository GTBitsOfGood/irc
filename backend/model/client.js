const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    caseNumber: {
        type: Number,
        unique: true,
        required: true,
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

ClientSchema.statics.clientExists = async function(caseNumber) {
    return (await this.countDocuments({caseNumber: caseNumber})) > 0;
};
ClientSchema.statics.greatestCaseNumber = async function(caseNumber) {

    return (await this.findOne({})
        .sort('-caseNumber')).caseNumber;
};
ClientSchema.pre('validate', async function(next) {
    if (this.caseNumber == null) {
        this.caseNumber = await Client.greatestCaseNumber() + 1;
    }
    next();
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
