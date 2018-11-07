const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionItem = new Schema({
    name : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    percentageMatched : {
        type : Number,
        required : true,
    },
    dateUpdated : {
        type : Date,
        default : Date.now
    }
});

const TransactionItem = mongoose.model('TransactionItem', TransactionItem);

module.exports = TransactionItem;