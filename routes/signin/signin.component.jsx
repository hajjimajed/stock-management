import React, { useState, useContext } from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ImageBackground,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth.context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../../assets/images/bg.jpg');
const { width, height } = Dimensions.get('window');

const Signin = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setJwtToken } = useContext(AuthContext)

    const signinHandler = () => {
        const userData = { email: email, password: password }

        fetch('http://10.0.2.2:3000/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                const { token, user } = data;
                storeVar('token', token);
                setJwtToken(token);
                storeVar('userData', JSON.stringify(user));
                navigation.navigate('Home');
                console.log('User logged successfully:', data);
            })
            .catch(error => {
                console.error('Error signin user:', error);
            });

    }

    // const getCategories = (token, userId) => {
    //     fetch('http://10.0.0.2:3000/inventory/get-categories', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //             'X-User-Id': userId
    //         }
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('failed to fetch categories')
    //             }
    //             return response.json();
    //         })
    //         .then(categories => {
    //             if (Array.isArray(categories)) {
    //                 setCategories(categories);
    //                 console.log(categories);
    //             } else {
    //                 throw new Error('Invalid response format');
    //             }
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }




    const storeVar = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <ImageBackground source={image} style={styles.container}>
            <SafeAreaView style={styles.section}>
                <Text style={styles.h1}>
                    Hello Again!
                </Text>
                <Text style={styles.p}>
                    Welcome back you've
                </Text>
                <Text style={styles.p}>
                    been missed!
                </Text>
            </SafeAreaView>
            <SafeAreaView style={styles.section}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor="#999"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <SafeAreaView style={styles.subSection}>
                    <Text style={styles.h2}>Forgot Password?</Text>
                </SafeAreaView>
                <TouchableOpacity onPress={signinHandler} style={styles.signInButton}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.finalSection}>
                <Text style={styles.h3}>Not a memeber? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={styles.h4}>Register Now</Text></TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 30,

    },
    section: {
        width: '100%',
        alignItems: 'center',
    },
    finalSection: {
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center'
    },
    subSection: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: 20
    },
    input: {
        height: 60,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 0,
        paddingLeft: 25,
        fontSize: 16,
        fontWeight: '500',
    },
    h1: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
        color: '#000000',
        marginBottom: 14
    },
    h2: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
    },
    h3: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#000000',
    },
    h4: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#0077b6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    p: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
    },
    signInButton: {
        width: '100%',
        height: 60,
        backgroundColor: '#FC6B68',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        elevation: 10,
        shadowColor: '#FC6B68',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',

    },
});

export default Signin;