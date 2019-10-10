const RESPONSE = require('../utilities/response');

const express = require('express');
const router = express.Router();
const clientModel = require('../model/client');

router.post('/addClient', async (req, res) => {
    const client = req.body;
    if (client.caseNumber && await clientModel.clientExists(client.caseNumber)) {
        res.json(RESPONSE.generateParameterError({caseNumber: 'A client already exists with this case number'}));
    } else {
        clientModel.create(client, (err, newClient) => {
            if (!!err) {
                res.json(RESPONSE.generateResponseMessage('Error 400 - Bad Request- ' +
                    'Invalid syntax when trying to' +
                    ' create client (see error)', 400, error = err));
            } else {
                res.json(RESPONSE.generateOkResponse("Client added successfully", newClient));
            }
        });
    }
});

router.post('/updateClient', async (req, res) => {
    const updateInfo = req.body;
    if (updateInfo.caseNumber && await clientModel.clientExists(updateInfo.caseNumber)) {
        const existingClient = await clientModel.findOne({caseNumber: updateInfo.caseNumber});
        Object.keys(updateInfo).forEach((key) => {
           existingClient[key] = updateInfo[key];
        });
        existingClient.save();
        res.json(RESPONSE.generateOkResponse("Client updated successfully", existingClient));
    } else {
        res.json(RESPONSE.generateParameterError({caseNumber: 'Either the case number ' +
                'you gave was null or a client with that case number already exists'}));
    }
});

router.get('/:id?', async (req, res) => {
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
