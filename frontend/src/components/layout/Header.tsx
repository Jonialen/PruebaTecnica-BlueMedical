// src/components/layout/Header.tsx
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '@store/authStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Brand */}
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-primary-600">
                            Gestor de Tareas
                        </h1>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                            <User className="h-5 w-5 text-gray-400" />
                            <span className="font-medium">{user?.name}</span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Cerrar sesión</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;