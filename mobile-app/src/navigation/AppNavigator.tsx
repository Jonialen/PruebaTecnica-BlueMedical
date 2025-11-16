// src/navigation/AppNavigator.tsx - Fixed with better state handling
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, Text } from 'react-native';
import { useAuthStore } from '@store/useAuthStore';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import TasksScreen from '@screens/TasksScreen';
import { colors } from '@theme';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Tasks: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    const { token, isInitialized, initialize } = useAuthStore();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            console.log('Initializing AppNavigator');
            await initialize();
            // Small delay to ensure state is properly set
            setTimeout(() => {
                setIsReady(true);
                console.log('AppNavigator ready, token:', token ? 'exists' : 'null');
            }, 100);
        };
        init();
    }, []);

    // Show loading while initializing
    if (!isInitialized || !isReady) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.neutral[50]
            }}>
                <ActivityIndicator size="large" color={colors.brand[500]} />
                <Text style={{
                    marginTop: 16,
                    color: colors.neutral[500],
                    fontSize: 16
                }}>
                    Cargando...
                </Text>
            </View>
        );
    }

    console.log('Rendering navigation, authenticated:', !!token);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            >
                {token ? (
                    <Stack.Screen
                        name="Tasks"
                        component={TasksScreen}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};