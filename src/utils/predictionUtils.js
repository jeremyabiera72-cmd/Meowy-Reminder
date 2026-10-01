import { calculateAverageCycleLength, calculateAveragePeriodLength, calculateNextPeriod } from "./cycleCalculator";

import { addDaysFormatted } from "./dateUtils";

export function getPredictionData(cycles = []) {
    const averageCycleLength = calculateAverageCycleLength(cycles);

    const averagePeriodLength = calculateAveragePeriodLength(cycles);

    const sortedCycles = [...cycles].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    const latestCycle = sortedCycles[0] || null;

    const nextPeriod = latestCycle?.startDate ? calculateNextPeriod(latestCycle.startDate, averageCycleLength) : null;

    return {
        averageCycleLength,
        averagePeriodLength,
        nextPeriod,
        confidence: getPredictionConfidence(cycles.length),
    };
}

export function getEstimatedPeriodDates(startDate, cycleLength = 28, periodLength = 5) {
    if (!startDate) {
        return [];
    }

    const nextPeriodStart = addDaysFormatted(startDate, cycleLength);

    const dates = [];

    for (let index = 0; index < periodLength; index++) {
        dates.push(addDaysFormatted(nextPeriodStart, index));
    }

    return dates;
}

export function getPredictionConfidence(cycleCount) {
    if (cycleCount < 2) {
        return "low";
    }

    if (cycleCount < 4) {
        return "moderate";
    }

    return "higher";
}

export function getPredictionMessage(confidence) {
    switch (confidence) {
        case "higher":
            return "Based on several recorded cycles.";

        case "moderate":
            return "Based on a few recorded cycles.";

        default:
            return "This is an early estimate and may change as more cycles are recorded.";
    }
}
