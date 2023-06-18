import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';

const Profile = () => {

    const { jwtToken, userData } = useContext(AuthContext);
    console.log('user data :', userData)


    return (
        <View>
            <Text>{userData.name}</Text>
            <Text>{userData.email}</Text>
        </View>
    );
}

export default Profile;
