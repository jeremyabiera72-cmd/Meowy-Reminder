import "./mood.css";

export const MOODS = [
    {
        id: "great",
        label: "Great",
        symbol: "↑",
    },
    {
        id: "good",
        label: "Good",
        symbol: "•",
    },
    {
        id: "okay",
        label: "Okay",
        symbol: "—",
    },
    {
        id: "low",
        label: "Low",
        symbol: "↓",
    },
    {
        id: "irritated",
        label: "Irritated",
        symbol: "!",
    },
    {
        id: "tired",
        label: "Tired",
        symbol: "z",
    },
];

export default function MoodSelector({ value, onChange }) {
    return (
        <div className="mood-selector">
            {MOODS.map(mood => {
                const isSelected = value === mood.id;

                return (
                    <button
                        key={mood.id}
                        type="button"
                        className={`mood-selector__item ${isSelected ? "mood-selector__item--selected" : ""}`}
                        onClick={() => onChange?.(mood.id)}
                        aria-pressed={isSelected}
                    >
                        <span className="mood-selector__symbol">{mood.symbol}</span>

                        <span className="mood-selector__label">{mood.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
