import Meowy from "./Meowy";
import "./meowy.css";

export default function MeowyMessage({ expression = "normal", title = "Meowy says", message, action, size = "small" }) {
    return (
        <div className="meowy-message">
            <Meowy expression={expression} size={size} />

            <div className="meowy-message__content">
                <span className="meowy-message__label">{title}</span>

                <p className="meowy-message__text">{message}</p>

                {action && <div className="meowy-message__action">{action}</div>}
            </div>
        </div>
    );
}
