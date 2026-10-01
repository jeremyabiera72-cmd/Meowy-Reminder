import { STORAGE_KEYS } from "../constants/appConstants";

import useLocalStorage from "./useLocalStorage";

export default function useReminders() {
    const [reminders, setReminders] = useLocalStorage(STORAGE_KEYS.REMINDERS, []);

    const addReminder = reminder => {
        const newReminder = {
            ...reminder,
            id: reminder.id || crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };

        setReminders(previous => [newReminder, ...previous]);

        return newReminder;
    };

    const updateReminder = (reminderId, updates) => {
        setReminders(previous =>
            previous.map(reminder =>
                reminder.id === reminderId
                    ? {
                          ...reminder,
                          ...updates,
                      }
                    : reminder,
            ),
        );
    };

    const deleteReminder = reminderId => {
        setReminders(previous => previous.filter(reminder => reminder.id !== reminderId));
    };

    const toggleReminder = reminderId => {
        setReminders(previous =>
            previous.map(reminder =>
                reminder.id === reminderId
                    ? {
                          ...reminder,
                          enabled: !reminder.enabled,
                      }
                    : reminder,
            ),
        );
    };

    return {
        reminders,

        addReminder,
        updateReminder,
        deleteReminder,
        toggleReminder,
    };
}
