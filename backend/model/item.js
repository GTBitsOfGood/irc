const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    name : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    dateUpdated : {
        type : Date,
        required : true
    }
});

const Item = mongoose.model('item',UserSchema);

module.exports = Item;