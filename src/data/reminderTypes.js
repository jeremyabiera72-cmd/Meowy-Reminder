export const REMINDER_TYPES = [
    {
        id: "period",
        name: "Period",
        description: "Reminder for an estimated period date.",
    },
    {
        id: "symptom",
        name: "Symptoms",
        description: "Reminder to record today's symptoms.",
    },
    {
        id: "mood",
        name: "Mood",
        description: "Reminder to record today's mood.",
    },
    {
        id: "journal",
        name: "Journal",
        description: "Reminder to write a journal entry.",
    },
    {
        id: "general",
        name: "General",
        description: "A personal reminder.",
    },
];

export const getReminderTypeById = id => {
    return REMINDER_TYPES.find(type => type.id === id);
};
