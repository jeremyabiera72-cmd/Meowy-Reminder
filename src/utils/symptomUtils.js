export function hasSymptom(entry, symptomId) {
    if (!entry?.symptoms) {
        return false;
    }

    return entry.symptoms.includes(symptomId);
}

export function getSymptomCount(entries = [], symptomId) {
    return entries.filter(entry => hasSymptom(entry, symptomId)).length;
}

export function getSymptomFrequency(entries = []) {
    const frequency = {};

    entries.forEach(entry => {
        if (!Array.isArray(entry.symptoms)) {
            return;
        }

        entry.symptoms.forEach(symptom => {
            frequency[symptom] = (frequency[symptom] || 0) + 1;
        });
    });

    return frequency;
}

export function getMostCommonSymptoms(entries = [], limit = 5) {
    const frequency = getSymptomFrequency(entries);

    return Object.entries(frequency)
        .sort(([, first], [, second]) => second - first)
        .slice(0, limit)
        .map(([symptom, count]) => ({
            symptom,
            count,
        }));
}

export function getSymptomsForDate(entries = [], date) {
    const dateKey = new Date(date).toISOString().split("T")[0];

    return entries.filter(entry => {
        const entryDate = new Date(entry.date).toISOString().split("T")[0];

        return entryDate === dateKey;
    });
}

export function getSymptomsForCycle(entries = [], cycleId) {
    return entries.filter(entry => entry.cycleId === cycleId);
}

export function getTotalSymptomDays(entries = []) {
    const dates = new Set();

    entries.forEach(entry => {
        if (!entry.date) {
            return;
        }

        dates.add(new Date(entry.date).toISOString().split("T")[0]);
    });

    return dates.size;
}
