import { useEffect } from "react";
import "./common.css";

export default function Modal({ isOpen, onClose, title, children, footer, size = "medium" }) {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return (
        <div className="common-modal__backdrop" onMouseDown={handleBackdropClick}>
            <div
                className={`common-modal common-modal--${size}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="common-modal__header">
                    <h2 id="modal-title" className="common-modal__title">
                        {title}
                    </h2>

                    <button type="button" className="common-modal__close" onClick={onClose} aria-label="Close modal">
                        ×
                    </button>
                </div>

                <div className="common-modal__content">{children}</div>

                {footer && <div className="common-modal__footer">{footer}</div>}
            </div>
        </div>
    );
}
