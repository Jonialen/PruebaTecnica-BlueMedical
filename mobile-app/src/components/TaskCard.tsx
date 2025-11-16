// src/components/TaskCard.tsx - Refactorizado con sistema de diseño
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { format } from 'date-fns';
import { Task } from '@models';
import { colors, spacing, borderRadius, typography } from '@theme';
import { getTaskStatusColors, getTaskStatusLabel } from '@theme';
import { Platform } from "react-native";
import {
    CheckCircle2 as NativeCheck,
    Clock as NativeClock,
    Loader2 as NativeLoader,
    Trash2 as NativeTrash
} from "lucide-react-native";

import {
    CheckCircle2 as WebCheck,
    Clock as WebClock,
    Loader2 as WebLoader,
    Trash2 as WebTrash
} from "lucide-react";

const CheckIcon = Platform.OS === "web" ? WebCheck : NativeCheck;
const ClockIcon = Platform.OS === "web" ? WebClock : NativeClock;
const LoaderIcon = Platform.OS === "web" ? WebLoader : NativeLoader;
const TrashIcon = Platform.OS === "web" ? WebTrash : NativeTrash;

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
        if (Platform.OS === "web") {
            const confirmed = window.confirm("¿Estás seguro de eliminar esta tarea?");
            if (confirmed) onDelete();
        } else {
            Alert.alert(
                "Eliminar tarea",
                "¿Estás seguro de eliminar esta tarea?",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Eliminar", style: "destructive", onPress: onDelete },
                ]
            );
        }
    };


    const statusConfig = {
        PENDING: {
            icon: ClockIcon,
        },
        IN_PROGRESS: {
            icon: LoaderIcon,
        },
        COMPLETED: {
            icon: CheckIcon,
        },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    const statusColors = getTaskStatusColors(status);
    const statusLabel = getTaskStatusLabel(status);
    const safeDescription = (description ?? "").trim();

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
                        {safeDescription.length > 0 && (
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
                        <TrashIcon size={20} color={colors.neutral[400]} />
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