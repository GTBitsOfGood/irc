// the code that indicates there is no error
const OK_CODE = 200;

/**
 * Generates error message and returns json object in appropriate format
 * @param {string} message 
 * @param {int} errorCode 
 * @param {string} error 
 */
function generateResponseMessage (message, errorCode, error = null,
    additionalParameters = null) {
    let response = {
        message: message,
        errorCode: errorCode
    };

    if (errorCode != OK_CODE) {
        response.error = error;
    }
    if (!!additionalParameters) {
        response.body = additionalParameters;
    }
    return response;
}

/**
 * Generates error message and returns json string in appropriate format
 * @param {string} message 
 * @param {int} errorCode 
 * @param {string} error 
 */
function responseString (message, errorCode, error = null,
    additionalParameters = null) {
    return JSON.stringify(generateResponseMessage(message, errorCode, error, additionalParameters));
}

/**
 * Essentially chains a method so less parameters need to be supplied
 * @param {string} message - the message
 * @param {*} additionalParameters - any additional parameters for the message
 * body
 */
function generateOkResponse (message, additionalParameters = null) {
    return generateResponseMessage(message, OK_CODE, null, additionalParameters);
}

/**
* Returns message body for when the user cannot be found
* @param {string} user email 
*/
function generateUserNotFoundError (email) {
    return generateResponseMessage('User not found', 404, error = 'Error 404 - ' +
    'Resource Not Found - A user could not be found with the associated email, ' 
    + email);
}

/**
 * Generates error message
 */
function generateTokenError () {
    return generateResponseMessage('No token cookie provided', 401, 
    error = 'Error 401 - Unauthorized - No login token  provided')
}

/**
 * Generates permission error message
 */
function generatePermissionsError (userGroup, permissionsNeeded) {
    return generateResponseMessage(`User of ${userGroup} does not have the required permissions.`, 401,
        error = 'Error 401 - Unauthorized permissions', {permissionsNeeded});
}

/**
 *
 * @param invalidParametersMap - map of the parameter that is invalid and the reason/justification
 */
function generateParameterError (invalidParametersMap) {
    return generateResponseMessage('The route was called with invalid parameters', 400,
        error = `Error 400 - Invalid/Bad request because of bad parameters`, {invalidParameters: invalidParametersMap});
}

/**
 * Generates internal server error
 * @param {Object} error - null by default. Object
 */
function generateInternalServerError (error = null) {
    const errorCode = 500;
    const errorMessage = "Error 500 - Internal Server. Unknown." ;

    const message = "Internal server error. Check console for details"
    return generateResponseMessage(message, errorCode, errorMessage, 
        !!error ? {error}: errorMessage);
}
module.exports = {
    OK_CODE: OK_CODE,
    generateOkResponse,
    generateInternalServerError,
    generateResponseMessage,
    generateUserNotFoundError,
    generateTokenError,
    generatePermissionsError,
    generateParameterError,
    responseString
}