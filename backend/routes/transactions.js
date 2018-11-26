const express = require('express');
const router = express.Router();
const Transaction = require('../model/transaction.js');
const TransactionItem = require('../model/transactionItem.js')


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

router.get('/items', async (req, res, next) => {
    try {
        const allItemsByVersion = await TransactionItem.find({
            revisionNumber: req.query.revisionNumber
        });
        res.json(allItemsByVersion);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
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

    } else if (itemType === 'VOLUNTEER') {

    } else {
        res.status(500).send("Invalid item type: should be either SHOP or VOLUNTEER.");
    }


});

module.exports = router;
