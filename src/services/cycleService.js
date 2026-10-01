import { STORAGE_KEYS } from "../constants/appConstants";

import { getStoredData, setStoredData } from "./storageService";

function generateId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getCycles() {
    return getStoredData(STORAGE_KEYS.CYCLES, []);
}

export function getCycleById(cycleId) {
    const cycles = getCycles();

    return cycles.find(cycle => cycle.id === cycleId) || null;
}

export function getActiveCycle() {
    const cycles = getCycles();

    return cycles.find(cycle => cycle.isActive === true) || null;
}

export function createCycle(cycleData) {
    const cycles = getCycles();

    const activeCycles = cycles.map(cycle => ({
        ...cycle,
        isActive: false,
    }));

    const newCycle = {
        id: generateId(),

        cycleNumber: activeCycles.length + 1,

        startDate: cycleData.startDate,

        endDate: cycleData.endDate || null,

        cycleLength: cycleData.cycleLength || null,

        periodLength: cycleData.periodLength || null,

        isActive: true,

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
    };

    const updatedCycles = [newCycle, ...activeCycles];

    setStoredData(STORAGE_KEYS.CYCLES, updatedCycles);

    return newCycle;
}

export function updateCycle(cycleId, updates) {
    const cycles = getCycles();

    const updatedCycles = cycles.map(cycle =>
        cycle.id === cycleId
            ? {
                  ...cycle,
                  ...updates,
                  updatedAt: new Date().toISOString(),
              }
            : cycle,
    );

    setStoredData(STORAGE_KEYS.CYCLES, updatedCycles);

    return getCycleById(cycleId);
}

export function finishCycle(cycleId, endDate) {
    return updateCycle(cycleId, {
        endDate,
        isActive: false,
    });
}

export function deleteCycle(cycleId) {
    const cycles = getCycles();

    const updatedCycles = cycles.filter(cycle => cycle.id !== cycleId);

    setStoredData(STORAGE_KEYS.CYCLES, updatedCycles);

    return true;
}
