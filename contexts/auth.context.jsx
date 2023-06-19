import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    jwtToken: null,
    setJwtToken: () => null,
    userId: null,
    setUserId: () => null,
    userData: {},
    setUserData: () => { },
    isConnected: false,
    setIsConnected: () => { },
    signout: () => { }
})

export const AuthProvider = ({ children }) => {

    const [jwtToken, setJwtToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({});
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const retrieveData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const id = await AsyncStorage.getItem('userId');
                const data = await AsyncStorage.getItem('userData');
                const dt = JSON.parse(data);
                setJwtToken(token);
                setUserId(parseInt(id));
                setUserData(dt);
                // console.log('token', jwtToken)
                // console.log('context user data', dt, typeof (dt))
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };

        retrieveData();
    }, [jwtToken]);

    useEffect(() => {
        if (jwtToken) {
            setIsConnected(true)
        }
        return
    }, [jwtToken])

    const signout = () => {
        setJwtToken(null);
        setUserId(null);
        setUserData(null);
        setIsConnected(false);
        removeItemFromStorage('token');
        removeItemFromStorage('userId');
        removeItemFromStorage('userData');
    }

    const removeItemFromStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log('Value deleted successfully.');
        } catch (error) {
            console.log('Error deleting value:', error);
        }
    };


    const value = { jwtToken, userData, setUserData, setJwtToken, isConnected, signout };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>

}