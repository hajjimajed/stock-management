import React, { useState } from 'react';
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

const image = require('../../assets/images/bg.jpg');
const { width, height } = Dimensions.get('window');

const Signup = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const registerHandler = () => {
        const userData = {
            email: email,
            name: name,
            password: password
        };

        fetch('http://10.0.2.2:3000/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('User created:', data);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };

    return (
        <ImageBackground source={image} style={styles.container}>
            <SafeAreaView style={styles.section}>
                <Text style={styles.h1}>
                    Hello There!
                </Text>
                <Text style={styles.p}>
                    Join us now & manage your inventory!
                </Text>
            </SafeAreaView>
            <SafeAreaView style={styles.section}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={registerHandler} style={styles.signUpButton}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.finalSection}>
                <Text style={styles.h3}>Allready a member? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}><Text style={styles.h4}>Sign in Now</Text></TouchableOpacity>
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
    signUpButton: {
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
        marginTop: 30
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',

    },
});

export default Signup;