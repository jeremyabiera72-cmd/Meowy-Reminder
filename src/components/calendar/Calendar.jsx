import { useMemo, useState } from "react";
import CalendarDay from "./CalendarDay";
import CycleIndicator from "./CycleIndicator";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function createDate(year, month, day) {
    return new Date(year, month, day);
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function formatMonth(year, month) {
    return new Date(year, month, 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
}

function isSameDay(date1, date2) {
    return getDateKey(date1) === getDateKey(date2);
}

export default function Calendar({
    periodDates = [],
    estimatedPeriodDates = [],
    symptomDates = [],
    selectedDate = null,
    onDateSelect,
}) {
    const today = useMemo(() => new Date(), []);

    const [currentDate, setCurrentDate] = useState(selectedDate ? new Date(selectedDate) : today);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const periodDateSet = useMemo(() => new Set(periodDates.map(date => getDateKey(new Date(date)))), [periodDates]);

    const estimatedPeriodDateSet = useMemo(
        () => new Set(estimatedPeriodDates.map(date => getDateKey(new Date(date)))),
        [estimatedPeriodDates],
    );

    const symptomDateSet = useMemo(() => new Set(symptomDates.map(date => getDateKey(new Date(date)))), [symptomDates]);

    const calendarDays = useMemo(() => {
        const days = [];
        const firstDay = getFirstDayOfMonth(year, month);
        const totalDays = getDaysInMonth(year, month);

        for (let index = 0; index < firstDay; index += 1) {
            days.push(null);
        }

        for (let day = 1; day <= totalDays; day += 1) {
            days.push(createDate(year, month, day));
        }

        while (days.length % 7 !== 0) {
            days.push(null);
        }

        return days;
    }, [year, month]);

    function goToPreviousMonth() {
        setCurrentDate(new Date(year, month - 1, 1));
    }

    function goToNextMonth() {
        setCurrentDate(new Date(year, month + 1, 1));
    }

    function goToToday() {
        setCurrentDate(new Date());
    }

    function handleDateSelect(date) {
        if (onDateSelect) {
            onDateSelect(date);
        }
    }

    return (
        <section className="calendar">
            <div className="calendar__header">
                <div>
                    <p className="calendar__label">Calendar</p>

                    <h2 className="calendar__title">{formatMonth(year, month)}</h2>
                </div>

                <div className="calendar__controls">
                    <button
                        type="button"
                        className="calendar__nav-button"
                        onClick={goToPreviousMonth}
                        aria-label="Previous month"
                    >
                        ←
                    </button>

                    <button type="button" className="calendar__today-button" onClick={goToToday}>
                        Today
                    </button>

                    <button
                        type="button"
                        className="calendar__nav-button"
                        onClick={goToNextMonth}
                        aria-label="Next month"
                    >
                        →
                    </button>
                </div>
            </div>

            <div className="calendar__weekdays">
                {WEEK_DAYS.map(day => (
                    <div key={day} className="calendar__weekday">
                        {day}
                    </div>
                ))}
            </div>

            <div className="calendar__grid">
                {calendarDays.map((date, index) => {
                    if (!date) {
                        return <div key={`empty-${index}`} className="calendar__empty-day" aria-hidden="true" />;
                    }

                    const dateKey = getDateKey(date);

                    return (
                        <CalendarDay
                            key={dateKey}
                            date={date}
                            isToday={isSameDay(date, today)}
                            isSelected={selectedDate ? isSameDay(date, new Date(selectedDate)) : false}
                            isPeriod={periodDateSet.has(dateKey)}
                            isEstimatedPeriod={estimatedPeriodDateSet.has(dateKey)}
                            hasSymptoms={symptomDateSet.has(dateKey)}
                            onClick={handleDateSelect}
                        />
                    );
                })}
            </div>

            <div className="calendar__legend">
                <CycleIndicator type="period" label="Period" />
                <CycleIndicator type="estimated" label="Estimated period" />
                <CycleIndicator type="symptom" label="Symptoms" />
                <CycleIndicator type="today" label="Today" />
            </div>
        </section>
    );
}
