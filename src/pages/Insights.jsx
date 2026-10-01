import { useState } from "react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import { getSymptomById } from "../data/symptoms";
import useCycle from "../hooks/useCycle";
import useSymptoms from "../hooks/useSymptoms";
import "./pages.css";

export default function Insights() {
    const { cycles, resetCycles } = useCycle();
    const { entries, deleteSymptomEntry } = useSymptoms();
    const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState(null);

    const totalCycles = cycles.length;
    const totalSymptomDays = entries.length;

    const formatDate = date => {
        return new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };

    const formatShortDate = date => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };

    const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleDeleteEntry = entry => {
        setEntryToDelete(entry);
    };

    const confirmDeleteEntry = () => {
        if (entryToDelete) {
            deleteSymptomEntry(entryToDelete.id);
            setEntryToDelete(null);
        }
    };

    const handleClearAllData = () => {
        setIsClearAllModalOpen(true);
    };

    const confirmClearAllData = () => {
        resetCycles();

        entries.forEach(entry => {
            deleteSymptomEntry(entry.id);
        });

        localStorage.removeItem("meowyreminder-symptoms");
        localStorage.removeItem("meowyreminder-moods");
        
        setIsClearAllModalOpen(false);
        window.location.reload();
    };

    return (
        <div className="page">
            <div className="page__header">
                <div>
                    <p className="page__eyebrow">Overview</p>

                    <h1 className="page__title">Insights</h1>

                    <p className="page__description">Understand your tracking history.</p>
                </div>

                {(totalCycles > 0 || totalSymptomDays > 0) && (
                    <button type="button" className="page__button page__button--danger" onClick={handleClearAllData}>
                        Delete tracking data
                    </button>
                )}
            </div>

            <div className="page__grid page__grid--three">
                <Card title="Cycles tracked">
                    <div className="insight-value">{totalCycles}</div>

                    <p>
                        recorded cycle
                        {totalCycles !== 1 ? "s" : ""}
                    </p>
                </Card>

                <Card title="Symptom records">
                    <div className="insight-value">{totalSymptomDays}</div>

                    <p>
                        recorded symptom day
                        {totalSymptomDays !== 1 ? "s" : ""}
                    </p>
                </Card>

                <Card title="Cycle average">
                    <div className="insight-value">
                        {cycles.length > 0
                            ? Math.round(
                                  cycles.reduce((total, cycle) => total + Number(cycle.cycleLength || 28), 0) /
                                      cycles.length,
                              )
                            : 28}
                    </div>

                    <p>estimated days</p>
                </Card>
            </div>

            <Card title="Symptom history" description="Symptoms you've recorded by date.">
                {sortedEntries.length > 0 ? (
                    <div className="symptom-history">
                        {sortedEntries.map(entry => {
                            const symptoms = (entry.symptoms || [])
                                .map(symptomId => getSymptomById(symptomId))
                                .filter(Boolean);

                            return (
                                <article key={entry.id} className="symptom-history__entry">
                                    <div className="symptom-history__header">
                                        <div className="symptom-history__date">
                                            <span className="symptom-history__date-full">{formatDate(entry.date)}</span>

                                            <span className="symptom-history__date-short">
                                                {formatShortDate(entry.date)}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            className="symptom-history__delete"
                                            onClick={() => handleDeleteEntry(entry)}
                                            aria-label={`Delete symptom record from ${formatShortDate(entry.date)}`}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    {symptoms.length > 0 ? (
                                        <div className="symptom-history__symptoms">
                                            {symptoms.map(symptom => (
                                                <span key={symptom.id} className="symptom-history__tag">
                                                    {symptom.name}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="symptom-history__none">No symptoms selected.</p>
                                    )}

                                    {entry.note && (
                                        <div className="symptom-history__note">
                                            <span>Note</span>

                                            <p>{entry.note}</p>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="symptom-history__empty">
                        <div className="symptom-history__empty-icon">+</div>

                        <p>No symptom history yet</p>

                        <span>Record symptoms from the Calendar to see them here.</span>
                    </div>
                )}
            </Card>

            <Card
                title="About your insights"
                description="Your patterns become more useful as more cycles are recorded."
            >
                <p className="page__text">
                    MeowyReminder uses your recorded history to help organize your cycle information. Predictions are
                    estimates and should not be treated as medical advice.
                </p>
            </Card>

            <Modal
                isOpen={isClearAllModalOpen}
                onClose={() => setIsClearAllModalOpen(false)}
                title="Delete tracking data"
                size="small"
            >
                <p style={{ margin: "0 0 20px" }}>
                    Warning: all cycle and symptom records will be permanently removed from this device. This cannot be undone. Are you sure you want to continue?
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Button variant="secondary" onClick={() => setIsClearAllModalOpen(false)}>Cancel</Button>
                    <Button onClick={confirmClearAllData}>Yes, delete all</Button>
                </div>
            </Modal>

            <Modal
                isOpen={!!entryToDelete}
                onClose={() => setEntryToDelete(null)}
                title="Delete symptom record"
                size="small"
            >
                <p style={{ margin: "0 0 20px" }}>
                    Are you sure you want to delete the symptom record from {entryToDelete ? formatShortDate(entryToDelete.date) : ""}? This cannot be undone.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Button variant="secondary" onClick={() => setEntryToDelete(null)}>Cancel</Button>
                    <Button onClick={confirmDeleteEntry}>Yes, delete</Button>
                </div>
            </Modal>
        </div>
    );
}
