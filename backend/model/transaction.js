const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ShopItem, VolunteerItem } = require('transactionItem.js');

const Transaction = new Schema({
    volunteerItems: {
        type: [VolunteerItem],
    },
    shopItems: {
        type: [ShopItem],
    },
    authorizedUser: {
        type: ObjectId,
        required: true,
    },
    clientId: {
        type: ObjectId,
        required: true,
    },
    type: {
        type: String,
        enum: ['VOLUNTEER', 'SHOP'],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', Transaction);
module.exports = Transaction;


/*
array of items
transaction id
authorized user performing
client info
type of transaction
date
*/