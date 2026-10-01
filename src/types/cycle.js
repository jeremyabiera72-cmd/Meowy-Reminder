/**
 * Represents one menstrual cycle.
 *
 * @typedef {Object} Cycle
 * @property {string} id
 * @property {number} cycleNumber
 * @property {string} startDate
 * @property {string|null} endDate
 * @property {number|null} cycleLength
 * @property {number|null} periodLength
 * @property {boolean} isActive
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Data required to create a cycle.
 *
 * @typedef {Object} CreateCycleData
 * @property {string} startDate
 * @property {string|null} [endDate]
 * @property {number|null} [cycleLength]
 * @property {number|null} [periodLength]
 */

/**
 * Data used to update a cycle.
 *
 * @typedef {Object} UpdateCycleData
 * @property {string} [startDate]
 * @property {string|null} [endDate]
 * @property {number|null} [cycleLength]
 * @property {number|null} [periodLength]
 * @property {boolean} [isActive]
 */
