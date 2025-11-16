// src/theme/commonStyles.ts - Estilos reutilizables

import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '@theme';

export const commonStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },

  screenPadding: {
    paddingHorizontal: spacing.lg,
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.neutral[200],
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  // Typography
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[800],
  },

  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.neutral[500],
  },

  heading: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[800],
  },

  bodyText: {
    fontSize: typography.sizes.base,
    color: colors.neutral[700],
    lineHeight: typography.sizes.base * typography.lineHeights.normal,
  },

  caption: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[400],
  },

  // Buttons
  buttonBase: {
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    borderWidth: 2,
  },

  buttonPrimary: {
    backgroundColor: colors.brand[500],
    borderColor: colors.brand[600],
  },

  buttonSecondary: {
    backgroundColor: colors.white,
    borderColor: colors.neutral[200],
  },

  buttonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  buttonTextPrimary: {
    color: colors.white,
  },

  buttonTextSecondary: {
    color: colors.neutral[800],
  },

  // Inputs
  inputContainer: {
    marginBottom: spacing.lg,
  },

  inputLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[800],
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },

  input: {
    height: 56,
    borderWidth: 2,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    fontSize: typography.sizes.md,
    backgroundColor: colors.white,
    color: colors.neutral[800],
  },

  inputError: {
    borderColor: colors.error[500],
  },

  // Errors
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

  // Badges
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },

  badgeText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  // Lists
  listContainer: {
    padding: spacing.lg,
  },

  listItem: {
    marginBottom: spacing.lg,
  },

  // Modals
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

  // Headers
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },

  headerTitle: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[800],
  },

  // Icons
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.brand[500],
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainerLarge: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.brand[500],
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Separators
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: spacing.md,
  },

  // Shadows
  shadowSm: shadows.sm,
  shadowMd: shadows.md,
  shadowLg: shadows.lg,

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: spacing.lg,
    fontSize: typography.sizes.md,
    color: colors.neutral[500],
  },

  // Empty states
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },

  emptyTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[800],
    marginBottom: spacing.sm,
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: typography.sizes.md,
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: spacing.xl,
  },

  // Row layouts
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Gaps
  gapXs: { gap: spacing.xs },
  gapSm: { gap: spacing.sm },
  gapMd: { gap: spacing.md },
  gapLg: { gap: spacing.lg },
  gapXl: { gap: spacing.xl },
});