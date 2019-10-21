const mongoose = require('mongoose');
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
TransactionItemSchema.statics.getMostRecentRevision = async function() {
    return (await this.aggregate(
        [
            // Group by revisionNumber, assembling an array of docs with each distinct value.
            {
                $group: {
                    _id: '$revisionNumber',
                    items: { $push: '$$ROOT' }
                }
            },
            // Sort the groups by _id descending to put the max revisionNumber group first.
            { $sort: { _id: -1 } },
            // Return just the first (max revisionNumber) group of docs.
            { $limit: 1 }
        ]
    ))[0].items;
};

TransactionItemSchema.statics.getMostRecentRevision = async function() {
    return (await this.aggregate(
        [
            // Group by revisionNumber, assembling an array of docs with each distinct value.
            {
                $group: {
                    _id: '$revisionNumber',
                    items: { $push: '$$ROOT' }
                }
            },
            // Sort the groups by _id descending to put the max revisionNumber group first.
            { $sort: { _id: -1 } },
            // Return just the first (max revisionNumber) group of docs.
            { $limit: 1 }
        ]
    ))[0].items;
};

TransactionItemSchema.statics.getMostRecentRevisionNumber = async function() {
    return (await this.find({}).sort({ revisionNumber: -1 }).limit(1))[0].revisionNumber;
};

const ShopItem = mongoose.model('ShopItem', TransactionItemSchema);
const VolunteerItem = mongoose.model('VolunteerItem', TransactionItemSchema);

module.exports = { ShopItem, VolunteerItem, TransactionItemSchema };
