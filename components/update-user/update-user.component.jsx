import React, { useEffect, useState, useContext } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView, Text, TouchableOpacity, View, Image, TextInput, Button, Dimensions, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth.context';
import { TogglesContext } from '../../contexts/toggles.context';
import { leftArrow, cameraWhite } from '../../svg';

const { width, height } = Dimensions.get('window');

const UpdateUser = () => {

    const { updateUser, setUpdateUser } = useContext(TogglesContext);

    const updateToggle = () => {
        setUpdateUser(!updateUser);
    }


    const { jwtToken, userData, userId } = useContext(AuthContext);
    const [data, setData] = useState({})

    const navigation = useNavigation();

    const [upEmail, setUpEmail] = useState(userData?.email || '');
    const [upName, setUpName] = useState(userData?.name || '');
    const [upAbout, setUpAbout] = useState(userData?.about || '');
    const [upAddress, setUpAddress] = useState(userData?.address || '');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setData(userData)
    }, [userData])

    const { name, email, about, profileImg, address, createdAt } = data || {};
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
        <SafeAreaView style={styles.updateContainer}>
            <SafeAreaView style={styles.updateHeader}>
                <TouchableOpacity onPress={updateToggle}>
                    <SvgXml xml={leftArrow} width="22" height="22" />
                </TouchableOpacity>
                <Text style={styles.h1}>Update Infos</Text>
            </SafeAreaView>

            <SafeAreaView style={styles.updateContent}>
                <View style={styles.updateImg}>
                    <Image source={{ uri: `http://10.0.2.2:3000/images/${pImg}` }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                    <TouchableOpacity style={styles.updateImgBtn} onPress={openImageLibrary}>
                        <SvgXml xml={cameraWhite} width='16' height="16" />
                    </TouchableOpacity>
                </View>

                {/* <View>
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
                </View> */}
            </SafeAreaView>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    updateContainer: {
        width: width,
        height: height,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    updateHeader: {
        width: '100%',
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: '#adb5bd'
    },
    h1: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        marginLeft: 20
    },
    updateContent: {
        width: width - 20,
        paddingTop: 30,
        display: 'flex',
        alignItems: 'center'
    },
    updateImg: {
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    updateImgBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderColor: '#fff',
        borderWidth: 2.5,
        backgroundColor: '#8e9aaf',
        position: 'absolute',
        bottom: -5,
        right: -5,
        elevation: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default UpdateUser;