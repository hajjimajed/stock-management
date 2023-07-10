import { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useScanBarcodes, BarcodeFormat } from "vision-camera-code-scanner";
import { SvgXml } from 'react-native-svg';

import { close } from "../../svg";

const { width, height } = Dimensions.get('window');


const BarcodeScanner = () => {


    const devices = useCameraDevices();
    const device = devices.back;
    const [hasPermission, setHasPermission] = useState(false);
    const [scannedValue, setScannedValue] = useState(null);

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.ALL_FORMATS], {
        checkInverted: true,
    });

    const handleSaveScannedValue = () => {
        if (barcodes.length > 0) {
            setScannedValue(barcodes[0].displayValue);
            console.log(scannedValue)
        }
    };


    if (device == null) {
        return <Text>Camera not available</Text>;
    }

    return (
        device != null &&
        hasPermission && (
            <>
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    frameProcessor={frameProcessor}
                    frameProcessorFps={5}
                />
                {barcodes.map((barcode, idx) => (
                    <Text key={idx} style={styles.barcodeTextURL}>
                        {barcode.displayValue}
                    </Text>
                ))}
                {(
                    // <TouchableOpacity onPress={handleSaveScannedValue} style={styles.button}>
                    //     <Text style={styles.buttonText}>Save Scanned Value</Text>
                    // </TouchableOpacity>
                    <SafeAreaView style={styles.btnSection}>
                        <Text style={styles.btnSectionH1}>Barcode Scan</Text>
                        <SafeAreaView style={styles.buttons}>
                            <TouchableOpacity>
                                <SvgXml xml={close} width='20' height="20" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSaveScannedValue} style={styles.shotBtn}>
                                <View style={styles.circle}>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>Manual Input</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </SafeAreaView>
                )}
            </>
        )
    )

}

const styles = StyleSheet.create({
    barcodeTextURL: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    btnSection: {
        width: width,
        height: 200,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        lef: 0,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    btnSectionH1: {
        fontSize: 22,
        fontWeight: 600,
        color: '#000000'
    },
    buttons: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
    shotBtn: {
        width: 60,
        height: 60,
        backgroundColor: '#adb5bd',
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: '50%'
    },
    circle: {
        width: 50,
        height: 50,
        backgroundColor: '#adb5bd',
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#fff'
    }
});

export default BarcodeScanner;