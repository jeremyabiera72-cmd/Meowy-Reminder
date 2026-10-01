const indicatorClasses = {
    period: "cycle-indicator__dot--period",
    estimated: "cycle-indicator__dot--estimated",
    symptom: "cycle-indicator__dot--symptom",
    today: "cycle-indicator__dot--today",
};

export default function CycleIndicator({ type, label }) {
    const indicatorClass = indicatorClasses[type] || "cycle-indicator__dot--default";

    return (
        <div className="cycle-indicator">
            <span className={`cycle-indicator__dot ${indicatorClass}`} aria-hidden="true" />

            <span className="cycle-indicator__label">{label}</span>
        </div>
    );
}
