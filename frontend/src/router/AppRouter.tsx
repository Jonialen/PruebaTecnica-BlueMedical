// AppRouter.tsx (src/router/AppRouter.tsx)

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Tasks from "@pages/Tasks";
import Register from "@pages/Register";
import { useAuthStore } from "@hooks/useAuthStore";

/**
 * Componente de enrutamiento principal de la aplicación.
 * 
 * Gestiona las rutas y la navegación, protegiendo las rutas privadas
 * y redirigiendo a los usuarios según su estado de autenticación.
 *
 * @returns {JSX.Element} El enrutador de la aplicación.
 */
export const AppRouter = () => {
    // Obtiene el token del estado de autenticación para verificar si el usuario está logueado.
    const { token } = useAuthStore();

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas para el inicio de sesión y el registro. */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Ruta protegida para la página de tareas.
                    Si el usuario tiene un token, se muestra la página de tareas.
                    De lo contrario, se le redirige a la página de inicio de sesión. */}
                <Route
                    path="/tasks"
                    element={token ? <Tasks /> : <Navigate to="/login" />}
                />

                {/* Redirección para cualquier otra ruta no definida.
                    Cualquier ruta no reconocida redirige al usuario a la página de inicio de sesión. */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};
