import { useState } from "react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import CycleCard from "../components/cycle/CycleCard";
import StartCycleModal from "../components/cycle/StartCycleModal";
import MeowyMessage from "../components/meowy/MeowyMessage";
import MoodTracker from "../components/mood/MoodTracker";
import SymptomTracker from "../components/symptoms/SymptomTracker";

import useCycle from "../hooks/useCycle";
import useLocalStorage from "../hooks/useLocalStorage";
import useSymptoms from "../hooks/useSymptoms";
import "./pages.css";

export default function Home() {
    const { activeCycle, startCycle, resetCycles } = useCycle();
    const { todayEntries, addSymptomEntry } = useSymptoms();
    const [isStartCycleOpen, setIsStartCycleOpen] = useState(false);
    const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
    const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
    const [savedMoods, setSavedMoods] = useLocalStorage("meowyreminder-moods", []);

    const cycleDay = activeCycle?.startDate
        ? Math.floor((new Date() - new Date(activeCycle.startDate)) / (1000 * 60 * 60 * 24)) + 1
        : null;

    const nextPeriodStart = activeCycle?.startDate
        ? new Date(new Date(activeCycle.startDate).getTime() + (activeCycle.cycleLength || 28) * 24 * 60 * 60 * 1000)
        : null;

    const nextPeriodEnd = nextPeriodStart
        ? new Date(nextPeriodStart.getTime() + ((activeCycle?.periodLength || 5) - 1) * 24 * 60 * 60 * 1000)
        : null;

    const handleStartCycle = ({ startDate }) => {
        startCycle({ startDate });
        setIsStartCycleOpen(false);
    };

    const handleSaveSymptoms = (entryData) => {
        addSymptomEntry(entryData);
        setIsSymptomModalOpen(false);
    };

    const handleSaveMood = (moodData) => {
        setSavedMoods(prev => {
            const dateStr = new Date(moodData.date).toDateString();
            const filtered = prev.filter(m => new Date(m.date).toDateString() !== dateStr);
            return [moodData, ...filtered];
        });
    };

    const todayMood = savedMoods.find(
        m => new Date(m.date).toDateString() === new Date().toDateString()
    );

    return (
        <div className="page">
            <div className="page__header">
                <div>
                    <p className="page__eyebrow">Today</p>

                    <h1 className="page__title">Welcome back</h1>

                    <p className="page__description">Keep track of how you're feeling today.</p>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                    {activeCycle && (
                        <Button variant="secondary" onClick={() => setIsResetConfirmOpen(true)}>
                            Reset cycle
                        </Button>
                    )}
                    <Button onClick={() => setIsStartCycleOpen(true)}>
                        {activeCycle ? "+ New cycle" : "+ Start new cycle"}
                    </Button>
                </div>
            </div>

            <div className="page__grid">
                <CycleCard
                    cycleNumber={activeCycle?.cycleNumber}
                    cycleDay={cycleDay}
                    startDate={activeCycle?.startDate}
                    endDate={activeCycle?.endDate}
                    averageCycleLength={activeCycle?.cycleLength || 28}
                    nextPeriodDate={nextPeriodStart}
                    nextPeriodEndDate={nextPeriodEnd}
                    onStartNewCycle={() => setIsStartCycleOpen(true)}
                />

                <Card
                    title="Today's check-in"
                    description="Your symptom activity today."
                    action={
                        <Button size="small" variant="secondary" onClick={() => setIsSymptomModalOpen(true)}>
                            {todayEntries.length > 0 ? "Edit symptoms" : "Log symptoms"}
                        </Button>
                    }
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div>
                            <strong style={{ fontSize: "28px" }}>{todayEntries.length}</strong>
                            <p style={{ margin: 0 }}>
                                symptom record{todayEntries.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                        {todayMood && (
                            <div style={{ marginTop: "10px", fontSize: "13px" }}>
                                Mood: <strong>{todayMood.mood.toUpperCase()}</strong>
                            </div>
                        )}
                    </div>
                </Card>

                <MeowyMessage
                    expression={todayEntries.length > 0 ? "happy" : "caring"}
                    title="Meowy says"
                    message={
                        todayEntries.length > 0
                            ? "Great job logging your symptoms today!"
                            : "Take a moment to check in with yourself today."
                    }
                />
            </div>

            <div style={{ marginTop: "24px" }}>
                <MoodTracker savedMood={todayMood} onSave={handleSaveMood} />
            </div>

            <StartCycleModal
                isOpen={isStartCycleOpen}
                onClose={() => setIsStartCycleOpen(false)}
                onConfirm={handleStartCycle}
            />

            <Modal
                isOpen={isResetConfirmOpen}
                onClose={() => setIsResetConfirmOpen(false)}
                title="Reset cycle"
                size="small"
            >
                <p style={{ margin: "0 0 20px" }}>Are you sure you want to reset your active cycle tracking? This cannot be undone.</p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Button variant="secondary" onClick={() => setIsResetConfirmOpen(false)}>Cancel</Button>
                    <Button onClick={() => { resetCycles(); setIsResetConfirmOpen(false); }}>Yes, reset</Button>
                </div>
            </Modal>

            <Modal
                isOpen={isSymptomModalOpen}
                onClose={() => setIsSymptomModalOpen(false)}
                title="Log Symptoms"
                size="large"
            >
                <SymptomTracker
                    cycleId={activeCycle?.id}
                    date={todayEntries.length > 0 ? todayEntries[0].date : new Date()}
                    initialSymptoms={todayEntries.length > 0 ? todayEntries[0].symptoms : []}
                    initialNote={todayEntries.length > 0 ? todayEntries[0].note : ""}
                    onSave={handleSaveSymptoms}
                />
            </Modal>
        </div>
    );
}
