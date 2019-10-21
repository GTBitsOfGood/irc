const RESPONSE = require('../utilities/response');
const PERMISSION_GROUPS_MAP = require('../config/permissions-processor').permissionsGroupsMap;

const express = require('express');
const router = express.Router();
const userModel = require('../model/user');

/**
 * Promotes/demotes the user inputted in @userEmail to @newGroup
 * Requires 'promote' permission
 */
router.post('/setPermissionGroup',
    RESPONSE.generatePermissionsRoute(['promote']),
    async(req, res) => {
        const { userEmail, newGroup } = req.body;
        let output;
        if (PERMISSION_GROUPS_MAP[newGroup]) {
            const queryResult = await userModel.updateOne({ email: userEmail },  { permissionGroup: newGroup });
            if (queryResult.n === 0) {
                output = RESPONSE.generateParameterError({ userEmail: `The inputed user of ${userEmail} `
                        + 'does not exist in the database' });
            } else {
                if (queryResult.nModified === 0) {
                    output = RESPONSE.generateOkResponse(`${userEmail}'s group did not change. He or she was already ${newGroup}.`);
                } else {
                    output = RESPONSE.generateOkResponse(`${userEmail} was promoted successfully to ${newGroup}`);
                }
            }

        } else {
            output = RESPONSE.generateParameterError({ newGroup: `The inputed group of ${newGroup} `
                + 'does not exist' });
        }


        res.json(output);
    });
/**
 * Gets the user permissions for the inputted user @userEmail. Assumes current user if no inputted user email.
 * Requires 'user-access' permission if trying to access permissions other than the caller's own
 */
router.post('/getUserPermissions',
    (req, res, next) => {
        const { userEmail } = req.body;
        const currentUserEmail = res.locals.user.email;
        if (userEmail == null || userEmail === currentUserEmail) {
            getCurrentUserInfoAndSend(res, req, next);
        } else {
            next();
        }
    },
    RESPONSE.generatePermissionsRoute(['user-access']),
    async(req, res) => {
        const { userEmail } = req.body;
        let output;
        const targetUser = await userModel.findOne({ email: userEmail });
        if (targetUser == null) {
            output = RESPONSE.generateParameterError({ userEmail: `The inputed user of ${userEmail} `
                    + 'does not exist in the database' });
        } else {
            output = RESPONSE.generateOkResponse(`${userEmail} permissions exist.`,
                { permissionGroup: targetUser.permissionGroup, permissions: targetUser.getPermissions(),
                    userEmail });
        }

        res.json(output);
    });


/**
 * Gets the current user's permission group and the user's permissions. The permissionGroup of the user calling the end point
 * Sends a response with that info
 */
function getCurrentUserInfoAndSend(res, req, next) {
    const user = res.locals.user;
    const permissionGroup = user.permissionGroup;
    const permissions = user.getPermissions();
    res.json(RESPONSE.generateOkResponse('Current user\'s permissions', { permissionGroup, permissions, userEmail: user.email }));
}

module.exports = router;
