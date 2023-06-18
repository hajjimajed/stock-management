import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const navigateToSignup = () => {
        navigation.navigate('Signup');
    }
    const navigateToSignin = () => {
        navigation.navigate('Signin');
    }
    const navigateToProfile = () => {
        navigation.navigate('Profile');
    }

    return (
        <View>
            <SafeAreaView>
                <TouchableOpacity onPress={navigateToSignup}>
                    <Text>Signup</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView>
                <TouchableOpacity onPress={navigateToSignin}>
                    <Text>Signin</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView>
                <TouchableOpacity onPress={navigateToProfile}>
                    <Text>Profile</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

export default Home;
