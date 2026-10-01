import "./cycle.css";

function SummaryItem({ label, value, description }) {
    return (
        <div className="cycle-summary__item">
            <span className="cycle-summary__label">{label}</span>

            <strong className="cycle-summary__value">{value}</strong>

            {description && <span className="cycle-summary__description">{description}</span>}
        </div>
    );
}

export default function CycleSummary({ cycleDay = 0, cycleLength = 0, periodLength = 0, nextPeriod = null }) {
    function formatDate(date) {
        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    }

    return (
        <div className="cycle-summary">
            <SummaryItem
                label="Cycle day"
                value={cycleDay || "—"}
                description={cycleLength ? `of approximately ${cycleLength} days` : "Current cycle"}
            />

            <SummaryItem
                label="Period length"
                value={periodLength ? `${periodLength} days` : "—"}
                description="Based on your records"
            />

            <SummaryItem label="Next period" value={formatDate(nextPeriod)} description="Estimated" />
        </div>
    );
}
