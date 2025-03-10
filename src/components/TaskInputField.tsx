import React, { Dispatch, SetStateAction, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, Platform, } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createTask, startLoading } from '../redux/slicers/TasksSlice';

const TaskInputField = () => {
    const [task, setTask] = useState('');
    // const {addTask} = route
    const dispatch = useAppDispatch()
    const { taskList, error, loading } = useAppSelector(state => state.tasks)
    const handleAddTask = (value: string) => {
        if (value == '') return;
        const taskItem = {
            task: value,
            id: taskList.length + 1,
            isDone: false
        }
        dispatch(startLoading())
        setTimeout(() => {
            dispatch(createTask(taskItem))
        }, 1000);
        setTask('');
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TextInput style={styles.inputField} value={task} onChangeText={text => setTask(text)} placeholder={'Write a task'} placeholderTextColor={'#fff'} />
            <TouchableOpacity onPress={() => handleAddTask(task)}>
                <View style={styles.button}>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

export default TaskInputField;

const styles = StyleSheet.create({
    container: {
        borderColor: '#fff',
        backgroundColor: '#3787EB',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
    },
    inputField: {
        color: '#fff',
        height: 50,
        flex: 1,
    },
    button: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});