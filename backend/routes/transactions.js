const express = require('express');
const router = express.Router();
const Transaction = require('../model/transaction.js');
const { ShopItem, VolunteerItem } = require('../model/transactionItem.js')
const response = require('../utilities/response.js');

router.get('/client', async (req, res, next) => {
    try {
        const allTransactionsByClient = await Transaction.find({
            clientId: req.query.id,
        });
        const message = response.generateOkResponse("Success", allTransactionsByClient);
        res.json(message);
    } catch (err) {
        res.json(response.generateInternalServerError(err));
    }
});

router.get('/authorizedUser', async (req, res, next) => {
    try {
        const allTransactionsByAuthorizer = await Transaction.find({
            authorizedUser: req.query.id
        });
        const message = response.generateOkResponse("Success", allTransactionsByAuthorizer);
        res.json(message);
    } catch (err) {
        res.json(response.generateInternalServerError(err));
    }
});

router.get('/getShopItems', async (req, res, next) => {
    if (req.query.revisionNumber) {
        try {
            const allItemsByVersion = await ShopItem.find({
                revisionNumber: req.query.revisionNumber
            });
            const message = response.generateOkResponse("Success", allItemsByVersion);
            res.json(message)
        } catch (err) {
            res.json(response.generateInternalServerError(err));
        }
    } else {
        try {
            let allItemsByMostRecentVersion = await ShopItem.aggregate(
                [
                    // Group by revisionNumber, assembling an array of docs with each distinct value.
                    {
                        $group: {
                            _id: '$revisionNumber',
                            items: { $push: '$$ROOT' }
                        }
                    },
                    // Sort the groups by _id descending to put the max revisionNumber group first.
                    { $sort: { revisionNumber: -1 } },
                    // Return just the first (max revisionNumber) group of docs.
                    { $limit: 1 }
                ]
            );
            allItemsByMostRecentVersion = allItemsByMostRecentVersion[0].items;
            const message = response.generateOkResponse("Success", allItemsByMostRecentVersion);
            res.json(message)
        } catch (err) {
            res.json(response.generateInternalServerError(err));
        }
    }
});

router.get('/getVolunteerItems', async (req, res, next) => {
    if (req.query.revisionNumber) {
        try {
            const allItemsByVersion = await VolunteerItem.find({
                revisionNumber: req.query.revisionNumber
            });
            const message = response.generateOkResponse("Success", allItemsByVersion);
            res.json(message)
        } catch (err) {
            res.json(response.generateInternalServerError(err));
        }
    } else {
        try {
            const allItemsByMostRecentVersion = await VolunteerItem.aggregate(
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
            );
            const message = response.generateOkResponse("Success", 
            allItemsByMostRecentVersion[0].items);
            res.json(message)
        } catch (err) {
            res.json(response.generateInternalServerError(err));
        }
    }
});

router.get('/getTransaction', async (req, res, next) => {
    const { startDate, endDate, transactionType } = req.query;

    let query = {};
    if (transactionType) {
        query.type = transactionType;
    }

    if (startDate) {
        query.date = {};
        query.date['$gte'] = new Date(startDate);
    }

    if (endDate) {
        if (!query.date) {
            query.date = {};
        }
        query.date['$lt'] = new Date(endDate);
    }

    try {
        const allTransactions = await Transaction.find(query);
        const message = response.generateOkResponse("Success", allTransactions);
        res.json(message);
    } catch (err) {
        res.json(response.generateInternalServerError(err));
    }
});

router.post('/updateItems', async (req, res, next) => {
    const { updatedItems, itemType } = req.body;

    if (itemType === 'SHOP') {
        for (let i = 0; i < updatedItems.length; i++) {
            updatedItems[i].revisionNumber++;
        }

        ShopItem.create(updatedItems, (err) => {
            if (err) {
                res.json(response.generateInternalServerError(err));
                return;
            }

            res.json(response.generateOkResponse("Success"));
        });
    } else if (itemType === 'VOLUNTEER') {
        for (let i = 0; i < updatedItems.length; i++) {
            updatedItems[i].revisionNumber++;
        }

        VolunteerItem.create(updatedItems, (err) => {
            if (err) {
                res.json(response.generateInternalServerError(err));
                return;
            }

            res.json(response.generateOkResponse("Success"));
        });
    } else {
        res.json(response.generateInternalServerError("Invalid item type:" +
        "should be either SHOP or VOLUNTEER."));
    }
});

router.post("/addTransaction", async (req, res, next) => {
    const { transaction } = req.body;
    Transaction.create(transaction, (err) => {
        if (err) {
            res.json(response.generateInternalServerError(err));
            return;
        }

        res.json(response.generateOkResponse("Success"));
    });
});

module.exports = router;
