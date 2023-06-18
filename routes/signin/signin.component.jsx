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

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/auth.context';

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jwtToken, setJwtToken] = useState('');

    const { setUserData } = useContext(AuthContext);

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
                const { token, userId } = data;
                storeVar('token', token);
                setJwtToken(token);
                console.log('User logged successfully:', data);
                fetchUserData(userId, token);
            })
            .catch(error => {
                console.error('Error signin user:', error);
            });
    }

    const fetchUserData = async (userId, jwtToken) => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/users/user-data?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const result = await response.json();
            setUserData(result.user);
            console.log('res res res', result.user)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

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