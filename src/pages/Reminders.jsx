import { useState, useEffect } from "react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";

import useReminders from "../hooks/useReminders";
import "./pages.css";

export default function Reminders() {
    const { reminders, addReminder, toggleReminder, deleteReminder } = useReminders();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [suggested, setSuggested] = useState([]);
    const [currentHour, setCurrentHour] = useState(new Date().getHours());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHour(new Date().getHours());
        }, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const SUGGESTED_REMINDERS = [
            { title: "Drink plenty of water", time: "8:00 AM" },
            { title: "Eat healthy foods", time: "12:00 PM" },
            { title: "Take a short walk", time: "2:00 PM" },
            { title: "Stretch your body", time: "4:00 PM" },
            { title: "Sleep or rest", time: "8:00 PM" },
            { title: "Wind down and relax", time: "9:00 PM" },
            { title: "Read a book", time: "7:00 PM" },
            { title: "Meditate for 5 mins", time: "10:00 AM" }
        ];
        
        // Seed based on current hour to change every hour
        const seededRandom = (str) => {
            let hash = currentHour;
            for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) % 10000;
            return hash / 10000;
        };
        
        const shuffled = [...SUGGESTED_REMINDERS].sort((a, b) => seededRandom(a.title) - seededRandom(b.title));
        setSuggested(shuffled.slice(0, 3));
    }, [currentHour]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addReminder({
            title: title.trim(),
            description: description.trim(),
            enabled: true,
        });
        setTitle("");
        setDescription("");
        setIsModalOpen(false);
    };

    return (
        <div className="page">
            <div className="page__header">
                <div>
                    <p className="page__eyebrow">Stay on track</p>

                    <h1 className="page__title">Reminders</h1>

                    <p className="page__description">Manage your personal reminders.</p>
                </div>

                <Button onClick={() => setIsModalOpen(true)}>+ Add reminder</Button>
            </div>

            <Card title="Your reminders" description="Reminders you have created.">
                {reminders.length === 0 ? (
                    <div className="page__empty">
                        <p>No reminders yet.</p>

                        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                            Add reminder
                        </Button>
                    </div>
                ) : (
                    <div className="reminder-list">
                        {reminders.map(reminder => (
                            <div key={reminder.id} className="reminder-item">
                                <div>
                                    <strong>{reminder.title}</strong>

                                    {reminder.description && <p>{reminder.description}</p>}
                                </div>

                                <div>
                                    <button type="button" onClick={() => toggleReminder(reminder.id)}>
                                        {reminder.enabled ? "On" : "Off"}
                                    </button>

                                    <button type="button" onClick={() => deleteReminder(reminder.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            <Card title="Suggested for you" description="Quickly add these daily reminders.">
                <div className="reminder-list">
                    {suggested.map((item, index) => (
                        <div key={index} className="reminder-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <strong>{item.title}</strong>
                                <p>Notify at {item.time}</p>
                            </div>
                            <Button 
                                size="small" 
                                variant="secondary" 
                                onClick={() => addReminder({ title: item.title, description: `Notify at ${item.time}`, enabled: true })}
                            >
                                + Add
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add Reminder"
                size="small"
            >
                <form id="add-reminder-form" onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                        <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }} htmlFor="rem-title">
                            Title
                        </label>
                        <input
                            id="rem-title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g., Take daily vitamins"
                            required
                            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #ccc" }}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }} htmlFor="rem-desc">
                            Description (optional)
                        </label>
                        <input
                            id="rem-desc"
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="e.g., Daily at 9:00 AM"
                            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #ccc" }}
                        />
                    </div>

                    <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Save Reminder
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
