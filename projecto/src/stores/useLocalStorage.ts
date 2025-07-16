import { create } from "zustand";

interface LocalStorageStore {
    get: (key: string) => string | null;
    set: (key: string, value: string) => void;
    remove: (key: string) => void;
}

export const useLocalStorageStore = create<LocalStorageStore>(() => ({
    get: (key) => localStorage.getItem(key),
    set: (key, value) => localStorage.setItem(key, value),
    remove: (key) => localStorage.removeItem(key),
}));
