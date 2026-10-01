import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import { CycleProvider } from "./context/CycleContext";

import { ThemeProvider } from "./context/ThemeContext";

import "./App.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <CycleProvider>
                    <App />
                </CycleProvider>
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>,
);
