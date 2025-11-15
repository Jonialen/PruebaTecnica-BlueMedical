import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Tasks from "@pages/Tasks";
import Register from "@pages/Register";
import { useAuthStore } from "@hooks/useAuthStore";

export const AppRouter = () => {
    const { token } = useAuthStore();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/tasks"
                    element={token ? <Tasks /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};