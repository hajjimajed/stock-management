import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth.context';

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

    const { isConnected, signout } = useContext(AuthContext);

    const handleSignout = () => {
        signout();
    };

    return (
        <View>
            {isConnected ? (
                <>
                    <Text>Hello</Text>
                    <SafeAreaView>
                        <TouchableOpacity onPress={navigateToProfile}>
                            <Text>Profile</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                    <SafeAreaView>
                        <TouchableOpacity onPress={handleSignout}>
                            <Text>Signout</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </>
            ) : (
                <>
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

                </>
            )}
        </View>
    );
}

export default Home;
