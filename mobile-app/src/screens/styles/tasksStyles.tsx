// src/screens/styles/tasksStyles.ts - Actualizado sin botón en header
import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@theme';

export const tasksStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral[50],
    },

    // Header
    header: {
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral[200],
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.sm,
        paddingTop: spacing.sm,

    },

    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
        marginTop: spacing.lg,
    },

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: colors.brand[500],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },

    headerIcon: {
        fontSize: typography.sizes.xxl,
        color: colors.white,
        fontWeight: typography.weights.bold,
    },

    headerTitle: {
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.bold,
        color: colors.neutral[800],
    },

    headerSubtitle: {
        fontSize: typography.sizes.base,
        color: colors.neutral[500],
    },

    logoutButton: {
        padding: spacing.sm,
    },

    logoutText: {
        fontSize: typography.sizes.xxl,
    },

    // Search
    searchContainer: {
        marginBottom: spacing.lg,
    },

    searchInput: {
        height: 48,
        backgroundColor: colors.neutral[100],
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.lg,
        fontSize: typography.sizes.md,
        color: colors.neutral[800],
    },

    // Filters (sin botón de nueva tarea)
    filtersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    filterButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        backgroundColor: colors.neutral[100],
        marginRight: spacing.sm,
    },

    filterButtonActive: {
        backgroundColor: colors.brand[500],
    },

    filterText: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.semibold,
        color: colors.neutral[500],
    },

    filterTextActive: {
        color: colors.white,
    },

    // Stats
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
        gap: spacing.sm,
    },

    statCard: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        borderWidth: 2,
        borderColor: colors.neutral[200],
    },

    statCardGreen: {
        backgroundColor: colors.success[100],
        borderColor: colors.success[500],
    },

    statCardBlue: {
        backgroundColor: colors.info[100],
        borderColor: colors.info[500],
    },

    statCardYellow: {
        backgroundColor: colors.warning[100],
        borderColor: colors.warning[500],
    },

    statLabel: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.semibold,
        color: colors.neutral[500],
        marginBottom: spacing.xs,
    },

    statValue: {
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.bold,
        color: colors.neutral[800],
    },

    statLabelGreen: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.semibold,
        color: colors.success[700],
        marginBottom: spacing.xs,
    },

    statValueGreen: {
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.bold,
        color: colors.success[700],
    },

    statLabelBlue: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.semibold,
        color: colors.info[700],
        marginBottom: spacing.xs,
    },

    statValueBlue: {
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.bold,
        color: colors.info[700],
    },

    statLabelYellow: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.semibold,
        color: colors.warning[700],
        marginBottom: spacing.xs,
    },

    statValueYellow: {
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.bold,
        color: colors.warning[700],
    },

    // List (con padding inferior para el FAB)
    listContent: {
        padding: spacing.lg,
        // Espacio extra en la parte inferior para el FAB
        paddingBottom: spacing.xxxl + 64 + spacing.lg, // 40 + 64 (tamaño FAB) + 16
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },

    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: borderRadius.xl,
        borderTopRightRadius: borderRadius.xl,
        padding: spacing.xl,
        maxHeight: '80%',
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },

    modalTitle: {
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.bold,
        color: colors.neutral[800],
    },

    modalClose: {
        fontSize: typography.sizes.xxl,
        color: colors.neutral[500],
    },

    textareaContainer: {
        marginBottom: spacing.lg,
    },

    textareaLabel: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.semibold,
        color: colors.neutral[800],
        marginBottom: spacing.sm,
        marginLeft: spacing.xs,
    },

    textarea: {
        height: 120,
        borderWidth: 2,
        borderColor: colors.neutral[200],
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        fontSize: typography.sizes.md,
        textAlignVertical: 'top',
        color: colors.neutral[800],
    },

    modalButtons: {
        flexDirection: 'row',
        gap: spacing.md,
    },

    modalButton: {
        flex: 1,
    },
});