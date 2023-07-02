import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView, Text, TouchableOpacity, View, Image, TextInput, Button, ImageBackground, Dimensions, StyleSheet } from 'react-native';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';

const image = require('../../assets/images/bg.jpg');
const { width, height } = Dimensions.get('window');

const Setting = () => {
    const { jwtToken, userData, userId } = useContext(AuthContext);
    const [data, setData] = useState({})

    const [upEmail, setUpEmail] = useState(userData.email);
    const [upName, setUpName] = useState(userData.name);
    const [upAbout, setUpAbout] = useState(userData.about);
    const [upAddress, setUpAddress] = useState(userData.address);
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        setData(userData)
    }, [userData])

    const { name, email, about, profileImg } = data;
    const pImg = profileImg && profileImg.split("\\").pop();
    const editUserHandler = () => {

        const formData = new FormData();
        formData.append('email', upEmail);
        formData.append('name', upName);
        formData.append('about', upAbout);
        formData.append('address', upAddress);
        formData.append('image', {
            uri: selectedImage,
            type: 'image/jpeg', // Adjust the type accordingly if necessary
            name: 'profile.jpg', // You can change the name if desired
        });
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

    const openImageLibrary = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image selection');
            } else if (response.errorCode) {
                console.log('Image Selection Error: ', response.errorMessage);
            } else {
                // Handle the selected image or video here
                setSelectedImage(response.assets[0].uri);
            }
        });
    };



    return (
        <ImageBackground source={image} style={styles.container}>
            <Text>{name}</Text>
            <Text>{email}</Text>
            <Text>{about}</Text>
            <Image source={{ uri: `http://10.0.2.2:3000/images/${pImg}` }} style={{ width: 100, height: 100 }} />
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
                <TouchableOpacity onPress={openImageLibrary}>
                    <Text>Select Image</Text>
                </TouchableOpacity>
                <Button title="update" onPress={editUserHandler} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,

    },
    section: {
        width: width,
        alignItems: 'center',
    },
    image: {
        width: width - 100,
        height: 300,
        resizeMode: 'cover',
        borderRadius: 30
    },
    h1: {
        fontSize: 26,
        fontWeight: '500',
        textAlign: 'center',
        color: '#000000',
    },
    p: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
    },
    signInButton: {
        width: '50%',
        height: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        elevation: 5,
        ...Platform.select({
            android: {
                elevation: 0, // Remove box shadow on Android
            },
        }),
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',

    },
});

export default Setting;
