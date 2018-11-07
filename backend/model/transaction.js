const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransactionItem = require('transactionItem.js');
const User = require('user.js');
const Client = require('client.js');

const Transaction = new Schema({
    items : {
        type : [TransactionItem],
        required : true,
    }, 
    authorizedUser : {
        type : User,
        required : true,
    }, 
    client : {
        type : Client,
        required : true,
    },
    type : {
        type : String,
        enum : ['VOLUNTEER', 'SHOP'],
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
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