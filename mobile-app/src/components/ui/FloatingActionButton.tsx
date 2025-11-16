// src/components/ui/FloatingActionButton.tsx
import React, { useRef } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    Platform,
    Animated,
} from 'react-native';
import { colors, spacing, borderRadius, shadows } from '@theme';

interface FloatingActionButtonProps {
    onPress: () => void;
    icon?: string | React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    style?: ViewStyle;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    onPress,
    icon = '+',
    size = 'medium',
    style,
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const sizeStyles = {
        small: styles.small,
        medium: styles.medium,
        large: styles.large,
    };

    const iconSizes = {
        small: 24,
        medium: 32,
        large: 40,
    };

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={[
                styles.fab,
                sizeStyles[size],
                style,
                { transform: [{ scale: scaleAnim }] },
            ]}
        >
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.touchable}
                activeOpacity={1}
            >
                <Text style={[styles.icon, { fontSize: iconSizes[size] }]}>{icon}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: spacing.xl,
        right: spacing.xl,
        backgroundColor: colors.brand[500],
        borderRadius: borderRadius.lg,
        ...shadows.lg,
        // Elevación adicional en Android
        elevation: 8,
        // Borde sutil para más profundidad
        borderWidth: 2,
        borderColor: colors.brand[600],
    },
    touchable: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    small: {
        width: 48,
        height: 48,
    },
    medium: {
        width: 64,
        height: 64,
    },
    large: {
        width: 72,
        height: 72,
    },
    icon: {
        color: colors.white,
        fontWeight: '700',
        lineHeight: Platform.OS === 'ios' ? undefined : 32,
    },
});