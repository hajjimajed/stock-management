import { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';


const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello</Text>
        </SafeAreaView>
    )

}

export default Splash;