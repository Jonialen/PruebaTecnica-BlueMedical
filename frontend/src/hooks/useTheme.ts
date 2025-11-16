// useTheme.ts (src/hooks/useTheme.ts)

import { create } from "zustand";
import { useEffect } from "react";

/**
 * Interfaz que define el estado y las acciones del store del tema.
 */
interface ThemeState {
    /** Indica si el tema oscuro está activo. */
    isDark: boolean;
    /** Cambia entre el tema claro y oscuro. */
    toggle: () => void;
    /**
     * Establece el tema.
     * @param {boolean} isDark - `true` para el tema oscuro, `false` para el claro.
     */
    setTheme: (isDark: boolean) => void;
}

/**
 * Hook de Zustand para gestionar el estado del tema (claro/oscuro).
 * 
 * Almacena la preferencia del tema en el `localStorage`.
 */
export const useThemeStore = create<ThemeState>((set) => ({
    isDark: false,
    toggle: () => set((state) => {
        const newIsDark = !state.isDark;
        localStorage.setItem("theme", newIsDark ? "dark" : "light");
        return { isDark: newIsDark };
    }),
    setTheme: (isDark) => {
        localStorage.setItem("theme", isDark ? "dark" : "light");
        set({ isDark });
    },
}));

/**
 * Hook para gestionar el tema de la aplicación.
 * 
 * Sincroniza el estado del tema con el `localStorage` y la clase `dark` en el elemento `<html>`.
 * Proporciona el estado actual del tema y una función para cambiarlo.
 *
 * @returns {{isDark: boolean, toggle: () => void}} - El estado del tema y la función para cambiarlo.
 */
export const useTheme = () => {
    const { isDark, toggle, setTheme } = useThemeStore();

    // Efecto para inicializar el tema desde el localStorage al cargar la aplicación.
    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const initialTheme = stored === "dark";
        setTheme(initialTheme);

        if (initialTheme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [setTheme]);

    // Efecto para aplicar la clase 'dark' al HTML cuando cambia el estado del tema.
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return { isDark, toggle };
};
