import { DATE_FORMAT_OPTIONS, MILLISECONDS_PER_DAY } from "../constants/appConstants";

export function parseDate(date) {
    if (!date) {
        return null;
    }

    if (date instanceof Date) {
        return new Date(date);
    }

    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        const [year, month, day] = date.split("-").map(Number);

        return new Date(year, month - 1, day);
    }

    const parsed = new Date(date);

    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatDate(date, format = "short") {
    const parsedDate = parseDate(date);

    if (!parsedDate) {
        return "";
    }

    return new Intl.DateTimeFormat(undefined, DATE_FORMAT_OPTIONS[format] || DATE_FORMAT_OPTIONS.short).format(
        parsedDate,
    );
}

export function formatDateInput(date) {
    const parsedDate = parseDate(date);

    if (!parsedDate) {
        return "";
    }

    const year = parsedDate.getFullYear();

    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");

    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function getToday() {
    return formatDateInput(new Date());
}

export function getDaysBetween(startDate, endDate) {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (!start || !end) {
        return 0;
    }

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return Math.round((end - start) / MILLISECONDS_PER_DAY);
}

export function addDays(date, days) {
    const result = parseDate(date);

    if (!result) {
        return null;
    }

    result.setDate(result.getDate() + Number(days));

    return result;
}

export function addDaysFormatted(date, days) {
    return formatDateInput(addDays(date, days));
}

export function isSameDate(firstDate, secondDate) {
    const first = parseDate(firstDate);
    const second = parseDate(secondDate);

    if (!first || !second) {
        return false;
    }

    return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
    );
}

export function isDateInRange(date, startDate, endDate) {
    const target = parseDate(date);
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (!target || !start || !end) {
        return false;
    }

    target.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return target >= start && target <= end;
}

export function getCycleDay(startDate, currentDate = new Date()) {
    const days = getDaysBetween(startDate, currentDate);

    if (days < 0) {
        return null;
    }

    return days + 1;
}

export function isFutureDate(date) {
    const target = parseDate(date);
    const today = parseDate(new Date());

    if (!target || !today) {
        return false;
    }

    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return target > today;
}

export function isPastDate(date) {
    const target = parseDate(date);
    const today = parseDate(new Date());

    if (!target || !today) {
        return false;
    }

    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return target < today;
}
