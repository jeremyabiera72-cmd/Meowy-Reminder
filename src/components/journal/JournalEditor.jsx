import { useEffect, useState } from "react";
import Button from "../common/Button";
import "./journal.css";

export default function JournalEditor({ initialEntry = null, selectedDate = new Date(), onSave, onCancel }) {
    const [title, setTitle] = useState(initialEntry?.title || "");
    const [content, setContent] = useState(initialEntry?.content || "");

    useEffect(() => {
        setTitle(initialEntry?.title || "");
        setContent(initialEntry?.content || "");
    }, [initialEntry]);

    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!content.trim()) {
            return;
        }

        onSave?.({
            id: initialEntry?.id || crypto.randomUUID(),
            date: new Date(selectedDate).toISOString(),
            title: title.trim(),
            content: content.trim(),
        });
    }

    return (
        <form className="journal-editor" onSubmit={handleSubmit}>
            <div className="journal-editor__header">
                <div>
                    <span className="journal-editor__label">Journal entry</span>

                    <h2 className="journal-editor__date">{formatDate(selectedDate)}</h2>
                </div>
            </div>

            <input
                type="text"
                className="journal-editor__title"
                placeholder="Title (optional)"
                value={title}
                onChange={event => setTitle(event.target.value)}
                maxLength={100}
            />

            <textarea
                className="journal-editor__content"
                placeholder="Write anything about today..."
                value={content}
                onChange={event => setContent(event.target.value)}
                rows={8}
                maxLength={5000}
            />

            <div className="journal-editor__footer">
                <span className="journal-editor__counter">{content.length}/5000</span>

                <div className="journal-editor__actions">
                    {onCancel && (
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}

                    <Button type="submit">Save entry</Button>
                </div>
            </div>
        </form>
    );
}
