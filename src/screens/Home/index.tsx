import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import TaskItem from '../../components/TaskItem';
import TaskInputField from '../../components/TaskInputField';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ErrorModal from '../../components/ErrorModal';


interface Task {
  id: number;
  task: string;
  isDone: boolean;
}

const HomeScreen = () => {
  const { taskList, error, loading } = useAppSelector(state => state.tasks);
  const [modalVisible, setModalVisible] = useState(false);

  const incompleteTasksCount = useMemo(() => {
    return taskList?.filter((task: Task) => !task.isDone).length || 0;
  }, [taskList]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3787EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>TODO LIST</Text>
        <Text style={[styles.heading, { marginTop: 10 }]}>Incomplete tasks: {incompleteTasksCount}</Text>
      </View>

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../../assets/images/Empty-image-list.png')}
              style={{ width: '100%', height: 350 }}
            />
            <Text style={styles.emptyText}>Oops! You don't have any to do list today</Text>
          </View>
        )}
        renderItem={({ item, index }) => <TaskItem index={index + 1} item={item} />}
        contentContainerStyle={styles.taskList}
      />

      <TaskInputField />
      <ErrorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={error}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  heading: {
    color: '#000',
    fontSize: 24,
    fontWeight: '800',
  },
  taskList: {
    paddingBottom: 70,
    paddingHorizontal: 20,
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  emptyText: {
    fontSize: 20,
    width: '60%',
    textAlign: 'center',
    marginTop: 30
  }
});

export default HomeScreen;
