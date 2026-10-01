import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <main className="auth-layout">
            <div className="auth-layout__container">
                <div className="auth-layout__brand">
                    <div className="auth-layout__logo">M</div>

                    <div>
                        <h1>MeowyReminder</h1>

                        <p>Your personal cycle companion</p>
                    </div>
                </div>

                <div className="auth-layout__content">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}
