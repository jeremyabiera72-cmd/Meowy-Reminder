import { useEffect, useState } from "react";
import Button from "../common/Button";
import Card from "../common/Card";
import SymptomList from "./SymptomList";
import "./symptoms.css";

export default function SymptomTracker({
    cycleId = null,
    date = new Date(),
    initialSymptoms = [],
    initialNote = "",
    onSave,
}) {
    const [selectedSymptoms, setSelectedSymptoms] = useState(initialSymptoms);
    const [note, setNote] = useState(initialNote);

    useEffect(() => {
        setSelectedSymptoms(initialSymptoms || []);
        setNote(initialNote || "");
    }, [initialSymptoms, initialNote, date]);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));

    const handleSave = () => {
        if (!onSave) {
            console.error("SymptomTracker: onSave was not provided.");
            return;
        }

        if (selectedSymptoms.length === 0 && !note.trim()) {
            return;
        }

        onSave({
            id: crypto.randomUUID(),
            cycleId,
            date: new Date(date).toISOString(),
            symptoms: selectedSymptoms,
            note: note.trim(),
        });
    };

    const handleClear = () => {
        setSelectedSymptoms([]);
        setNote("");
    };

    return (
        <Card title="Symptoms" description={`How are you feeling on ${formattedDate}?`}>
            <div className="symptom-tracker">
                <div className="symptom-tracker__header">
                    <div>
                        <h3>Today's symptoms</h3>
                        <p>Select everything you are experiencing today.</p>
                    </div>

                    {(selectedSymptoms.length > 0 || note.trim()) && (
                        <button type="button" className="symptom-tracker__clear" onClick={handleClear}>
                            Clear
                        </button>
                    )}
                </div>

                <SymptomList selectedSymptoms={selectedSymptoms} onChange={setSelectedSymptoms} />

                <div className="symptom-tracker__note">
                    <label htmlFor="symptom-note">Additional note</label>

                    <textarea
                        id="symptom-note"
                        value={note}
                        onChange={event => setNote(event.target.value)}
                        placeholder="Anything else you want to remember?"
                        maxLength={1000}
                    />

                    <div className="symptom-tracker__counter">{note.length}/1000</div>
                </div>

                <div className="symptom-tracker__footer">
                    <span>{selectedSymptoms.length} selected</span>

                    <Button onClick={handleSave} disabled={selectedSymptoms.length === 0 && !note.trim()}>
                        Save symptoms
                    </Button>
                </div>
            </div>
        </Card>
    );
}
