import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    jwtToken: null,
    setJwtToken: () => null,
    userId: null,
    setUserId: () => null,
    userData: {},
    setUserData: () => { }
})

export const AuthProvider = ({ children }) => {

    const [jwtToken, setJwtToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const retrieveData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                setJwtToken(token);
                console.log('token', jwtToken)
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };

        retrieveData();
    }, []);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://10.0.2.2:3000/users/user-data', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const result = await response.json();
                setUserData(result.userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (jwtToken) {
            fetchUserData();
        }
    }, [jwtToken])


    const value = { jwtToken, userData, setUserData };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>

}