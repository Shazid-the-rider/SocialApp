import { useFonts } from "expo-font";
import { ActivityIndicator, Animated, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { customFonts } from "../../../utils/fonts";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function UserinfoSet() {
    const navigation = useNavigation();
    const [fonts] = useFonts(customFonts);
    if (!fonts) {
        return null;
    }
    const headerAnim = useRef(new Animated.Value(0)).current;
    const info1 = useRef(new Animated.Value(0)).current;
    const info2 = useRef(new Animated.Value(0)).current;
    const info3 = useRef(new Animated.Value(0)).current;
    const info4 = useRef(new Animated.Value(0)).current;
    const button = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }),
            Animated.timing(info1, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }),
            Animated.timing(info2, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }),
            Animated.timing(info3, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }),
            Animated.timing(button, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }),
        ]).start()

    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>

                {/*HEADER*/}

                <Animated.View style={[styles.headerContainer, { opacity: headerAnim }]}>
                    <Text style={[styles.headerFont, { fontFamily: 'Poppins-Bold' }]}>Let's setup</Text>
                    <Text style={[styles.headerFont, { fontFamily: 'Poppins-Bold' }]}>some information</Text>
                </Animated.View>

                {/*FORM FIELD*/}

                <View style={styles.row}>
                    <Animated.View style={[styles.input, { opacity: info1 }]}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15 }}>First name</Text>
                        <TextInput placeholder="First Name" style={[styles.inputField, { fontFamily: 'Poppins-Regular' }]} />
                    </Animated.View>
                    <Animated.View style={[styles.input, { opacity: info1 }]}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15 }}>Last name</Text>
                        <TextInput placeholder="Last Name" style={[styles.inputField, { fontFamily: 'Poppins-Regular' }]} />
                    </Animated.View>
                </View>
                <View style={styles.row}>
                    <Animated.View style={[styles.input, { opacity: info1 }]}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15 }}>Date of Birth</Text>
                        <TextInput placeholder="Date of Birth" style={[styles.inputField, { fontFamily: 'Poppins-Regular' }]} />
                    </Animated.View>
                    <Animated.View style={[styles.input, { opacity: info1 }]}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15 }}>Gender</Text>
                        <TextInput placeholder="Gender" style={[styles.inputField, { fontFamily: 'Poppins-Regular' }]} />
                    </Animated.View>
                </View>
            </View>

            {/*<View style={styles.alertbox}>
                <ActivityIndicator size={"large"} color={'rgba(0, 0, 0, 1)'} />
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 19, color: 'rgba(53, 53, 53, 0.8)' }} >Setting up</Text>
            </View>*/}


            {/*NEXT BUTTON*/}

            <AnimatedTouchable style={[styles.nextbutton, { opacity: button }]} activeOpacity={0.7}
            onPress={()=>navigation.navigate('SetupImage'as never)}
            >
                <Text style={{ fontFamily: 'Poppins-Medium', color: 'white', fontSize: 17 }}>Next</Text>
            </AnimatedTouchable>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: 'white',
        gap: 30,
        alignItems: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        width: '47%',
        gap: 7
    },
    inputField: {
        width: '100%',
        borderWidth: .3,
        borderColor: 'rgba(187, 186, 186, 0.88)',
        borderRadius: 5,
        padding: 10,
        fontSize: 16
    },
    headerContainer: {
        paddingTop: 50,
        paddingBottom: 10
    },
    headerFont: {
        fontSize: 32
    },
    alertbox: {
        position: 'absolute',
        width: width / 1.2,
        top: '50%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    infoContainer: {
        gap: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    nextbutton: {
        marginTop: 20,
        width: width / 1.1,
        padding: 14,
        backgroundColor: 'rgba(19, 1, 71, 1)',
        borderRadius: 30,
        alignItems: 'center'
    }
})