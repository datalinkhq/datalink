async function validate(type: String) {
    if (type === 'error' || type === 'warning' || type === 'info') {
        return true
    } else {
        return false
    }
}

export default validate