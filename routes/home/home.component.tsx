import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const navigateToSignup = () => {
        navigation.navigate('Signup' as never);
    }

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={navigateToSignup}>
                <Text>Signup</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Home;
