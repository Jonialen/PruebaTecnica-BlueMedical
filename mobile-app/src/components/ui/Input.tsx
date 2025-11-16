// src/components/ui/Input.tsx - Refactorizado con sistema de diseño
import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '@theme';
import { commonStyles } from '@theme/commonStyles';

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    style,
    ...props
}) => {
    return (
        <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.inputLabel}>{label}</Text>
            <TextInput
                style={[
                    commonStyles.input,
                    error && commonStyles.inputError,
                    style,
                ]}
                placeholderTextColor={colors.neutral[400]}
                {...props}
            />
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    errorContainer: {
        marginTop: 4,
        marginLeft: 4,
    },
    errorText: {
        fontSize: 12,
        color: colors.error[500],
    },
});