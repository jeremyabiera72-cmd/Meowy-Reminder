import { addDaysFormatted, getDaysBetween } from "./dateUtils";

export function calculateCycleLength(startDate, nextStartDate) {
    if (!startDate || !nextStartDate) {
        return null;
    }

    const length = getDaysBetween(startDate, nextStartDate);

    return length > 0 ? length : null;
}

export function calculatePeriodLength(startDate, endDate) {
    if (!startDate || !endDate) {
        return null;
    }

    const length = getDaysBetween(startDate, endDate);

    return length >= 0 ? length + 1 : null;
}

export function getCycleLengths(cycles = []) {
    const lengths = [];

    for (let index = 0; index < cycles.length - 1; index++) {
        const current = cycles[index];
        const next = cycles[index + 1];

        if (current?.startDate && next?.startDate) {
            const length = calculateCycleLength(next.startDate, current.startDate);

            if (length) {
                lengths.push(length);
            }
        }
    }

    return lengths;
}

export function calculateAverageCycleLength(cycles = [], fallback = 28) {
    const lengths = getCycleLengths(cycles);

    if (lengths.length === 0) {
        return fallback;
    }

    const total = lengths.reduce((sum, length) => sum + length, 0);

    return Math.round(total / lengths.length);
}

export function calculateAveragePeriodLength(cycles = [], fallback = 5) {
    const lengths = cycles.filter(cycle => cycle.periodLength).map(cycle => Number(cycle.periodLength));

    if (lengths.length === 0) {
        return fallback;
    }

    const total = lengths.reduce((sum, length) => sum + length, 0);

    return Math.round(total / lengths.length);
}

export function calculateNextPeriod(lastStartDate, averageCycleLength = 28) {
    if (!lastStartDate) {
        return null;
    }

    return addDaysFormatted(lastStartDate, averageCycleLength);
}

export function calculateCycleProgress(startDate, cycleLength, currentDate = new Date()) {
    if (!startDate || !cycleLength) {
        return 0;
    }

    const currentDay = getDaysBetween(startDate, currentDate) + 1;

    const progress = (currentDay / cycleLength) * 100;

    return Math.min(Math.max(progress, 0), 100);
}

export function getCycleStatus(startDate, endDate, currentDate = new Date()) {
    if (!startDate) {
        return "unknown";
    }

    if (endDate) {
        return "completed";
    }

    const currentDay = getDaysBetween(startDate, currentDate);

    if (currentDay < 0) {
        return "upcoming";
    }

    return "active";
}
