import { STORAGE_KEYS } from "../constants/appConstants";

import { getStoredData, setStoredData } from "./storageService";

function generateId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getSymptoms() {
    return getStoredData(STORAGE_KEYS.SYMPTOMS, []);
}

export function getSymptomsByCycle(cycleId) {
    const symptoms = getSymptoms();

    return symptoms.filter(symptom => symptom.cycleId === cycleId);
}

export function getSymptomsByDate(date, cycleId = null) {
    const symptoms = getSymptoms();

    const dateKey = new Date(date).toISOString().split("T")[0];

    return symptoms.filter(symptom => {
        const symptomDate = new Date(symptom.date).toISOString().split("T")[0];

        const sameDate = symptomDate === dateKey;

        const sameCycle = !cycleId || symptom.cycleId === cycleId;

        return sameDate && sameCycle;
    });
}

export function createSymptom(symptomData) {
    const symptoms = getSymptoms();

    const newSymptom = {
        id: generateId(),

        cycleId: symptomData.cycleId,

        date: symptomData.date,

        symptoms: symptomData.symptoms || [],

        severity: symptomData.severity || "mild",

        note: symptomData.note || "",

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
    };

    const updatedSymptoms = [newSymptom, ...symptoms];

    setStoredData(STORAGE_KEYS.SYMPTOMS, updatedSymptoms);

    return newSymptom;
}

export function updateSymptom(symptomId, updates) {
    const symptoms = getSymptoms();

    const updatedSymptoms = symptoms.map(symptom =>
        symptom.id === symptomId
            ? {
                  ...symptom,
                  ...updates,
                  updatedAt: new Date().toISOString(),
              }
            : symptom,
    );

    setStoredData(STORAGE_KEYS.SYMPTOMS, updatedSymptoms);

    return updatedSymptoms.find(symptom => symptom.id === symptomId) || null;
}

export function deleteSymptom(symptomId) {
    const symptoms = getSymptoms();

    const updatedSymptoms = symptoms.filter(symptom => symptom.id !== symptomId);

    setStoredData(STORAGE_KEYS.SYMPTOMS, updatedSymptoms);

    return true;
}
