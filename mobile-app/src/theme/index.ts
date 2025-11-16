// src/theme/index.ts - Sistema de diseño centralizado

export const colors = {
  // Brand
  brand: {
    50: '#FFF8F3',
    100: '#FFF0E6',
    200: '#F2CEA2',
    300: '#F2A81D',
    400: '#F2921D',
    500: '#F28322',
    600: '#D96E1A',
    700: '#BF5E15',
    800: '#A04E11',
    900: '#7A3B0D',
  },

  // Neutral
  neutral: {
    50: '#FAFAFA',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Status colors
  success: {
    50: '#F0FDF4',
    100: '#D1FAE5',
    500: '#10B981',
    700: '#065F46',
  },

  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    700: '#92400E',
  },

  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    700: '#DC2626',
  },

  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    700: '#1E40AF',
  },

  // Task status
  taskStatus: {
    pending: {
      bg: '#FEF3C7',
      text: '#92400E',
      border: '#FDE68A',
    },
    inProgress: {
      bg: '#DBEAFE',
      text: '#1E40AF',
      border: '#BFDBFE',
    },
    completed: {
      bg: '#D1FAE5',
      text: '#065F46',
      border: '#BBF7D0',
    },
  },

  // Common
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const typography = {
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const layout = {
  container: {
    paddingHorizontal: spacing.lg,
  },
  screen: {
    backgroundColor: colors.neutral[50],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.neutral[200],
  },
};

// Helper para obtener colores de estado de tarea
export const getTaskStatusColors = (status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') => {
  switch (status) {
    case 'PENDING':
      return colors.taskStatus.pending;
    case 'IN_PROGRESS':
      return colors.taskStatus.inProgress;
    case 'COMPLETED':
      return colors.taskStatus.completed;
  }
};

// Helper para obtener label de estado
export const getTaskStatusLabel = (status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') => {
  switch (status) {
    case 'PENDING':
      return 'Pendiente';
    case 'IN_PROGRESS':
      return 'En Progreso';
    case 'COMPLETED':
      return 'Completada';
  }
};