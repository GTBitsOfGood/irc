const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../model/transaction.js');
const UserModel = require('../model/user');
const UserDB = mongoose.model('User', UserModel.__Schema);
const { ShopItem, VolunteerItem } = require('../model/transactionItem.js');
const response = require('../utilities/response.js');

router.get('/client', async(req, res, next) => {
    try {
        const allTransactionsByClient = await Transaction.find({
            clientId: req.query.id,
        });
        const message = response.generateOkResponse('Success', allTransactionsByClient);
        res.json(message);
    } catch (err) {
        res.json(response.generateInternalServerError(err));
    }
});

router.get('/authorizedUser', async(req, res, next) => {
    try {
        const allTransactionsByAuthorizer = await Transaction.find({
            authorizedUser: req.query.id
        });
        const message = response.generateOkResponse('Success', allTransactionsByAuthorizer);
        res.json(message);
    } catch (err) {
        res.json(response.generateInternalServerError(err));
    }
});

router.get('/getShopItems', async(req, res, next) => {
    if (req.query.revisionNumber) {
        console.log(req.query.revisionNumber);
        try {
            const allItemsByVersion = await ShopItem.find({
                revisionNumber: req.query.revisionNumber
            });
            const message = response.generateOkResponse('Success', allItemsByVersion);
            res.json(message);
        } catch (err) {
            res.json(response.generateInternalServerError(err));
        }
    } else {
        try {
            let allItemsByMostRecentVersion = await ShopItem.getMostRecentRevision();
            const message = response.generateOkResponse('Success', allItemsByMostRecentVersion);
            res.json(message);
        } catch (err) {
            res.json(response.generateInternalServerError(err));
        }
    }
});

router.get('/getVolunteerItems', async(req, res, next) => {
    if (req.query.revisionNumber) {
        try {
            const allItemsByVersion = await VolunteerItem.find({
                revisionNumber: req.query.revisionNumber
            });
            const message = response.generateOkResponse('Success', allItemsByVersion);
            res.json(message);
        } catch (err) {
            res.json(response.generateInternalServerError(err));
        }
    } else {
        try {
            let allItemsByMostRecentVersion = await VolunteerItem.getMostRecentRevision();
            const message = response.generateOkResponse('Success',
                allItemsByMostRecentVersion);
            res.json(message);
        } catch (err) {
            res.json(response.generateInternalServerError(err));
        }
    }
});

router.get('/getTransaction', async(req, res, next) => {
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
        const message = response.generateOkResponse('Success', allTransactions);
        res.json(message);
    } catch (err) {
        res.json(response.generateInternalServerError(err));
    }
});

router.post('/updateItems', async(req, res, next) => {
    const { updatedItems, itemType } = req.body;

    let maxRevisionNumber;
    if (itemType === 'SHOP') {
        maxRevisionNumber = await ShopItem.getMostRecentRevisionNumber();
    } else if (itemType === 'VOLUNTEER') {
        maxRevisionNumber = await VolunteerItem.getMostRecentRevisionNumber();
    }
    for (let i = 0; i < updatedItems.length; i++) {
        const item = updatedItems[i];
        item.revisionNumber = maxRevisionNumber + 1;
        if (item.dateUpdated != null) {
            delete item.dateUpdated;
        }
    }

    if (itemType === 'SHOP') {
        ShopItem.create(updatedItems, (err) => {
            if (err) {
                res.json(response.generateInternalServerError(err));
                return;
            }

            res.json(response.generateOkResponse('Success'));
        });
    } else if (itemType === 'VOLUNTEER') {
        VolunteerItem.create(updatedItems, (err) => {
            if (err) {
                res.json(response.generateInternalServerError(err));
                return;
            }

            res.json(response.generateOkResponse('Success'));
        });
    } else {
        res.json(response.generateInternalServerError('Invalid item type:' +
        'should be either SHOP or VOLUNTEER.'));
    }
});

router.post('/addTransaction', async(req, res, next) => {
    const { transaction } = req.body;
    Transaction.create(transaction, (err) => {
        if (err) {
            res.json(response.generateInternalServerError(err));
            return;
        }

        res.json(response.generateOkResponse('Success'));
    });
});

router.get('/getStats', async(req, res, next) => {
    const userCount = await UserDB.getCount();
    const shopCount = (await Transaction.getShopItems()).length;
    const volunteerCount = (await Transaction.getVolunteerItems()).length;
    const output = {
        userCount,
        shopCount,
        volunteerCount
    };
    res.json(response.generateOkResponse('Statistics all good', output));
});

module.exports = router;
