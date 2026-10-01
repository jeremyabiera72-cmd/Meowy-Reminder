import Card from "../common/Card";
import "./cycle.css";

export default function CycleCard({
    cycleNumber,
    cycleDay,
    startDate,
    endDate,
    averageCycleLength,
    nextPeriodDate,
    nextPeriodEndDate,
    onStartNewCycle,
}) {
    function formatDate(date) {
        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    function formatRange(start, end) {
        if (!start) return "Not available";
        if (!end) return formatDate(start);
        const sMonth = new Date(start).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        const eMonth = new Date(end).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return `${sMonth} – ${eMonth}`;
    }

    return (
        <Card
            title={`Cycle ${cycleNumber ?? "—"}`}
            description="Your current cycle information."
            action={
                <button type="button" className="cycle-card__new-button" onClick={onStartNewCycle}>
                    + New cycle
                </button>
            }
        >
            <div className="cycle-card__main">
                <div className="cycle-card__day">
                    <span className="cycle-card__day-label">Current cycle day</span>

                    <strong className="cycle-card__day-number">{cycleDay ?? "—"}</strong>
                </div>

                <div className="cycle-card__details">
                    <div className="cycle-card__detail">
                        <span>Started</span>
                        <strong>{formatDate(startDate)}</strong>
                    </div>

                    <div className="cycle-card__detail">
                        <span>Ended</span>
                        <strong>{formatDate(endDate)}</strong>
                    </div>

                    <div className="cycle-card__detail">
                        <span>Average cycle</span>
                        <strong>{averageCycleLength ? `${averageCycleLength} days` : "—"}</strong>
                    </div>

                    <div className="cycle-card__detail">
                        <span>Next period</span>
                        <strong>{formatRange(nextPeriodDate, nextPeriodEndDate)}</strong>
                    </div>
                </div>
            </div>
        </Card>
    );
}
