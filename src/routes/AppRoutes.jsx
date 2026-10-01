import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Calendar from "../pages/Calendar";
import Home from "../pages/Home";
import Insights from "../pages/Insights";
import Journal from "../pages/Journal";
import Reminders from "../pages/Reminders";
import Settings from "../pages/Settings";

import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function Login() {
    const { login } = useAuth();

    return (
        <div className="route-page">
            <h1>Login</h1>
            <p>Welcome to MeowyReminder! Log in or continue as guest.</p>
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                    type="button"
                    className="page__button"
                    onClick={() => login({ id: "user_1", email: "catlover@meowy.app", name: "Cat Friend" })}
                >
                    Log In / Demo User
                </button>
            </div>
        </div>
    );
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/insights" element={<Insights />} />
                    <Route path="/reminders" element={<Reminders />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
