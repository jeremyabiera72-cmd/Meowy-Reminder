import { createContext, useContext, useEffect, useState } from "react";

import { STORAGE_KEYS } from "../constants/appConstants";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);

        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === "light" ? "dark" : "light"));
    };

    const value = {
        theme,

        isDark: theme === "dark",

        setTheme,
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}
