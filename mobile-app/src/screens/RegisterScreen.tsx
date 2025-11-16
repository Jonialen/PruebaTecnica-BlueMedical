// src/screens/RegisterScreen.tsx - Refactorizado
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

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
    navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { register, loading, error } = useAuthStore();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const validateForm = () => {
        if (!name.trim()) {
            setValidationError('El nombre es requerido');
            return false;
        }
        if (name.trim().length < 2) {
            setValidationError('El nombre debe tener al menos 2 caracteres');
            return false;
        }
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

    const handleRegister = async () => {
        setValidationError(null);

        if (!validateForm()) return;

        const success = await register(name, email, password);
        if (success) {
            Alert.alert('Éxito', 'Registro exitoso');
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
                    <Text style={authStyles.title}>Crea tu cuenta</Text>
                    <Text style={authStyles.subtitle}>
                        Comienza a organizar tus tareas hoy
                    </Text>
                </View>

                <View style={authStyles.form}>
                    <Input
                        label="Nombre completo"
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                            setValidationError(null);
                        }}
                        placeholder="Juan Pérez"
                        autoCapitalize="words"
                    />

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
                        placeholder="Mínimo 6 caracteres"
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    {displayError && (
                        <View style={authStyles.errorContainer}>
                            <Text style={authStyles.errorText}>{displayError}</Text>
                        </View>
                    )}

                    <Button
                        title="Crear mi cuenta"
                        onPress={handleRegister}
                        loading={loading}
                        style={authStyles.submitButton}
                    />
                </View>

                <View style={authStyles.footer}>
                    <Text style={authStyles.footerText}>¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={authStyles.linkText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;