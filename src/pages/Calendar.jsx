import { useState } from "react";
import CalendarComponent from "../components/calendar/Calendar";
import Modal from "../components/common/Modal";
import SymptomTracker from "../components/symptoms/SymptomTracker";

import useCycle from "../hooks/useCycle";
import useSymptoms from "../hooks/useSymptoms";
import "../components/calendar/calendar.css";
import "./pages.css";

export default function Calendar() {
    const { cycles, activeCycle } = useCycle();
    const { entries, addSymptomEntry, getEntriesForDate } = useSymptoms();

    const [selectedDate, setSelectedDate] = useState(null);
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);

    const periodDates = cycles.flatMap(cycle => {
        if (!cycle.startDate) {
            return [];
        }

        const dateList = [cycle.startDate];
        const periodLen = cycle.periodLength || 5;
        const start = new Date(cycle.startDate);
        for (let i = 1; i < periodLen; i++) {
            const nextDay = new Date(start);
            nextDay.setDate(start.getDate() + i);
            dateList.push(nextDay.toISOString().split("T")[0]);
        }
        return dateList;
    });

    const symptomDates = entries.map(entry => entry.date);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsLogModalOpen(true);
    };

    const handleSaveSymptoms = (entryData) => {
        addSymptomEntry(entryData);
        setIsLogModalOpen(false);
    };

    const selectedDateEntries = selectedDate ? getEntriesForDate(selectedDate) : [];
    const initialSymptomsForSelectedDate = selectedDateEntries.flatMap(e => e.symptoms || []);
    const initialNoteForSelectedDate = selectedDateEntries.map(e => e.note).filter(Boolean).join("\n");

    return (
        <div className="page">
            <div className="page__header">
                <div>
                    <p className="page__eyebrow">Tracking</p>

                    <h1 className="page__title">Calendar</h1>

                    <p className="page__description">View your cycle and symptom history. Click any date to view or log entries.</p>
                </div>
            </div>

            <CalendarComponent
                periodDates={periodDates}
                symptomDates={symptomDates}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
            />

            <Modal
                isOpen={isLogModalOpen}
                onClose={() => setIsLogModalOpen(false)}
                title={`Log for ${selectedDate ? new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}`}
                size="large"
            >
                {selectedDate && (
                    <SymptomTracker
                        cycleId={activeCycle?.id}
                        date={selectedDate}
                        initialSymptoms={initialSymptomsForSelectedDate}
                        initialNote={initialNoteForSelectedDate}
                        onSave={handleSaveSymptoms}
                    />
                )}
            </Modal>
        </div>
    );
}
