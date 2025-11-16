// src/screens/LoginScreen.tsx - Refactorizado
import React, { useState } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import { useAuthStore } from '@store/useAuthStore';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { authStyles } from '@screens/styles/authStyles';
import { CheckSquare } from 'lucide-react-native';
import { colors } from '@/theme';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { login, loading, error } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const validateForm = () => {
        if (!email.trim()) {
            setValidationError('El correo es requerido');
            return false;
        }
        if (!password) {
            setValidationError('La contraseña es requerida');
            return false;
        }
        if (password.length < 6) {
            setValidationError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        setValidationError(null);

        if (!validateForm()) return;

        const success = await login(email, password);
        if (success) {
            Alert.alert('Éxito', 'Inicio de sesión exitoso');
        } else if (error) {
            Alert.alert('Error', error);
        }
    };

    const displayError = validationError || error;

    return (
        <KeyboardAvoidingView
            style={authStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={authStyles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={authStyles.header}>
                    <View style={authStyles.iconContainer}>
                        <CheckSquare color={colors.neutral[100]} size={70} />
                    </View>
                    <Text style={authStyles.title}>Bienvenido de nuevo</Text>
                    <Text style={authStyles.subtitle}>
                        Ingresa para gestionar tus tareas
                    </Text>
                </View>

                <View style={authStyles.form}>
                    <Input
                        label="Correo electrónico"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setValidationError(null);
                        }}
                        placeholder="tu@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Input
                        label="Contraseña"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setValidationError(null);
                        }}
                        placeholder="••••••••"
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    {displayError && (
                        <View style={authStyles.errorContainer}>
                            <Text style={authStyles.errorText}>{displayError}</Text>
                        </View>
                    )}

                    <Button
                        title="Iniciar sesión"
                        onPress={handleLogin}
                        loading={loading}
                        style={authStyles.submitButton}
                    />
                </View>

                <View style={authStyles.footer}>
                    <Text style={authStyles.footerText}>¿No tienes una cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={authStyles.linkText}>Crear cuenta nueva</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;