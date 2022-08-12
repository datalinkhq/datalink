/**
 * Validates if a given log type is valid.
 * @param {String} type - Type of the log.
 * @returns {Boolean} 
 */
async function validate(type: String) {
    if (type === 'Trace' || type === 'Debug' || type === 'Information' || type === 'Warning' || type === 'Error' || type === 'Fatal') {
        return true
    } else {
        return false
    }
}

export default validate