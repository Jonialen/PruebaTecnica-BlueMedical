// src/components/TaskCard.tsx - Refactorizado con sistema de diseño
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { format } from 'date-fns';
import { Task } from '@models';
import { colors, spacing, borderRadius, typography } from '@theme';
import { getTaskStatusColors, getTaskStatusLabel } from '@theme';
import { CheckCircle2, Clock, Loader2, Trash2 } from 'lucide-react-native';

interface TaskCardProps {
    task: Task;
    onDelete: () => void;
    onUpdate: (data: Partial<Task>) => void;
    onPress?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onDelete,
    onUpdate,
    onPress,
}) => {
    const { title, description, status, createdAt } = task;

    const nextStatus = () => {
        if (status === 'PENDING') return 'IN_PROGRESS';
        if (status === 'IN_PROGRESS') return 'COMPLETED';
        return 'PENDING';
    };

    const handleStatusChange = () => {
        const newStatus = nextStatus();
        onUpdate({ status: newStatus });
    };

    const handleDelete = () => {
        Alert.alert(
            'Eliminar tarea',
            '¿Estás seguro de eliminar esta tarea?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: onDelete },
            ]
        );
    };

    const statusConfig = {
        PENDING: {
            icon: Clock,
        },
        IN_PROGRESS: {
            icon: Loader2,
        },
        COMPLETED: {
            icon: CheckCircle2,
        },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    const statusColors = getTaskStatusColors(status);
    const statusLabel = getTaskStatusLabel(status);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.statusBar, { backgroundColor: statusColors.text }]} />

            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={[styles.statusButton, { backgroundColor: statusColors.bg }]}
                        onPress={handleStatusChange}
                    >
                        <Icon size={20}
                            color={statusColors.text}
                            strokeWidth={2}
                        />
                    </TouchableOpacity>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={2}>
                            {title}
                        </Text>
                        {description && (
                            <Text style={styles.description} numberOfLines={2}>
                                {description}
                            </Text>
                        )}
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={[styles.badge, { backgroundColor: statusColors.bg }]}>
                        <Text style={[styles.badgeText, { color: statusColors.text }]}>
                            {statusLabel}
                        </Text>
                    </View>

                    <Text style={styles.date}>
                        {format(new Date(createdAt), 'dd/MM/yyyy')}
                    </Text>

                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Trash2 size={20} color={colors.neutral[400]} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.lg,
        borderWidth: 2,
        borderColor: colors.neutral[200],
        overflow: 'hidden',
    },
    statusBar: {
        height: 4,
    },
    content: {
        padding: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        marginBottom: spacing.md,
    },
    statusButton: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    statusIcon: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        color: colors.neutral[800],
        marginBottom: spacing.xs,
    },
    description: {
        fontSize: typography.sizes.base,
        color: colors.neutral[500],
        lineHeight: typography.sizes.xl,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.neutral[200],
    },
    badge: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
        marginRight: spacing.sm,
    },
    badgeText: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.semibold,
    },
    date: {
        fontSize: typography.sizes.sm,
        color: colors.neutral[400],
        flex: 1,
    },
    deleteButton: {
        padding: spacing.sm,
    },
    deleteIcon: {
        fontSize: typography.sizes.lg,
    },
});