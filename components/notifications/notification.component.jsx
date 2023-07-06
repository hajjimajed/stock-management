import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { leftArrow } from '../../svg';
import { TogglesContext } from '../../contexts/toggles.context';

const { width, height } = Dimensions.get('window');


const Notification = () => {

    const { notif, setNotif } = useContext(TogglesContext);

    const notifToggle = () => {
        setNotif(!notif);
    }

    return (
        <SafeAreaView style={styles.NotifcationContainer}>
            <SafeAreaView style={styles.NotifcationHeader}>
                <TouchableOpacity onPress={notifToggle}>
                    <SvgXml xml={leftArrow} width="22" height="22" />
                </TouchableOpacity>
                <Text style={styles.h1}>Notification</Text>
            </SafeAreaView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    NotifcationContainer: {
        width: width,
        height: height,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    NotifcationHeader: {
        width: '100%',
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: '#adb5bd'
    },
    h1: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        marginLeft: 20
    }
});

export default Notification;