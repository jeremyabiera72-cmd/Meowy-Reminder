export const SYMPTOM_CATEGORIES = [
    {
        id: "pain",
        name: "Pain",
    },
    {
        id: "body",
        name: "Body",
    },
    {
        id: "energy",
        name: "Energy",
    },
    {
        id: "digestive",
        name: "Digestive",
    },
    {
        id: "appetite",
        name: "Appetite",
    },
    {
        id: "skin",
        name: "Skin",
    },
    {
        id: "sleep",
        name: "Sleep",
    },
    {
        id: "cycle",
        name: "Cycle",
    },
    {
        id: "other",
        name: "Other",
    },
];

export const SYMPTOMS = [
    {
        id: "cramps",
        name: "Cramps",
        category: "pain",
    },
    {
        id: "headache",
        name: "Headache",
        category: "pain",
    },
    {
        id: "backache",
        name: "Backache",
        category: "pain",
    },
    {
        id: "pelvic-pain",
        name: "Pelvic pain",
        category: "pain",
    },
    {
        id: "breast-tenderness",
        name: "Breast tenderness",
        category: "body",
    },
    {
        id: "bloating",
        name: "Bloating",
        category: "body",
    },
    {
        id: "dizziness",
        name: "Dizziness",
        category: "body",
    },
    {
        id: "nausea",
        name: "Nausea",
        category: "digestive",
    },
    {
        id: "diarrhea",
        name: "Diarrhea",
        category: "digestive",
    },
    {
        id: "constipation",
        name: "Constipation",
        category: "digestive",
    },
    {
        id: "fatigue",
        name: "Fatigue",
        category: "energy",
    },
    {
        id: "low-energy",
        name: "Low energy",
        category: "energy",
    },
    {
        id: "cravings",
        name: "Food cravings",
        category: "appetite",
    },
    {
        id: "increased-appetite",
        name: "Increased appetite",
        category: "appetite",
    },
    {
        id: "decreased-appetite",
        name: "Decreased appetite",
        category: "appetite",
    },
    {
        id: "acne",
        name: "Acne",
        category: "skin",
    },
    {
        id: "oily-skin",
        name: "Oily skin",
        category: "skin",
    },
    {
        id: "dry-skin",
        name: "Dry skin",
        category: "skin",
    },
    {
        id: "sleepy",
        name: "Sleepy",
        category: "sleep",
    },
    {
        id: "insomnia",
        name: "Difficulty sleeping",
        category: "sleep",
    },
    {
        id: "spotting",
        name: "Spotting",
        category: "cycle",
    },
    {
        id: "discharge-change",
        name: "Discharge change",
        category: "cycle",
    },
    {
        id: "other",
        name: "Other",
        category: "other",
    },
];

export const getSymptomById = id => {
    return SYMPTOMS.find(symptom => symptom.id === id);
};

export const getSymptomsByCategory = categoryId => {
    return SYMPTOMS.filter(symptom => symptom.category === categoryId);
};
