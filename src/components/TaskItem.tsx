import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch } from '../redux/hooks';
import { deleteTask, startLoading, updateTask } from '../redux/slicers/TasksSlice';

interface Task {
    id: number;
    task: string;
    isDone: boolean;
}

interface TaskItemProps {
    index: number;
    item: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ index, item }) => {
    const dispatch = useAppDispatch();

    const completedTaskMethod = useCallback(() => {
        dispatch(startLoading());
        setTimeout(() => {
            dispatch(updateTask({ id: item.id, isDone: !item.isDone }));
        }, 1000);
    }, [dispatch, item.id, item.isDone]);

    const deleteTaskMethod = useCallback(() => {
        dispatch(startLoading());
        setTimeout(() => {
            dispatch(deleteTask(item.id));
        }, 1000);
    }, [dispatch, item.id]);

    return (
        <View style={styles.container}>
            <View style={[styles.indexContainer, { backgroundColor: item.isDone ? '#1DB82B' : '#3787EB' }]}>
                {item.isDone ? (
                    <MaterialIcons name="check" size={24} color="#fff" />
                ) : (
                    <Text style={styles.index}>{index}</Text>
                )}
            </View>

            <View style={[styles.taskContainer, { backgroundColor: item.isDone ? '#1DB82B' : '#3787EB' }]}>
                <Text style={styles.task}>{item.task}</Text>

                <View style={styles.containerChecked}>
                    <TouchableOpacity onPress={completedTaskMethod}>
                        <MaterialIcons
                            style={styles.icon}
                            name={item.isDone ? 'check-circle' : 'check-circle-outline'}
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={deleteTaskMethod}>
                        <MaterialIcons style={styles.icon} name="delete" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default TaskItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // marginHorizontal: 20,
        marginBottom:20
    },
    indexContainer: {
        borderRadius: 12,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    index: {
        color: '#fff',
        fontSize: 20,
    },
    taskContainer: {
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    task: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    containerChecked: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 10,
    },
});
