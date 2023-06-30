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
    const navigateToSetting = () => {
        navigation.navigate('Setting');
    }

    const navigateToInventory = () => {
        navigation.navigate('Inventory');
    }

    const navigateToScanner = () => {
        navigation.navigate('Scanner');
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
                        <TouchableOpacity onPress={navigateToSetting}>
                            <Text>Setting</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                    <SafeAreaView>
                        <TouchableOpacity onPress={navigateToInventory}>
                            <Text>My Inventory</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                    <SafeAreaView>
                        <TouchableOpacity onPress={navigateToScanner}>
                            <Text>Scanner</Text>
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
