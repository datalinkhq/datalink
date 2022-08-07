export default async function validate(float: Number) {
    if (float >= 0 && float <= 1) {
        return true
    } else {
        return false
    }
}