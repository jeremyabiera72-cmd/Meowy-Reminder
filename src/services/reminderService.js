import { STORAGE_KEYS } from "../constants/appConstants";

import { getStoredData, setStoredData } from "./storageService";

function generateId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getReminders() {
    return getStoredData(STORAGE_KEYS.REMINDERS, []);
}

export function getActiveReminders() {
    return getReminders().filter(reminder => reminder.enabled === true);
}

export function createReminder(reminderData) {
    const reminders = getReminders();

    const newReminder = {
        id: generateId(),

        title: reminderData.title,

        description: reminderData.description || "",

        type: reminderData.type || "general",

        date: reminderData.date || null,

        time: reminderData.time || null,

        enabled: reminderData.enabled ?? true,

        repeat: reminderData.repeat || "once",

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
    };

    setStoredData(STORAGE_KEYS.REMINDERS, [newReminder, ...reminders]);

    return newReminder;
}

export function updateReminder(reminderId, updates) {
    const reminders = getReminders();

    const updatedReminders = reminders.map(reminder =>
        reminder.id === reminderId
            ? {
                  ...reminder,
                  ...updates,
                  updatedAt: new Date().toISOString(),
              }
            : reminder,
    );

    setStoredData(STORAGE_KEYS.REMINDERS, updatedReminders);

    return updatedReminders.find(reminder => reminder.id === reminderId) || null;
}

export function toggleReminder(reminderId) {
    const reminder = getReminders().find(item => item.id === reminderId);

    if (!reminder) {
        return null;
    }

    return updateReminder(reminderId, {
        enabled: !reminder.enabled,
    });
}

export function deleteReminder(reminderId) {
    const reminders = getReminders();

    const updatedReminders = reminders.filter(reminder => reminder.id !== reminderId);

    setStoredData(STORAGE_KEYS.REMINDERS, updatedReminders);

    return true;
}
