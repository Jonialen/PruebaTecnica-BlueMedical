// src/screens/TasksScreen.tsx - Fixed logout button for web
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Alert,
    Modal,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@store/useAuthStore';
import { useTaskStore } from '@store/useTaskStore';
import { TaskCard } from '@components/TaskCard';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { FloatingActionButton } from '@components/ui/FloatingActionButton';
import { Task, TaskStatus } from '@models';
import { tasksStyles } from './styles/tasksStyles';
import { commonStyles } from '@theme/commonStyles';
import { colors } from '@theme';

// Import icons conditionally based on platform
import {
    Plus as NativePlus,
    LogOut as NativeLogOut,
    CheckSquare as NativeCheckSquare
} from 'lucide-react-native';

import {
    Plus as WebPlus,
    LogOut as WebLogOut,
    CheckSquare as WebCheckSquare
} from 'lucide-react';

const PlusIcon = Platform.OS === 'web' ? WebPlus : NativePlus;
const LogOutIcon = Platform.OS === 'web' ? WebLogOut : NativeLogOut;
const CheckSquareIcon = Platform.OS === 'web' ? WebCheckSquare : NativeCheckSquare;

// Componente separado para el Header
const TasksHeader: React.FC<{
    userName?: string;
    search: string;
    onSearchChange: (text: string) => void;
    onLogout: () => void;
}> = ({ userName, search, onSearchChange, onLogout }) => (
    <View style={tasksStyles.header}>
        <View style={tasksStyles.headerTop}>
            <View style={tasksStyles.headerLeft}>
                <View style={tasksStyles.iconContainer}>
                    <CheckSquareIcon color={colors.white} size={28} />
                </View>
                <View>
                    <Text style={tasksStyles.headerTitle}>Mis Tareas</Text>
                    {userName && (
                        <Text style={tasksStyles.headerSubtitle}>
                            Hola, {userName.split(' ')[0]}
                        </Text>
                    )}
                </View>
            </View>
            <TouchableOpacity onPress={onLogout} style={tasksStyles.logoutButton}>
                <LogOutIcon size={24} color={colors.neutral[600]} />
            </TouchableOpacity>
        </View>

        <View style={tasksStyles.searchContainer}>
            <TextInput
                style={tasksStyles.searchInput}
                placeholder="Buscar tareas..."
                value={search}
                onChangeText={onSearchChange}
                placeholderTextColor={colors.neutral[400]}
            />
        </View>
    </View>
);

