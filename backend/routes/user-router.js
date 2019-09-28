const RESPONSE = require('../utilities/response');
const PERMISSION_GROUPS_MAP = require('../config/permissions-processor').permissionsGroupsMap;

const express = require('express');
const router = express.Router();
const userModel = require('../model/user');

/**
 * Gets the current user's permission group. The permissionGroup of the user calling the end point
 */
router.get('/permissionGroup', async (req, res) => {
    const user = res.locals.user;
    const permissionGroup = user.permissionGroup;
    res.json(RESPONSE.generateOkResponse(permissionGroup, {permissionGroup: permissionGroup}));
});
/**
 * Gets the user's permissions. The permissions of the user calling the end point
 */
router.get('/permissions', async (req, res) => {
    const user = res.locals.user;
    const permissions = user.getPermissions();
    res.json(RESPONSE.generateOkResponse(`Current user has permissions: [${permissions}]`, {permissions: user.getPermissions()}));
});

/**
 * Promotes/demotes the user inputted in @userEmail to @newGroup
 * Requires 'promote' permission
 */
router.post('/setPermissionGroup',
    RESPONSE.generatePermissionsRoute(['promote']),
    async (req, res) => {
        const { userEmail, newGroup } = req.body;
        let output;
        if (PERMISSION_GROUPS_MAP[newGroup]) {
            const queryResult = await userModel.updateOne({email: userEmail},  {permissionGroup: newGroup});
            if (queryResult.n === 0) {
                output = RESPONSE.generateParameterError({userEmail: `The inputed user of ${userEmail} `
                        + `does not exist in the database`});
            } else {
                if (queryResult.nModified === 0) {
                    output = RESPONSE.generateOkResponse(`${userEmail}'s group did not change. He or she was already ${newGroup}.`);
                } else {
                    output = RESPONSE.generateOkResponse(`${userEmail} was promoted successfully to ${newGroup}`);
                }
            }

        } else {
            output = RESPONSE.generateParameterError({newGroup: `The inputed group of ${newGroup} `
                + `does not exist`});
        }


        res.json(output);
});
/**
 * Gets the user permissions for the inputted user @userEmail.
 * Requires 'user-access' permission
 */
router.post('/getUserPermissions',
    RESPONSE.generatePermissionsRoute(['user-access']),
    async (req, res) => {
        const { userEmail } = req.body;
        let output;
        const targetUser = await userModel.findOne({email: userEmail});
        if (targetUser == null) {
            output = RESPONSE.generateParameterError({userEmail: `The inputed user of ${userEmail} `
                    + `does not exist in the database`});
        } else {
            output = RESPONSE.generateOkResponse(`${userEmail} permissions exist.`,
                {permissionGroup: targetUser.permissionGroup, permissions: targetUser.getPermissions()});
        }

        res.json(output);
});
module.exports = router;
