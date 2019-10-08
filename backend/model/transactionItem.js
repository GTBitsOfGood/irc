const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionItemSchema = new Schema({
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
  },
  id: {
    type: Number,
    required: true
  }
});

const ShopItem = mongoose.model("ShopItem", TransactionItemSchema);
const VolunteerItem = mongoose.model("VolunteerItem", TransactionItemSchema);

module.exports = { ShopItem, VolunteerItem, TransactionItemSchema };
