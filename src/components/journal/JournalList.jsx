import Button from "../common/Button";
import "./journal.css";

export default function JournalList({ entries = [], onSelect, onDelete }) {
    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    if (entries.length === 0) {
        return (
            <div className="journal-empty">
                <div className="journal-empty__icon">+</div>

                <h3>No journal entries yet</h3>

                <p>Your private thoughts and notes will appear here.</p>
            </div>
        );
    }

    return (
        <div className="journal-list">
            {entries.map(entry => (
                <article key={entry.id} className="journal-entry">
                    <div className="journal-entry__content">
                        <span className="journal-entry__date">{formatDate(entry.date)}</span>

                        <h3 className="journal-entry__title">{entry.title || "Untitled entry"}</h3>

                        <p className="journal-entry__text">{entry.content}</p>
                    </div>

                    <div className="journal-entry__actions">
                        {onSelect && (
                            <Button size="small" variant="secondary" onClick={() => onSelect(entry)}>
                                Open
                            </Button>
                        )}

                        {onDelete && (
                            <Button size="small" variant="ghost" onClick={() => onDelete(entry)}>
                                Delete
                            </Button>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}
