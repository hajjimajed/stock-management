import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { AuthContext } from '../../contexts/auth.context';
import { home, setting, apps, upAndDown } from '../../svg';
const { width, height } = Dimensions.get('window');



const BottomBar = () => {

    const { isConnected } = useContext(AuthContext);

    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
    }

    const navigateToSetting = () => {
        navigation.navigate('Setting');
    }

    const navigateToInventory = () => {
        navigation.navigate('Inventory');
    }

    const navigateToScanner = () => {
        navigation.navigate('Scanner');
    }

    return (
        <>
            {
                isConnected ? (
                    <SafeAreaView style={styles.bottomBar}>
                        <TouchableOpacity onPress={navigateToHome}>
                            <SvgXml xml={home} width="100%" height="100%" />
                            <Text>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToInventory}>
                            <SvgXml xml={apps} width="100%" height="100%" />
                            <Text>Items</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToScanner}>
                            <SvgXml xml={upAndDown} width="100%" height="100%" />
                            <Text>In/Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToSetting}>
                            <SvgXml xml={setting} width="90%" height="90%" />
                            <Text>Setting</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                ) : (
                    <SafeAreaView ></SafeAreaView>
                )
            }
        </>
    )

}

const styles = StyleSheet.create({
    bottomBar: {
        width: width,
        height: 60,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        right: 0,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 15,
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10
    },
    bottomBarBtn: {

    },
});

export default BottomBar;