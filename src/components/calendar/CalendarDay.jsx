function getDayClasses({ isToday, isSelected, isPeriod, isEstimatedPeriod, hasSymptoms }) {
    const classes = ["calendar-day"];

    if (isToday) {
        classes.push("calendar-day--today");
    }

    if (isSelected) {
        classes.push("calendar-day--selected");
    }

    if (isPeriod) {
        classes.push("calendar-day--period");
    }

    if (isEstimatedPeriod) {
        classes.push("calendar-day--estimated");
    }

    if (hasSymptoms) {
        classes.push("calendar-day--symptoms");
    }

    return classes.join(" ");
}

export default function CalendarDay({
    date,
    isToday = false,
    isSelected = false,
    isPeriod = false,
    isEstimatedPeriod = false,
    hasSymptoms = false,
    onClick,
}) {
    const dayNumber = date.getDate();

    function handleClick() {
        if (onClick) {
            onClick(date);
        }
    }

    return (
        <button
            type="button"
            className={getDayClasses({
                isToday,
                isSelected,
                isPeriod,
                isEstimatedPeriod,
                hasSymptoms,
            })}
            onClick={handleClick}
            aria-label={`Select ${date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            })}`}
            aria-pressed={isSelected}
        >
            <span className="calendar-day__number">{dayNumber}</span>

            <span className="calendar-day__indicators">
                {isPeriod && (
                    <span className="calendar-day__indicator calendar-day__indicator--period" aria-label="Period day" />
                )}

                {isEstimatedPeriod && (
                    <span
                        className="calendar-day__indicator calendar-day__indicator--estimated"
                        aria-label="Estimated period day"
                    />
                )}

                {hasSymptoms && (
                    <span
                        className="calendar-day__indicator calendar-day__indicator--symptom"
                        aria-label="Symptoms recorded"
                    />
                )}
            </span>
        </button>
    );
}
