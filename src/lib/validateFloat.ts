/**
 * Updates the flagValue of a {@link prisma} model Flag.
 * @param {Number} float - Float to be validated.
 */

export default async function validate(float: Number) {
    if (float >= 0 && float <= 1) {
        return true
    } else {
        return false
    }
}