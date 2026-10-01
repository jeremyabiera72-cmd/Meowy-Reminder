import { createContext, useContext, useMemo } from "react";
import { CYCLE_STATUS, DEFAULT_CYCLE_LENGTH, DEFAULT_PERIOD_LENGTH } from "../constants/cycleConstants";
import { STORAGE_KEYS } from "../constants/appConstants";
import useLocalStorage from "../hooks/useLocalStorage";

const CycleContext = createContext(null);

export function CycleProvider({ children }) {
    const [cycles, setCycles] = useLocalStorage(STORAGE_KEYS.CYCLE, []);
    const [activeCycleId, setActiveCycleId] = useLocalStorage("meowyreminder-active-cycle-id", null);

    const activeCycle = useMemo(() => {
        if (!cycles.length) return null;
        if (activeCycleId) {
            const found = cycles.find(cycle => cycle.id === activeCycleId);
            if (found) return found;
        }
        return cycles[cycles.length - 1] || null;
    }, [cycles, activeCycleId]);

    const startCycle = ({ startDate, cycleLength = DEFAULT_CYCLE_LENGTH, periodLength = DEFAULT_PERIOD_LENGTH }) => {
        const cycle = {
            id: crypto.randomUUID(),

            cycleNumber: cycles.length + 1,

            startDate,

            endDate: null,

            cycleLength,

            periodLength,

            status: CYCLE_STATUS.ACTIVE,

            createdAt: new Date().toISOString(),
        };

        setCycles(previous => [...previous, cycle]);

        setActiveCycleId(cycle.id);

        return cycle;
    };

    const completeCycle = (cycleId, endDate) => {
        setCycles(previous =>
            previous.map(cycle =>
                cycle.id === cycleId
                    ? {
                          ...cycle,
                          endDate,
                          status: CYCLE_STATUS.COMPLETED,
                      }
                    : cycle,
            ),
        );

        if (cycleId === activeCycleId) {
            setActiveCycleId(null);
        }
    };

    const updateCycle = (cycleId, updates) => {
        setCycles(previous =>
            previous.map(cycle =>
                cycle.id === cycleId
                    ? {
                          ...cycle,
                          ...updates,
                      }
                    : cycle,
            ),
        );
    };

    const resetCycles = () => {
        setCycles([]);
        setActiveCycleId(null);
    };

    const value = {
        cycles,
        activeCycle,
        activeCycleId,

        startCycle,
        completeCycle,
        updateCycle,
        resetCycles,

        setCycles,
        setActiveCycleId,
    };

    return <CycleContext.Provider value={value}>{children}</CycleContext.Provider>;
}

export function useCycle() {
    const context = useContext(CycleContext);

    if (!context) {
        throw new Error("useCycle must be used inside CycleProvider");
    }

    return context;
}
