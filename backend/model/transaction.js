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

/**
 * @param itemType EITHER 'VOLUNTEER' or 'SHOP'
 */
TransactionSchema.statics.getItemsByType = async function(itemType) {
    return this.find({type: itemType})
}

TransactionSchema.statics.getShopItems = async function() {
    return this.getItemsByType("SHOP");
}

TransactionSchema.statics.getVolunteerItems = async function() {
    return this.getItemsByType("VOLUNTEER");
}

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
