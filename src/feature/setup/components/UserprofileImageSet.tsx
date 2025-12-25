import { Entypo, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Alert, Animated, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { customFonts } from "../../../utils/fonts";
import { useContext, useRef, useState } from "react";
import { uploadToCloudinary } from "../../../../shared/services/uploadToCloudinary";
import { GlobalContextApi } from "../../../../context/GlobalContext";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../shared/services/firebaseConfig";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function UserprofileImageSet() {
    const { user } = useContext(AuthContext);
    const [fonts] = useFonts(customFonts);
    const [image, setimage] = useState("");
    const [imagelink, setImageUrl] = useState("");
    const imageOption = useRef(new Animated.Value(-height)).current;
    const notify = useRef(new Animated.Value(-height)).current;
    const [message, setMessage] = useState<string>("");
    const navigation = useNavigation();
    const ImageOptionPopOut = () => {
        return Animated.timing(imageOption, {
            toValue: -height,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }
    const ImageOptionPopUp = () => {
        return Animated.timing(imageOption, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    const notifyPopOut = () => {
        return Animated.timing(notify, {
            toValue: -height,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }
    const notifyPopUp = () => {
        return Animated.timing(notify, {
            toValue: 20,
            duration: 1000,
            useNativeDriver: false
        }).start(() => {
            setTimeout(() => {
                notifyPopOut()
            }, 1000)
        })
    }
    const context = useContext(GlobalContextApi);
    if (!context) {
        return null;
    }
    const { newUser, setNewUser } = context;
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
    const UploadImage = async () => {
        if (!image) {
            setMessage("No photo available. please select");
            notifyPopUp();
            return;
        }
        if (!user) {
            return;
        }
        try {
            const imageUrl = await uploadToCloudinary(image);
            setImageUrl(imageUrl);
            setNewUser((prev) => {
                if (!prev) {
                    return undefined;
                }
                return {
                    ...prev,
                    image: imageUrl,
                }
            })
            const userId = user.uid;
            const userRef = doc(db, 'users', userId);
            const updatedUser = {
                ...newUser,
                image: imageUrl,
                uploadpost: 0,
            }
            await setDoc(userRef, updatedUser, { merge: true });
            console.log('Saved to firestore');

            navigation.navigate('Wait' as never);
        } catch (e: any) {
            setMessage(e.message);
            console.log(e.message);
            notifyPopUp();
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.imgcontainer}>
                {
                    image ? (<Image source={{ uri: image }} style={styles.img} />) : (<Entypo name="user" size={100} color="rgba(36, 36, 36, 0.13)" />)
                }
                <TouchableOpacity style={styles.icon}
                    onPress={() => ImageOptionPopUp()}
                >
                    <Entypo name="camera" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.setimage} activeOpacity={.6}
                onPress={() => UploadImage()}
            >
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-Medium' }}>Set profile picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancel} activeOpacity={.6}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-Medium' }}>Not now</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.popupOp, { bottom: imageOption }]}>
                <TouchableOpacity style={styles.linebox} onPress={() => ImageOptionPopOut()}>
                    <View style={styles.line}></View>
                </TouchableOpacity>
                <View style={styles.optionbox}>
                    <TouchableOpacity style={styles.design} onPress={() => { captureImage(); ImageOptionPopOut() }}>
                        <Entypo name="camera" size={35} color="black" />
                        <Text style={styles.font}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.design} onPress={() => { pickImage(); ImageOptionPopOut() }}>
                        <Entypo name="image-inverted" size={35} color="black" />
                        <Text style={styles.font}>Gallery</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
            <Animated.View style={[styles.notify, { bottom: notify }]}>
                <MaterialIcons name="error" size={24} color="red" />
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14 }}>{message}</Text>
            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        position: 'relative'
    },
    popupOp: {
        height: height / 4.5,
        width: width,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        alignItems: 'center'
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
    },

    line: {
        width: 50,
        height: 2,
        backgroundColor: 'black',
    },
    linebox: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    optionbox: {
        width: width / 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    design: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    font: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15
    },
    notify: {
        position: 'absolute',
        bottom: 20,
        width: width / 1.07,
        height: 60,
        backgroundColor: 'white',
        shadowColor: "#2c2b2bff",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10
    }
})