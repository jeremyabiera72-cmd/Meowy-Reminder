import { useState, useEffect } from "react";
import Button from "../common/Button";
import Card from "../common/Card";
import MoodSelector, { MOODS } from "./MoodSelector";
import "./mood.css";

export default function MoodTracker({ savedMood, onSave }) {
    const [isEditing, setIsEditing] = useState(!savedMood);
    const [mood, setMood] = useState(savedMood?.mood || "");
    const [note, setNote] = useState(savedMood?.note || "");

    useEffect(() => {
        if (savedMood) {
            setMood(savedMood.mood);
            setNote(savedMood.note || "");
            setIsEditing(false);
        }
    }, [savedMood]);

    function handleSave() {
        if (!mood) {
            return;
        }

        onSave?.({
            mood,
            note: note.trim(),
            date: new Date().toISOString(),
        });
        setIsEditing(false);
    }

    return (
        <Card title="How are you feeling?">
            {isEditing ? (
                <div className="mood-tracker">
                    <MoodSelector value={mood} onChange={setMood} />

                    <div className="mood-tracker__note">
                        <label htmlFor="mood-note" className="mood-tracker__note-label">
                            Add a note
                        </label>

                        <textarea
                            id="mood-note"
                            value={note}
                            onChange={event => setNote(event.target.value)}
                            placeholder="Anything you'd like to remember about today?"
                            rows={3}
                            maxLength={500}
                        />

                        <span className="mood-tracker__counter">{note.length}/500</span>
                    </div>

                    <div className="mood-tracker__footer" style={{ marginTop: "16px" }}>
                        {savedMood && (
                            <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        )}
                        <Button onClick={handleSave} disabled={!mood}>
                            Save check-in
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="mood-result" style={{ padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "48px", marginBottom: "8px", fontWeight: "300", color: "#111827" }}>
                        {MOODS.find(m => m.id === mood)?.symbol}
                    </div>
                    <h3 style={{ margin: "0 0 8px", textTransform: "capitalize", fontWeight: "600" }}>
                        {MOODS.find(m => m.id === mood)?.label || mood}
                    </h3>
                    {note && (
                        <div style={{ background: "#f5f5f5", padding: "12px", borderRadius: "8px", margin: "12px 0", fontSize: "14px", color: "#444", textAlign: "left" }}>
                            <strong>Note:</strong> {note}
                        </div>
                    )}
                    <div style={{ marginTop: "16px" }}>
                        <Button variant="secondary" onClick={() => setIsEditing(true)}>
                            Edit check-in
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
}
