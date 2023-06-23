import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Image, TextInput, Button } from 'react-native';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';

const Setting = () => {
    const { jwtToken, userData, userId } = useContext(AuthContext);
    const [data, setData] = useState({})

    const [upEmail, setUpEmail] = useState(userData.email);
    const [upName, setUpName] = useState(userData.name);
    const [upAbout, setUpAbout] = useState(userData.about);
    const [upAddress, setUpAddress] = useState(userData.address);


    useEffect(() => {
        setData(userData)
    }, [userData])

    const editUserHandler = () => {

        const formData = new FormData();
        formData.append('email', upEmail);
        formData.append('name', upName);
        formData.append('about', upAbout);
        formData.append('address', upAddress);
        console.log('some infos', JSON.stringify(formData))

        fetch('http://10.0.2.2:3000/users/edit', {
            method: 'PUT',
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': `Bearer ${jwtToken}`,
                'X-User-Id': userId
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error updating user data');
                }
                return response.json();
            })
            .then(data => {
                console.log('updated user data : ', data);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }





    return (
        <View>
            <Text>{data.name}</Text>
            <Text>{data.email}</Text>
            <Image source={{ uri: `http://10.0.2.2:3000${data.profileImg}` }} style={{ width: 100, height: 100 }} />
            <View>
                <TextInput
                    placeholder="Email"
                    value={upEmail}
                    onChangeText={setUpEmail}
                />
                <TextInput
                    placeholder="Name"
                    value={upName}
                    onChangeText={setUpName}
                />
                <TextInput
                    placeholder="About"
                    value={upAbout}
                    onChangeText={setUpAbout}
                />
                <TextInput
                    placeholder="Address"
                    value={upAddress}
                    onChangeText={setUpAddress}
                />
                <Button title="update" onPress={editUserHandler} />
            </View>
        </View>
    );
}

export default Setting;
