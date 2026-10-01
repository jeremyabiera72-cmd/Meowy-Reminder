import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState({ id: "user_1", email: "user@meowy.app", name: "User" });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("meowyreminder-user");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("meowyreminder-user");
            }
        }

        setLoading(false);
    }, []);

    const login = userData => {
        setUser(userData);
        localStorage.setItem("meowyreminder-user", JSON.stringify(userData));
    };

    const updateUser = updates => {
        setUser(prev => {
            const nextUser = { ...prev, ...updates };
            localStorage.setItem("meowyreminder-user", JSON.stringify(nextUser));
            return nextUser;
        });
    };

    const logout = () => {
        setUser(null);

        localStorage.removeItem("meowyreminder-user");
    };

    const value = {
        user,
        loading,
        isAuthenticated: Boolean(user),

        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
