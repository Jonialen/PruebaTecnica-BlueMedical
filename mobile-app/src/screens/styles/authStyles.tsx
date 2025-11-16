// src/screens/styles/authStyles.ts - Estilos para pantallas de autenticación
import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@theme';

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral[50],
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: 60,
        paddingBottom: 40,
    },

    // Header
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },

    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.brand[500],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },

    icon: {
        fontSize: 40,
        color: colors.white,
        fontWeight: typography.weights.bold,
    },

    title: {
        fontSize: typography.sizes.xxxl,
        fontWeight: typography.weights.bold,
        color: colors.neutral[800],
        marginBottom: spacing.sm,
    },

    subtitle: {
        fontSize: typography.sizes.md,
        color: colors.neutral[500],
    },

    // Form
    form: {
        marginBottom: spacing.xxxl,
    },

    submitButton: {
        marginTop: spacing.sm,
    },

    // Error
    errorContainer: {
        backgroundColor: colors.error[100],
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.error[500],
    },

    errorText: {
        color: colors.error[700],
        fontSize: typography.sizes.base,
    },

    // Footer
    footer: {
        alignItems: 'center',
    },

    footerText: {
        fontSize: typography.sizes.md,
        color: colors.neutral[500],
        marginBottom: spacing.sm,
    },

    linkText: {
        fontSize: typography.sizes.md,
        color: colors.brand[500],
        fontWeight: typography.weights.semibold,
    },
});