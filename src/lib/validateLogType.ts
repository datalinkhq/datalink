async function validate(type: String) {
    if (type === 'Trace' || type === 'Debug' || type === 'Information' || type === 'Warning' || type === 'Error' || type === 'Fatal') {
        return true
    } else {
        return false
    }
}

export default validate