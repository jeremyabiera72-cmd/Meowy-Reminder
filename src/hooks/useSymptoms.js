import { useMemo } from "react";

import { STORAGE_KEYS } from "../constants/appConstants";
import useCycle from "./useCycle";
import useLocalStorage from "./useLocalStorage";

export default function useSymptoms() {
    const [entries, setEntries] = useLocalStorage(STORAGE_KEYS.SYMPTOMS, []);

    const { activeCycle } = useCycle();

    const addSymptomEntry = entry => {
        setEntries(previous => {
            const entryDateKey = new Date(entry.date).toISOString().split("T")[0];

            const existingEntry = previous.find(item => {
                if (item.cycleId !== entry.cycleId) {
                    return false;
                }

                if (!item.date) {
                    return false;
                }

                const itemDateKey = new Date(item.date).toISOString().split("T")[0];

                return itemDateKey === entryDateKey;
            });

            if (existingEntry) {
                return previous.map(item =>
                    item.id === existingEntry.id
                        ? {
                              ...item,
                              ...entry,
                              id: existingEntry.id,
                          }
                        : item,
                );
            }

            return [entry, ...previous];
        });
    };

    const updateSymptomEntry = (entryId, updates) => {
        setEntries(previous =>
            previous.map(entry =>
                entry.id === entryId
                    ? {
                          ...entry,
                          ...updates,
                      }
                    : entry,
            ),
        );
    };

    const deleteSymptomEntry = entryId => {
        setEntries(previous => previous.filter(entry => entry.id !== entryId));
    };

    const getEntriesForCycle = cycleId => {
        return entries.filter(entry => entry.cycleId === cycleId);
    };

    const getEntriesForDate = (date, cycleId = activeCycle?.id) => {
        if (!date) {
            return [];
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return [];
        }

        const dateKey = parsedDate.toISOString().split("T")[0];

        return entries.filter(entry => {
            if (!entry?.date) {
                return false;
            }

            const entryDate = new Date(entry.date);

            if (Number.isNaN(entryDate.getTime())) {
                return false;
            }

            const entryDateKey = entryDate.toISOString().split("T")[0];

            return entryDateKey === dateKey && (!cycleId || entry.cycleId === cycleId);
        });
    };

    const todayEntries = useMemo(() => {
        return getEntriesForDate(new Date());
    }, [entries, activeCycle?.id]);

    const cycleEntries = useMemo(() => {
        if (!activeCycle) {
            return [];
        }

        return getEntriesForCycle(activeCycle.id);
    }, [entries, activeCycle]);

    return {
        entries,
        todayEntries,
        cycleEntries,
        addSymptomEntry,
        updateSymptomEntry,
        deleteSymptomEntry,
        getEntriesForCycle,
        getEntriesForDate,
    };
}
