import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';

const Setting = () => {
    const { jwtToken, userData, userId } = useContext(AuthContext);
    const [data, setData] = useState({})

    useEffect(() => {
        setData(userData)
    }, [userData])


    return (
        <View>
            <Text>{data.name}</Text>
            <Text>{data.email}</Text>
        </View>
    );
}

export default Setting;