// Componente para los filtros
const TaskFilters: React.FC<{
    filter: string;
    onFilterChange: (filter: string) => void;
}> = ({ filter, onFilterChange }) => {
    const filters = [
        { key: 'ALL', label: 'Todas' },
        { key: 'PENDING', label: 'Pendientes' },
        { key: 'IN_PROGRESS', label: 'En Progreso' },
        { key: 'COMPLETED', label: 'Completadas' },
    ];

    return (
        <View style={tasksStyles.filtersContainer}>
            <FlatList
                data={filters}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            tasksStyles.filterButton,
                            filter === item.key && tasksStyles.filterButtonActive,
                        ]}
                        onPress={() => onFilterChange(item.key)}
                    >
                        <Text
                            style={[
                                tasksStyles.filterText,
                                filter === item.key && tasksStyles.filterTextActive,
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

// Componente para las estadísticas
const TaskStats: React.FC<{
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
}> = ({ total, completed, inProgress, pending }) => {
    if (total === 0) return null;

    return (
        <View style={tasksStyles.statsContainer}>
            <View style={tasksStyles.statCard}>
                <Text style={tasksStyles.statLabel}>Total</Text>
                <Text style={tasksStyles.statValue}>{total}</Text>
            </View>
            <View style={[tasksStyles.statCard, tasksStyles.statCardGreen]}>
                <Text style={tasksStyles.statLabelGreen}>Completadas</Text>
                <Text style={tasksStyles.statValueGreen}>{completed}</Text>
            </View>
            <View style={[tasksStyles.statCard, tasksStyles.statCardBlue]}>
                <Text style={tasksStyles.statLabelBlue}>En Progreso</Text>
                <Text style={tasksStyles.statValueBlue}>{inProgress}</Text>
            </View>
            <View style={[tasksStyles.statCard, tasksStyles.statCardYellow]}>
                <Text style={tasksStyles.statLabelYellow}>Pendientes</Text>
                <Text style={tasksStyles.statValueYellow}>{pending}</Text>
            </View>
        </View>
    );
};

// Componente para el modal de crear/editar tarea
const TaskModal: React.FC<{
    visible: boolean;
    task: Task | null;
    onClose: () => void;
    onSave: (title: string, description: string) => void;
}> = ({ visible, task, onClose, onSave }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    useEffect(() => {
        if (visible) {
            setTitle(task?.title || '');
            setDescription(task?.description || '');
        }
    }, [visible, task]);

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Error', 'El título es requerido');
            return;
        }
        onSave(title, description);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <View style={tasksStyles.modalOverlay}>
                <View style={tasksStyles.modalContent}>
                    <View style={tasksStyles.modalHeader}>
                        <Text style={tasksStyles.modalTitle}>
                            {task ? 'Editar tarea' : 'Nueva tarea'}
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={tasksStyles.modalClose}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <Input
                        label="Título"
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Nombre de la tarea"
                    />

                    <View style={tasksStyles.textareaContainer}>
                        <Text style={tasksStyles.textareaLabel}>Descripción</Text>
                        <TextInput
                            style={tasksStyles.textarea}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Agrega detalles (opcional)"
                            multiline
                            numberOfLines={4}
                            placeholderTextColor={colors.neutral[400]}
                        />
                    </View>

                    <View style={tasksStyles.modalButtons}>
                        <Button
                            title="Cancelar"
                            onPress={onClose}
                            variant="secondary"
                            style={tasksStyles.modalButton}
                        />
                        <Button
                            title={task ? 'Guardar' : 'Crear'}
                            onPress={handleSave}
                            style={tasksStyles.modalButton}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Componente principal
type FilterType = 'ALL' | TaskStatus;

const TasksScreen = () => {
    const { logout, user } = useAuthStore();
    const { tasks, fetchTasks, addTask, updateTask, deleteTask, loading } = useTaskStore();

    const [filter, setFilter] = useState<FilterType>('ALL');
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks(filter !== 'ALL' ? filter : undefined);
    }, [filter]);

    const filteredTasks = tasks.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.description ?? '').toLowerCase().includes(search.toLowerCase())
    );

    const handleLogout = () => {
        if (Platform.OS === 'web') {
            const confirmed = window.confirm('¿Estás seguro de cerrar sesión?');
            if (confirmed) {
                console.log('User confirmed logout');
                logout();
            }
        } else {
            Alert.alert('Cerrar sesión', '¿Estás seguro de cerrar sesión?', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Cerrar sesión', style: 'destructive', onPress: logout },
            ]);
        }
    };

    const openModal = (task?: Task) => {
        setSelectedTask(task || null);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedTask(null);
    };

    const handleSaveTask = async (title: string, description: string) => {
        try {
            if (selectedTask) {
                await updateTask(selectedTask.id, { title, description: description || null });
                Alert.alert('Éxito', 'Tarea actualizada');
            } else {
                await addTask({ title, description: description || undefined, status: 'PENDING' });
                Alert.alert('Éxito', 'Tarea creada');
            }
            closeModal();
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar la tarea');
        }
    };

    const taskCount = filteredTasks.length;
    const stats = {
        total: taskCount,
        completed: filteredTasks.filter((t) => t.status === 'COMPLETED').length,
        pending: filteredTasks.filter((t) => t.status === 'PENDING').length,
        inProgress: filteredTasks.filter((t) => t.status === 'IN_PROGRESS').length,
    };

    return (
        <SafeAreaView style={commonStyles.container} edges={['top']}>
            <TasksHeader
                userName={user?.name}
                search={search}
                onSearchChange={setSearch}
                onLogout={handleLogout}
            />

            <View style={[tasksStyles.header, { borderBottomWidth: 0 }]}>
                <TaskFilters
                    filter={filter}
                    onFilterChange={(f) => setFilter(f as FilterType)}
                />
            </View>

            <TaskStats {...stats} />

            {loading ? (
                <View style={commonStyles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.brand[500]} />
                    <Text style={commonStyles.loadingText}>Cargando tareas...</Text>
                </View>
            ) : filteredTasks.length === 0 ? (
                <View style={commonStyles.emptyContainer}>
                    <Text style={commonStyles.emptyTitle}>
                        {search ? 'No se encontraron tareas' : '¡Comienza tu día productivo!'}
                    </Text>
                    <Text style={commonStyles.emptySubtitle}>
                        {search ? 'Intenta con otro término' : 'Crea tu primera tarea con el botón +'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredTasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TaskCard
                            task={item}
                            onDelete={() => deleteTask(item.id)}
                            onUpdate={(data) => updateTask(item.id, data)}
                            onPress={() => openModal(item)}
                        />
                    )}
                    contentContainerStyle={tasksStyles.listContent}
                />
            )}

            {/* Floating Action Button */}
            <FloatingActionButton
                onPress={() => openModal()}
                icon={<PlusIcon color={colors.white} size={24} />}
                size="medium"
            />

            <TaskModal
                visible={modalVisible}
                task={selectedTask}
                onClose={closeModal}
                onSave={handleSaveTask}
            />
        </SafeAreaView>
    );
};

export default TasksScreen;