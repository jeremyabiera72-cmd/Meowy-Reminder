/**
 * Represents a reminder.
 *
 * @typedef {Object} Reminder
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} type
 * @property {string|null} date
 * @property {string|null} time
 * @property {boolean} enabled
 * @property {"once"|"daily"|"weekly"|"monthly"} repeat
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Data required to create a reminder.
 *
 * @typedef {Object} CreateReminderData
 * @property {string} title
 * @property {string} [description]
 * @property {string} [type]
 * @property {string|null} [date]
 * @property {string|null} [time]
 * @property {boolean} [enabled]
 * @property {"once"|"daily"|"weekly"|"monthly"} [repeat]
 */

/**
 * Data used to update a reminder.
 *
 * @typedef {Object} UpdateReminderData
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [type]
 * @property {string|null} [date]
 * @property {string|null} [time]
 * @property {boolean} [enabled]
 * @property {"once"|"daily"|"weekly"|"monthly"} [repeat]
 */
