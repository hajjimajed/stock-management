import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import { AuthContext } from '../../contexts/auth.context';

const { width, height } = Dimensions.get('window');


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
                    <SafeAreaView style={styles.container}>
                        <TouchableOpacity onPress={navigateToSignup} style={styles.button}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToSignin} style={styles.button}>
                            <Text style={styles.buttonText}>Signin</Text>
                        </TouchableOpacity>
                    </SafeAreaView>

                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Home;
