import { useEffect, useState } from "react";
import LoadingScreen from "./components/common/LoadingScreen";

import AppRoutes from "./routes/AppRoutes";

import { useTheme } from "./context/ThemeContext";

export default function App() {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        document.title = "MeowyReminder";
    }, []);

    return (
        <div className="app" data-theme={theme}>
            {loading ? (
                <LoadingScreen onComplete={() => setLoading(false)} />
            ) : (
                <AppRoutes />
            )}
        </div>
    );
}
