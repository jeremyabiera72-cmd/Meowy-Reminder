import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
    const getInitialValue = useCallback(() => {
        try {
            const storedValue = localStorage.getItem(key);

            if (storedValue !== null) {
                return JSON.parse(storedValue);
            }

            return typeof initialValue === "function" ? initialValue() : initialValue;
        } catch {
            return typeof initialValue === "function" ? initialValue() : initialValue;
        }
    }, [key, initialValue]);

    const [value, setValue] = useState(getInitialValue);

    /*
     * Keep this hook synchronized with localStorage changes
     * made by other instances of the hook in the same tab.
     */
    useEffect(() => {
        const handleStorageUpdate = event => {
            if (event.detail?.key !== key) {
                return;
            }

            setValue(event.detail.value);
        };

        window.addEventListener("meowyreminder-storage", handleStorageUpdate);

        return () => {
            window.removeEventListener("meowyreminder-storage", handleStorageUpdate);
        };
    }, [key]);

    /*
     * Wrapped setter.
     * This updates React state, localStorage, and notifies
     * other useLocalStorage instances immediately.
     */
    const updateValue = useCallback(
        nextValue => {
            setValue(previousValue => {
                const resolvedValue = typeof nextValue === "function" ? nextValue(previousValue) : nextValue;

                try {
                    localStorage.setItem(key, JSON.stringify(resolvedValue));

                    window.dispatchEvent(
                        new CustomEvent("meowyreminder-storage", {
                            detail: {
                                key,
                                value: resolvedValue,
                            },
                        }),
                    );
                } catch {
                    // Ignore storage errors.
                }

                return resolvedValue;
            });
        },
        [key],
    );

    /*
     * Keep localStorage updated if the state changes
     * through normal React state updates.
     */
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Ignore storage errors.
        }
    }, [key, value]);

    const removeValue = useCallback(() => {
        try {
            localStorage.removeItem(key);

            setValue(typeof initialValue === "function" ? initialValue() : initialValue);

            window.dispatchEvent(
                new CustomEvent("meowyreminder-storage", {
                    detail: {
                        key,
                        value: typeof initialValue === "function" ? initialValue() : initialValue,
                    },
                }),
            );
        } catch {
            // Ignore storage errors.
        }
    }, [key, initialValue]);

    return [value, updateValue, removeValue];
}
