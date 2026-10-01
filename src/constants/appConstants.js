export const APP_NAME = "MeowyReminder";

export const APP_VERSION = "1.0.0";

export const APP_DESCRIPTION = "A simple personal cycle and wellness tracker.";

export const DATE_FORMAT_OPTIONS = {
    short: {
        year: "numeric",
        month: "short",
        day: "numeric",
    },

    long: {
        year: "numeric",
        month: "long",
        day: "numeric",
    },
};

export const DAYS_PER_WEEK = 7;

export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export const STORAGE_KEYS = {
    THEME: "meowyreminder-theme",
    CYCLE: "meowyreminder-cycle",
    SYMPTOMS: "meowyreminder-symptoms",
    REMINDERS: "meowyreminder-reminders",
    SETTINGS: "meowyreminder-settings",
};
