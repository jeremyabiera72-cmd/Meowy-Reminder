/**
 * Represents a symptom record.
 *
 * @typedef {Object} SymptomEntry
 * @property {string} id
 * @property {string} cycleId
 * @property {string} date
 * @property {string[]} symptoms
 * @property {"mild"|"moderate"|"severe"} severity
 * @property {string} note
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Data required to create a symptom record.
 *
 * @typedef {Object} CreateSymptomData
 * @property {string} cycleId
 * @property {string} date
 * @property {string[]} symptoms
 * @property {"mild"|"moderate"|"severe"} [severity]
 * @property {string} [note]
 */

/**
 * Data used to update a symptom record.
 *
 * @typedef {Object} UpdateSymptomData
 * @property {string[]} [symptoms]
 * @property {"mild"|"moderate"|"severe"} [severity]
 * @property {string} [note]
 */
