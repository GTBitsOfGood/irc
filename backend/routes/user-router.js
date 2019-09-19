const RESPONSE = require('../utilities/response');
const PERMISSION_GROUPS_MAP = require('../config/permissions-processor').permissionsGroupsMap;

const express = require('express');
const router = express.Router();
const userModel = require('../model/user');


router.get('/permissionGroup', async (req, res, next) => {
    const user = res.locals.user;
    const permissionGroup = user.permissionGroup;
    res.json(RESPONSE.generateOkResponse(permissionGroup, {permissionGroup: permissionGroup}));
});
router.post('/promoteUser', async (req, res, next) => {
    const userAttemptingPromotion = res.locals.user;
    const { userEmail, newGroup } = req.body;

    let output;
    if (userAttemptingPromotion.hasPermission('promote')) {
        if (PERMISSION_GROUPS_MAP[newGroup]) {
            const queryResult = await userModel.updateOne({email: userEmail},  {permissionGroup: newGroup});
            if (queryResult.n == 0) {
                output = RESPONSE.generateParameterError({userEmail: `The inputed user of ${userEmail} `
                        + `does not exist in the database`});
            } else {
                output = RESPONSE.generateOkResponse(`${userEmail} was promoted successfully to ${newGroup}`);
            }

        } else {
            output = RESPONSE.generateParameterError({newGroup: `The inputed group of ${newGroup} `
                + `does not exist`});
        }

    } else {
        output = RESPONSE.generatePermissionsError(userAttemptingPromotion.permissionGroup, ['promote']);
    }
    res.json(output);
});
module.exports = router;
