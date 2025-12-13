import { Entypo } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Alert, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { customFonts } from "../../../utils/fonts";
import { useState } from "react";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function UserprofileImageSet() {
    const [fonts] = useFonts(customFonts);
    const [image, setimage] = useState("");

    const captureImage = async () => {
        const { status, canAskAgain } = await ImagePicker.getCameraPermissionsAsync();
        if (status === "denied" && !canAskAgain) {
            return Alert.alert(
                "Permission Required",
                "Camera access is blocked. Please enable it from settings.",
                [
                    { text: 'Cancel' },
                    { text: 'Open Settings', onPress: () => Linking.openSettings() }
                ]
            )
        }
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.granted === false) {
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1
        })
        console.log(result);
        if (!result.canceled) {
            setimage(result.assets[0].uri);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            setimage(result.assets[0].uri);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.imgcontainer}>
                {
                    image ? (<Image source={{ uri: image }} style={styles.img} />) : (<Entypo name="user" size={100} color="rgba(36, 36, 36, 0.13)" />)
                }
                <TouchableOpacity style={styles.icon}
                    onPress={() => captureImage()}
                >
                    <Entypo name="camera" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.setimage} activeOpacity={.6}
                onPress={() => pickImage()}
            >
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-Medium' }}>Set profile picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancel} activeOpacity={.6}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-Medium' }}>Not now</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15
    },
    imgcontainer: {
        height: 200,
        width: 200,
        display: 'flex',
        position: 'relative',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '50%',
        borderWidth: .4,
        borderColor: 'rgba(187, 186, 186, 0.88)',
        marginBottom: 50
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: '50%',
    },
    icon: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 20,
        right: 5,
        borderRadius: '50%'
    },
    cancel: {
        width: width / 1.2,
        padding: 10,
        alignItems: 'center',
        borderWidth: .4,
        borderColor: 'rgba(187, 186, 186, 0.88)',
        borderRadius: 20
    },
    setimage: {
        width: width / 1.2,
        padding: 10,
        alignItems: 'center',
        borderWidth: .4,
        borderColor: 'rgba(187, 186, 186, 0.88)',
        borderRadius: 20
    }
})