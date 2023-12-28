import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'; // FlatList'i burada içe aktarıyoruz

// Haftanın günleri
const daysOfWeek = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

// Ayın günleri için bir dizi oluşturuyoruz, örneğin 1'den 30'a kadar
const daysOfMonth = Array.from({ length: 30 }, (_, index) => index + 1);

const Calendar = () => {
    const [selectedDay, setSelectedDay] = useState(null);

    // Tarihi render etmek için kullanılan fonksiyon
    const renderDay = ({ item }) => (
        <TouchableOpacity
            style={[styles.dayItem, item === selectedDay && styles.selectedDayItem]}
            onPress={() => setSelectedDay(item)}
        >
            <Text style={[styles.dayText, item === selectedDay && styles.selectedDayText]}>
                {item}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.daysOfWeekContainer}>
                {daysOfWeek.map(day => (
                    <Text key={day} style={styles.dayOfWeekText}>{day}</Text>
                ))}
            </View>
            <FlatList
                data={daysOfMonth}
                renderItem={renderDay}
                keyExtractor={item => item.toString()}
                numColumns={7}
                contentContainerStyle={{ alignItems: 'center' }} // Bu şekilde düzenleyin
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    daysOfWeekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    dayOfWeekText: {
        color: 'white',
        fontWeight: 'bold',
    },
    daysOfMonthContainer: {
        alignItems: 'center',
    },
    dayItem: {
        width: '14%', // 100% / 7 gün
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    dayText: {
        color: 'blue',
    },
    selectedDayItem: {
        backgroundColor: 'navy',
    },
    selectedDayText: {
        color: 'white',
    },
});

export default Calendar;
