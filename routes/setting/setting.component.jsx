import React, { useEffect, useState, useContext } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView, Text, TouchableOpacity, View, Image, TextInput, Button, ImageBackground, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth.context';
import { TogglesContext } from '../../contexts/toggles.context';
import { camera, logout, edit } from '../../svg';
import UpdateUser from '../../components/update-user/update-user.component';

const neon = require('../../assets/images/neon.jpg');
const { width, height } = Dimensions.get('window');

const Setting = () => {
    const { jwtToken, userData, userId, signout } = useContext(AuthContext);
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


    const [coverImage, setCoverImage] = useState(null);
    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Image selection cancelled');
            } else if (response.error) {
                console.log('ImagePicker Error:', response.error);
            } else if (response.assets && response.assets.length > 0) {
                setCoverImage(response.assets[0].uri);
            }
        });
    };

    const handleSignout = () => {
        signout();
        navigation.navigate('Home');
    };

    const { updateUser, setUpdateUser } = useContext(TogglesContext);

    const updateToggle = () => {
        setUpdateUser(!updateUser);
    }


    return (
        // <ImageBackground source={image} style={styles.container}>
        //     <Text>{name}</Text>
        //     <Text>{email}</Text>
        //     <Text>{about}</Text>
        //     <Image source={{ uri: `http://10.0.2.2:3000/images/${pImg}` }} style={{ width: 100, height: 100 }} />
        //     <View>
        //         <TextInput
        //             placeholder="Email"
        //             value={upEmail}
        //             onChangeText={setUpEmail}
        //         />
        //         <TextInput
        //             placeholder="Name"
        //             value={upName}
        //             onChangeText={setUpName}
        //         />
        //         <TextInput
        //             placeholder="About"
        //             value={upAbout}
        //             onChangeText={setUpAbout}
        //         />
        //         <TextInput
        //             placeholder="Address"
        //             value={upAddress}
        //             onChangeText={setUpAddress}
        //         />
        //         <TouchableOpacity onPress={openImageLibrary}>
        //             <Text>Select Image</Text>
        //         </TouchableOpacity>
        //         <Button title="update" onPress={editUserHandler} />
        //     </View>
        // </ImageBackground>
        <>
            <SafeAreaView style={styles.settingContainer}>
                <SafeAreaView style={styles.topSection}>
                    <SafeAreaView style={styles.topSectionC}>
                        <TouchableOpacity onPress={updateToggle}>
                            <SvgXml xml={edit} width='25' height="25" />
                        </TouchableOpacity>
                    </SafeAreaView>
                </SafeAreaView>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.scroller}>
                        <View style={styles.title}>
                            <Text style={styles.h1}>Settings</Text>
                        </View>
                        <View style={styles.profileContainer}>
                            <ImageBackground style={styles.profileContainerImg} source={coverImage ? { uri: coverImage } : neon}>
                                <SafeAreaView style={styles.profileSec1}>
                                    <View style={styles.profileSec1div1}>
                                        <Text style={styles.h2}>{email}</Text>
                                    </View>
                                    <View style={styles.profileSec1div2}>
                                        <Image source={{ uri: `http://10.0.2.2:3000/images/${pImg}` }} style={styles.profileImg} />
                                    </View>
                                </SafeAreaView>
                                <SafeAreaView style={styles.profileSec2}>
                                    <View>
                                        <Text style={styles.h3}>{name}</Text>
                                        <Text style={styles.h2}>0 items</Text>
                                    </View>
                                    <TouchableOpacity style={styles.profileSec2div1} onPress={selectImage}>
                                        <SvgXml xml={camera} width='20' height="20" />
                                    </TouchableOpacity>
                                </SafeAreaView>
                            </ImageBackground>
                        </View>
                        <SafeAreaView style={styles.line}></SafeAreaView>
                        <View style={styles.account}>
                            <Text style={styles.h4}>Account</Text>
                            <SafeAreaView style={styles.accountSec}>
                                <Text style={styles.p1}>Name</Text>
                                <Text style={styles.p2}>{name}</Text>
                            </SafeAreaView>
                            <SafeAreaView style={styles.accountSec}>
                                <Text style={styles.p1}>Email</Text>
                                <Text style={styles.p2}>{email}</Text>
                            </SafeAreaView>
                            <SafeAreaView style={styles.accountSec}>
                                <Text style={styles.p1}>Joined</Text>
                                <Text style={styles.p2}>{createdAt}</Text>
                            </SafeAreaView>
                            <SafeAreaView style={styles.accountDiv}>
                                <Text style={styles.p1}>About</Text>
                                <Text style={styles.p2}>{about}</Text>
                            </SafeAreaView>
                            <SafeAreaView style={styles.accountDiv}>
                                <Text style={styles.p1}>Address</Text>
                                <Text style={styles.p2}>{address}</Text>
                            </SafeAreaView>
                        </View>
                        <SafeAreaView style={styles.line}></SafeAreaView>
                        <View style={styles.logout}>
                            <TouchableOpacity style={styles.logoutBtn} onPress={handleSignout}>
                                <Text style={styles.p3}>Sign Out</Text>
                                <SvgXml xml={logout} width='20' height="20" fill='red' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
            {
                updateUser ? (<UpdateUser />) : (<View />)
            }
        </>
    );
}

const styles = StyleSheet.create({
    topSection: {
        width: width,
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10,
        paddingLeft: 10,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    topSectionC: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    settingContainer: {
        width: width,
        height: height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 100,
        backgroundColor: '#fff'
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    scroller: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        width: width - 20
    },
    line: {
        width: width,
        height: 10,
        backgroundColor: '#dee2e6',
        marginTop: 20,
        marginBottom: 20
    },
    profileContainer: {
        width: width - 20,
        height: 200,
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 30
    },
    profileContainerImg: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileSec1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '85%',
        marginTop: 20
    },
    profileSec1div1: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    profileSec1div2: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    profileImg: {
        width: 37,
        height: 37,
        borderRadius: 18,
    },
    profileSec2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        marginBottom: 20
    },
    profileSec2div1: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    account: {
        width: width - 20,
    },
    accountSec: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: '#adb5bd',
        borderBottomWidth: 0.2
    },
    accountDiv: {
        width: '100%',
        display: 'flex',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: '#adb5bd',
        borderBottomWidth: 0.2
    },
    h1: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
    },
    h2: {
        fontSize: 13,
        fontWeight: '400',
        color: '#fff',
        textTransform: 'capitalize'
    },
    h3: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        textTransform: 'capitalize'
    },
    h4: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
        textTransform: 'capitalize'
    },
    p1: {
        fontSize: 16,
        fontWeight: '400',
        color: '#6c757d',
        textTransform: 'capitalize'
    },
    p2: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        textTransform: 'capitalize'
    },
    p3: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        color: '#ef233c',
        marginRight: 8
    },
    logout: {
        width: width - 20,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    logoutBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default Setting;
