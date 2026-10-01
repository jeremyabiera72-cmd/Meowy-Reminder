import { useEffect, useState } from "react";
import logo from "../../assets/icons/logo.png";
import "./LoadingScreen.css";

export default function LoadingScreen({ onComplete, duration = 2200 }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const start = Date.now();

        const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            const nextProgress = Math.min(
                Math.round((elapsed / duration) * 100),
                100
            );

            setProgress(nextProgress);

            if (nextProgress >= 100) {
                clearInterval(timer);

                setTimeout(() => {
                    onComplete?.();
                }, 250);
            }
        }, 30);

        return () => clearInterval(timer);
    }, [duration, onComplete]);

    return (
        <main className="meowy-loading">
            <div className="meowy-loading__content">
                <div className="meowy-logo" aria-label="MeowyReminder">
                    <img
                        src={logo}
                        alt="MeowyReminder cat logo"
                        className="meowy-cat-img"
                    />

                    <div className="meowy-calendar">
                        <div className="meowy-calendar__top" />
                        <div className="meowy-calendar__grid">
                            <i />
                            <i />
                            <i />
                            <i />
                            <i />
                            <i />
                            <i className="is-checked">✓</i>
                            <i />
                        </div>
                    </div>
                </div>

                <div className="meowy-loading__brand">
                    <span>Meowy</span>
                    <strong>Reminder</strong>
                </div>

                <p className="meowy-loading__message">
                    Your Meow to remind you every day.
                </p>

                <div className="meowy-loading__progress">
                    <div
                        className="meowy-loading__progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="meowy-loading__status">
                    {progress < 100 ? "Preparing your reminders..." : "Ready!"}
                </p>
            </div>
        </main>
    );
}
