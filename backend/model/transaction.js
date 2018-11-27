const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { TransactionItemSchema } = require('./transactionItem');

const TransactionSchema = new Schema({
    volunteerItems: [
        {
            _id: false,
            item: TransactionItemSchema,
            count: Number
        }
    ],
    shopItems: [
        {
            _id: false,
            item: TransactionItemSchema,
            count: Number
        }
    ],
    authorizedUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
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

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;


/*
array of items
transaction id
authorized user performing
client info
type of transaction
date
*/