import { useState } from "react";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";

import Card from "../components/common/Card";
import JournalEditor from "../components/journal/JournalEditor";
import JournalList from "../components/journal/JournalList";

import { useAuth } from "../context/AuthContext";

import useLocalStorage from "../hooks/useLocalStorage";
import "./pages.css";

export default function Journal() {
    const { user } = useAuth();

    const [entries, setEntries] = useLocalStorage(`meowyreminder-journal-${user?.id || "local"}`, []);

    const [selectedEntry, setSelectedEntry] = useState(null);

    const [isEditing, setIsEditing] = useState(false);

    const handleSave = entry => {
        setEntries(previous => {
            const exists = previous.some(item => item.id === entry.id);

            if (exists) {
                return previous.map(item => (item.id === entry.id ? entry : item));
            }

            return [entry, ...previous];
        });

        setSelectedEntry(null);
        setIsEditing(false);
    };

    const [entryToDelete, setEntryToDelete] = useState(null);

    const handleDelete = entry => {
        setEntryToDelete(entry);
    };

    const confirmDelete = () => {
        if (entryToDelete) {
            setEntries(previous => previous.filter(e => e.id !== entryToDelete.id));
            setEntryToDelete(null);
        }
    };

    return (
        <div className="page">
            <div className="page__header">
                <div>
                    <p className="page__eyebrow">Personal</p>

                    <h1 className="page__title">Journal</h1>

                    <p className="page__description">Keep personal notes about your days.</p>
                </div>

                {!isEditing && (
                    <button
                        type="button"
                        className="page__button"
                        onClick={() => {
                            setSelectedEntry(null);

                            setIsEditing(true);
                        }}
                    >
                        New entry
                    </button>
                )}
            </div>

            {isEditing ? (
                <Card>
                    <JournalEditor
                        initialEntry={selectedEntry}
                        onSave={handleSave}
                        onCancel={() => {
                            setIsEditing(false);

                            setSelectedEntry(null);
                        }}
                    />
                </Card>
            ) : (
                <JournalList
                    entries={entries}
                    onSelect={entry => {
                        setSelectedEntry(entry);

                        setIsEditing(true);
                    }}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                isOpen={Boolean(entryToDelete)}
                onClose={() => setEntryToDelete(null)}
                title="Confirm Deletion"
                size="small"
            >
                <div style={{ padding: "10px 0" }}>
                    <p style={{ margin: "0 0 20px" }}>Are you sure you want to delete this journal entry? This action cannot be undone.</p>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <Button variant="secondary" onClick={() => setEntryToDelete(null)}>Cancel</Button>
                        <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
