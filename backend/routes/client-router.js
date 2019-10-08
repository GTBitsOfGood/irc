const RESPONSE = require('../utilities/response');

const express = require('express');
const router = express.Router();
const clientModel = require('../model/client');

router.post('/addClient', async (req, res, next) => {
    const client = req.body;
    clientModel.create(client, (err) => {
        if (!!err) {
            res.json(RESPONSE.generateResponseMessage('Error 400 - Bad Request- ' +
                'Invalid syntax when trying to' +
                ' create client (see error)', 400, error = err));
        } else {
            res.json(RESPONSE.generateOkResponse("Client added successfully"));
        }
    });
});

router.get('/:id?', async (req, res, next) => {
    try {
        const clientID = req.params.id;

        let filter = clientID == null ? {} : {caseNumber: clientID};

        const output = await clientModel.find(filter);
        res.json(RESPONSE.generateOkResponse("All is well.", output));
    } catch (err) {
        res.json(RESPONSE.generateInternalServerError(err));
    }
});



module.exports = router;
