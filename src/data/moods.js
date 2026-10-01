export const MOODS = [
    {
        id: "great",
        name: "Great",
        symbol: "↑",
    },
    {
        id: "good",
        name: "Good",
        symbol: "•",
    },
    {
        id: "okay",
        name: "Okay",
        symbol: "—",
    },
    {
        id: "low",
        name: "Low",
        symbol: "↓",
    },
    {
        id: "irritated",
        name: "Irritated",
        symbol: "!",
    },
    {
        id: "tired",
        name: "Tired",
        symbol: "z",
    },
];

export const getMoodById = id => {
    return MOODS.find(mood => mood.id === id);
};
