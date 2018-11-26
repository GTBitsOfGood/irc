const express = require('express');
const router = express.Router();
const Transaction = require('../model/transaction.js');
const { ShopItem, VolunteerItem } = require('../model/transactionItem.js')


router.get('/client', async (req, res, next) => {
    try {
        const allTransactionsByClient = await Transaction.find({
            clientId: req.query.id
        });
        res.json(allTransactionsByClient);
    } catch (err) {
        next(err);
    }
});

router.get('/authorizedUser', async (req, res, next) => {
    try {
        const allTransactionsByAuthorizer = await Transaction.find({
            authorizedUser: req.query.id
        });
        res.json(allTransactionsByAuthorizer);
    } catch (err) {
        next(err);
    }
});

router.get('/getShopItems', async (req, res, next) => {
    if (req.query.revisionNumber) {
        try {
            const allItemsByVersion = await ShopItem.find({
                revisionNumber: req.query.revisionNumber
            });
            res.json(allItemsByVersion);
        } catch (err) {
            next(err);
        }
    } else {
        try {
            const allItemsByMostRecentVersion = await ShopItem.aggregate(
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
            res.json(allItemsByMostRecentVersion);
        } catch (err) {
            next(err);
        }
    }
});

router.get('/getVolunteerItems', async (req, res, next) => {
    if (req.query.revisionNumber) {
        try {
            const allItemsByVersion = await VolunteerItem.find({
                revisionNumber: req.query.revisionNumber
            });
            res.json(allItemsByVersion);
        } catch (err) {
            next(err);
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
                    { $sort: { revisionNumber: -1 } },
                    // Return just the first (max revisionNumber) group of docs.
                    { $limit: 1 }
                ]
            );
            res.json(allItemsByMostRecentVersion);
        } catch (err) {
            next(err);
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
        query.date['$gte'] = new Date(startDate);
    }

    if (endDate) {
        query.date['$lt'] = new Date(endDate);
    }

    try {
        const allTransactions = await Transaction.find(query);
        res.json(allTransactions);
    } catch (err) {
        next(err);
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
                res.status(500).send(err);
                return;
            }

            res.status(200).send("Success");
        });
    } else if (itemType === 'VOLUNTEER') {
        for (let i = 0; i < updatedItems.length; i++) {
            updatedItems[i].revisionNumber++;
        }

        VolunteerItem.create(updatedItems, (err) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.status(200).send("Success");
        });
    } else {
        res.status(500).send("Invalid item type: should be either SHOP or VOLUNTEER.");
    }
});

module.exports = router;
