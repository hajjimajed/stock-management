import React, { useState, useContext } from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { AuthContext } from '../../contexts/auth.context';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin = () => {

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
        <View>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button title="Signin" onPress={signinHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default Signin;