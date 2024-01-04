import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import database from '@react-native-firebase/database';
import styles from '../components/style';
import HeaderComponent from '../components/headerComponent';
import FooterComponent from '../components/footerComponent';

const CompletedScreen = ({ navigation }) => {

    const navigateToHomeScreen = () => {
        navigation.navigate('Home');
    };

    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        const tasksRef = database().ref('/tasks');
        tasksRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const fetchedTasks = data ? Object.keys(data).map(key => ({
                ...data[key],
                id: key
            })).filter(task => task.status === 'tamamlanmış') : []; // Sadece 'tamamlanmış' durumdaki görevleri filtrele
            setTasks(fetchedTasks);
        });
    };
    

    const deleteTask = (id) => {
        database().ref(`/tasks/${id}`).remove()
        .then(() => {
            console.log('Task deleted!');
            fetchTasks();
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
    };

    const renderTask = ({ item }) => (
        <View style={styles.containerTask}>
            <TouchableOpacity
                style={styles.recIconContainer}
                onPress={() => deleteTask(item.id)}
            >
                <Image source={require("../assets/images/trash-gray-icon.png")} style={styles.icons} />
            </TouchableOpacity>

            <View style={styles.taskCard}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDetails}>{item.description}</Text>
                <Text style={styles.taskDetails}>{formatDate(item.dueDate)}</Text>
            </View>
        </View>
    );

    useEffect(() => {
        fetchTasks();
        return () => database().ref('/tasks').off();
    }, []);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toDateString();
    };

    return (
        <View style={styles.homeScreen}>
            <HeaderComponent
                leftButtonPress={() => navigation.navigate('Home')}
                leftButtonText="Anımsatıcılar"
                leftButtonImage={require("../assets/images/back-icon.png")}
                showMenuIcon={true}
            />

            <View style={styles.body}>
                <View style={styles.bodyTitleContainer}>
                    <Text style={styles.bodyTitleText}>Tamamlananlar</Text>
                </View>
                <View style={styles.reminderListContainer}>
                    <FlatList
                        data={tasks}
                        renderItem={renderTask}
                        keyExtractor={item => item.id}
                        style={styles.reminderListContainer}
                    />
                </View>
            </View>

            <FooterComponent
                buttonText="Tamamlandı"
                iconName="tickIcon"
                onPress={navigateToHomeScreen}
            />
        </View>
    );
};

export default CompletedScreen;