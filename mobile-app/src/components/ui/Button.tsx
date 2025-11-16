// src/components/ui/Button.tsx - Refactorizado con sistema de diseño
import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { colors } from '@theme';
import { commonStyles } from '@theme/commonStyles';

interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    onPress,
    title,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
}) => {
    const isDisabled = disabled || loading;

    const getButtonStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primary;
            case 'secondary':
                return styles.secondary;
            case 'ghost':
                return styles.ghost;
            case 'danger':
                return styles.danger;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primaryText;
            case 'secondary':
                return styles.secondaryText;
            case 'ghost':
                return styles.ghostText;
            case 'danger':
                return styles.dangerText;
        }
    };

    const getLoadingColor = () => {
        return variant === 'primary' || variant === 'danger'
            ? colors.white
            : colors.brand[500];
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            style={[
                commonStyles.buttonBase,
                getButtonStyle(),
                isDisabled && styles.disabled,
                style,
            ]}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={getLoadingColor()} />
            ) : (
                <Text style={[commonStyles.buttonText, getTextStyle()]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    primary: {
        backgroundColor: colors.brand[500],
        borderColor: colors.brand[600],
    },
    secondary: {
        backgroundColor: colors.white,
        borderColor: colors.neutral[200],
    },
    ghost: {
        backgroundColor: colors.transparent,
        borderColor: colors.transparent,
    },
    danger: {
        backgroundColor: colors.error[500],
        borderColor: colors.error[700],
    },
    disabled: {
        opacity: 0.5,
    },
    primaryText: {
        color: colors.white,
    },
    secondaryText: {
        color: colors.neutral[800],
    },
    ghostText: {
        color: colors.brand[500],
    },
    dangerText: {
        color: colors.white,
    },
});