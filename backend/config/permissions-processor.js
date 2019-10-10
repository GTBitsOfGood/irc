const fs = require('fs');
const path = require('path');

let rawPermissions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'permission-config.json')));

const permissionsGroupsMap = formatPermissions(rawPermissions);
function formatPermissions(rawPermissions) {
    const output = {};

    // deal with inheritance
    const queuedGroups = Object.keys(rawPermissions);
    while (queuedGroups.length > 0) {
        const groupID = findGroupWithCompleteDependencies(queuedGroups, rawPermissions, output);
        if (groupID == null) {
            throw new Error('Circular dependency for permissions inheritance');
        } else {
            const group = rawPermissions[groupID];
            output[groupID] = pullDependenciesForGroup(group, output);
            output[groupID].permissionMap = generatePermissionMap(output[groupID].permissions);
        }
    }

    // create a map to easily check permissions


    return output;
}
function findGroupWithCompleteDependencies(groupNames, rawPerms, finalizedPerms) {
    const index = groupNames.findIndex((groupName) => {
        const group = rawPerms[groupName];
        let dependenciesComplete = true;
        if (group.inherit != null) {
            group.inherit.forEach((depndentGroup) => {
                if (finalizedPerms[depndentGroup] == null) {
                    dependenciesComplete = false;
                }
            });
        }
        return dependenciesComplete;
    });
    let output = null;
    if (index >= 0) {
        output = groupNames[index];
        groupNames.splice(index, 1);
    }
    return output;
}

function pullDependenciesForGroup(group, finalizedPermissions) {
    if (group.inherit != null) {
        group.inherit.forEach((dependencyName) => {
            const dependencyPermissions = finalizedPermissions[dependencyName].permissions;
            group.permissions = group.permissions.concat(dependencyPermissions);
        });
    }
    return group;
}

function generatePermissionMap(permissions) {
    const map = {};
    permissions.forEach((permission) => {
        map[permission] = true;
    });
    return map;
}

module.exports = {
    permissionsGroupsMap
};