const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
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

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
