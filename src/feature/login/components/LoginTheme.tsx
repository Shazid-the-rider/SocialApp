import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { act, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { customFonts } from "../../../utils/fonts";
import { useNavigation } from "@react-navigation/native";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function LoginTheme() {
    const navigation = useNavigation();
    const [action, setAction] = useState('login');
    const [visible, setVisible] = useState(false);
    const [focusAction, setFocusAction] = useState("");
    const [loginOption, setLoginOption] = useState('email');
    const inputFocus = useRef(null);

    const setFocuseActionInput = (id: string) => {
        setFocusAction(id);
    }

    const bottomAnim = useRef(new Animated.Value(-height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(bottomAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start();
    }, [])
    const [fonts] = useFonts(customFonts);
    if (!fonts) return null;
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <LinearGradient
                    colors={['white', 'white']}
                    start={{ x: 0, y: .35 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.body}
                >
                    <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
                        <Text style={[styles.intro, { fontFamily: 'Poppins-Medium' }]}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮  𝓽𝓸</Text>
                        <Text style={[styles.appname, { fontFamily: 'Poppins-Medium' }]}><Text style={{ color: 'red' }}>𝓵 </Text><Text style={{ color: 'green' }}>o </Text><Text style={{ color: 'yellow' }}>o </Text>p i <Text style={{ color: 'blue' }}>n</Text></Text>
                    </Animated.View>
                    <Animated.View style={[styles.layer, { bottom: bottomAnim }]}>

                        {/*TOGGLE BUTTON*/}
                        <View style={styles.swipebutton}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: action === 'login' ? 'white' : '#eef0f2' }]} activeOpacity={.8}
                                onPress={() => { setAction('login'); Keyboard.dismiss() }}
                                disabled={action === 'login'}
                            >
                                <Text style={[styles.txt, { fontFamily: 'Poppins-Medium' }]}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: action === 'signup' ? 'white' : '#eef0f2' }]} activeOpacity={.8}
                                onPress={() => { setAction('signup'); Keyboard.dismiss() }}
                                disabled={action === 'signup'}
                            >
                                <Text style={[styles.txt, { fontFamily: 'Poppins-Medium' }]}>Register</Text>
                            </TouchableOpacity>
                        </View>



                        {/*FORM FOR SIGNUP & LOGIN */}

                        <View style={styles.form}>

                            <TouchableOpacity style={[styles.inputField, { justifyContent: focusAction === "Email" ? 'flex-start' : 'center', gap: focusAction === "Email" ? 0 : 0, paddingTop: focusAction === "Email" ? 5 : 0, borderWidth: focusAction === 'Email' ? 2 : .3 }]} onPress={() => setFocuseActionInput('Email')}  >
                                <Text style={[styles.title, { fontFamily: 'Poppins-Regular', fontSize: focusAction === "Email" ? 12 : 15, }]}>{loginOption === 'email' ? 'Email Address' : 'Phone Number'}</Text>
                                {
                                    focusAction === "Email" && (
                                        <TextInput style={styles.inputType} />
                                    )
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.inputField, { justifyContent: focusAction === "Password" ? 'flex-start' : 'center', gap: focusAction === "Password" ? 0 : 0, paddingTop: focusAction === "Password" ? 5 : 0, borderWidth: focusAction === 'Password' ? 2 : .3 }]} onPress={() => setFocuseActionInput('Password')}>
                                <Text style={[styles.title, { fontFamily: 'Poppins-Regular', fontSize: focusAction === "Password" ? 12 : 15 }]}>Password</Text>
                                {
                                    focusAction === "Password" && (
                                        <View style={{ width: '100%' }}>
                                            <TextInput style={[styles.inputType, { width: '85%' }]} secureTextEntry={visible} />
                                            <TouchableOpacity style={{ position: 'absolute', right: 10, zIndex: 100 }}
                                                onPress={() => setVisible((prev) => prev === false ? true : false)}
                                            >
                                                {visible ? <AntDesign name="eye-invisible" size={24} color="black" /> : <AntDesign name="eye" size={24} color="black" />}
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }

                            </TouchableOpacity>

                            {
                                action === 'signup' && (
                                    <TouchableOpacity style={[styles.inputField, { justifyContent: focusAction === "CPassword" ? 'flex-start' : 'center', gap: focusAction === "CPassword" ? 0 : 0, paddingTop: focusAction === "CPassword" ? 5 : 0, borderWidth: focusAction === 'CPassword' ? 2 : .3 }]} onPress={() => setFocuseActionInput('CPassword')}>
                                        <Text style={[styles.title, { fontFamily: 'Poppins-Regular', fontSize: focusAction === "CPassword" ? 12 : 15 }]}>Confirm Password</Text>
                                        {
                                            focusAction === "CPassword" && (
                                                <View style={{ width: '100%' }}>
                                                    <TextInput style={[styles.inputType, { width: '85%' }]} secureTextEntry={visible} />
                                                    <TouchableOpacity style={{ position: 'absolute', right: 10, zIndex: 100 }}
                                                        onPress={() => setVisible((prev) => prev === false ? true : false)}
                                                    >
                                                        {visible ? <AntDesign name="eye-invisible" size={24} color="black" /> : <AntDesign name="eye" size={24} color="black" />}
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }

                                    </TouchableOpacity>
                                )
                            }


                            {/*FORGOT PASSWORD*/}

                            {
                                action === 'login' && (
                                    <View style={styles.forgotpassword}>
                                        <Text style={[styles.forgotpasstext, { fontFamily: 'Poppins-Medium' }]}>Forgot password?</Text>
                                    </View>
                                )
                            }


                            {/*BUTTON LOGIN SIGNUP*/}
                            <TouchableOpacity style={[styles.loginButton, { backgroundColor: action === 'login' ? 'rgba(19, 1, 71, 1)' : 'rgba(19, 1, 71, 1)' }]} activeOpacity={.7} 
                            onPress={()=>{
                              if(action==='signup'){
                                 navigation.navigate('SetupUserinfo' as never);
                              }
                            }}>
                                <Text style={[styles.buttonFont, { fontFamily: 'Poppins-Medium' }]}>{action === 'login' ? 'Login' : 'Signup'}</Text>
                            </TouchableOpacity>


                            {/*OPTION*/}
                            <View style={styles.optionline}>
                                <View style={styles.line}></View>
                                <Text style={[styles.lineFont, { fontFamily: 'Poppins-Medium' }]}>{action === 'login' ? 'Or Login with' : 'Or Signup with'}</Text>
                                <View style={styles.line}></View>
                            </View>


                            {/*LOGIN SIGNUP METHOD BUTTON*/}
                            <View style={styles.loginoption}>

                                <TouchableOpacity style={[styles.loginoptionbutton, { backgroundColor: loginOption === 'email' ? '#eef0f2' : 'white' }]}
                                    onPress={() => setLoginOption('email')}
                                    disabled={loginOption === 'email'}>
                                    <MaterialCommunityIcons name="email" size={24} color="black" />
                                    <Text style={[styles.loginoptionbuttonTxt, { fontFamily: 'Poppins-Medium' }]}>Email</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.loginoptionbutton, { backgroundColor: loginOption === 'phone' ? '#eef0f2' : 'white' }]}
                                    onPress={() => setLoginOption('phone')}
                                    disabled={loginOption === 'phone'}
                                    activeOpacity={.7}
                                >
                                    <Ionicons name="call" size={24} color="black" />
                                    <Text style={[styles.loginoptionbuttonTxt, { fontFamily: 'Poppins-Medium' }]}>Phone</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Animated.View>

                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width
    },
    body: {
        flex: 1,
        width: '100%'
    },
    layer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        height: height / 1.35,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        width: width,
        backgroundColor: 'white',
        paddingTop: 20,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    swipebutton: {
        display: 'flex',
        width: width / 1.15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eef0f2',
        height: 50,
        justifyContent: 'space-between',
        borderRadius: 30,
        padding: 3
    },
    button: {
        backgroundColor: 'white',
        width: '48%',
        height: '100%',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: 16,
    },
    form: {
        paddingTop: 20,
        width: width / 1.15,
        gap: 10,
    },
    inputField: {
        width: '100%',
        borderWidth: .3,
        borderColor: 'rgba(187, 186, 186, 0.88)',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    title: {
        fontSize: 15,
    },
    inputType: {
        paddingTop: 5,
        fontSize: 18,
    },
    loginButton: {
        width: width / 1.15,
        height: 50,
        backgroundColor: 'rgba(19, 1, 71, 1)',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonFont: {
        fontSize: 16,
        color: 'white'
    },
    forgotpassword: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 5
    },
    forgotpasstext: {
        fontSize: 14,
    },
    loginoption: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    loginoptionbutton: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        width: '40%',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderWidth: .3,
        borderColor: 'rgba(187, 186, 186, 0.88)',
        borderRadius: 30
    },
    loginoptionbuttonTxt: {
        fontSize: 15,
    },
    optionline: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width / 1.15,
        alignItems: 'center',
        paddingBottom: 20,
    },
    line: {
        width: '30%',
        borderWidth: 1,
        borderColor: 'rgba(233, 231, 231, 0.88)',
        height: 0
    },
    lineFont: {
        fontSize: 15,
    },
    appname: {
        fontSize: 35,
        color: 'black'
    },
    intro: {
        fontSize: 40,
        color: 'black',
        padding: 0,
        margin: 0,
    },
    header: {
        paddingLeft: 15,
        paddingTop: 25
    }
})