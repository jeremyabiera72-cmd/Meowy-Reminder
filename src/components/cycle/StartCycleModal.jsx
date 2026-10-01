import { useState } from "react";
import Button from "../common/Button";
import Modal from "../common/Modal";
import "./cycle.css";

export default function StartCycleModal({ isOpen, onClose, onConfirm }) {
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);

    function handleSubmit(event) {
        event.preventDefault();

        if (!startDate) {
            return;
        }

        onConfirm({
            startDate,
        });
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Start a new cycle"
            size="small"
        >
            <form id="start-cycle-form" className="start-cycle-form" onSubmit={handleSubmit}>
                <div className="start-cycle-form__message">
                    <div className="start-cycle-form__icon">+</div>

                    <div>
                        <h3>Starting a new cycle?</h3>

                        <p>
                            Your previous cycle and its symptoms will remain saved. A fresh symptom tracker will be
                            created for this cycle.
                        </p>
                    </div>
                </div>

                <label className="start-cycle-form__label" htmlFor="cycle-start-date">
                    Cycle start date
                </label>

                <input
                    id="cycle-start-date"
                    className="start-cycle-form__input"
                    type="date"
                    value={startDate}
                    onChange={event => setStartDate(event.target.value)}
                    required
                />

                <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button type="submit">
                        Start cycle
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
