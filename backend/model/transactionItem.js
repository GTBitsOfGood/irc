const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionItem = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    percentageMatched: {
        type: Number,
        required: true,
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    revisionNumber: {
        type: Number,
        required: true,
    }
});

const ShopItem = mongoose.model('ShopItem', TransactionItem);
const VolunteerItem = mongoose.model('VolunteerItem', TransactionItem);

module.exports = { ShopItem, VolunteerItem };