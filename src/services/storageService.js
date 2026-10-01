export function getStoredData(key, defaultValue = []) {
    try {
        const storedData = localStorage.getItem(key);

        if (!storedData) {
            return defaultValue;
        }

        return JSON.parse(storedData);
    } catch (error) {
        console.error(`Failed to read storage key: ${key}`, error);

        return defaultValue;
    }
}

export function setStoredData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));

        return true;
    } catch (error) {
        console.error(`Failed to save storage key: ${key}`, error);

        return false;
    }
}

export function removeStoredData(key) {
    try {
        localStorage.removeItem(key);

        return true;
    } catch (error) {
        console.error(`Failed to remove storage key: ${key}`, error);

        return false;
    }
}

export function clearStorage() {
    try {
        localStorage.clear();

        return true;
    } catch (error) {
        console.error("Failed to clear local storage", error);

        return false;
    }
}
