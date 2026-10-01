import "./symptoms.css";

export default function SymptomItem({ symptom, selected = false, onToggle }) {
    return (
        <button
            type="button"
            className={`symptom-item ${selected ? "symptom-item--selected" : ""}`}
            onClick={() => onToggle(symptom.id)}
            aria-pressed={selected}
        >
            <span className="symptom-item__dot" />

            <span className="symptom-item__name">{symptom.name}</span>

            <span className="symptom-item__check" aria-hidden="true">
                {selected ? "✓" : ""}
            </span>
        </button>
    );
}
