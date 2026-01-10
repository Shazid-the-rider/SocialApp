import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { act, useCallback, useEffect, useRef, useState } from "react";
import { Alert, Animated, Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { customFonts } from "../../../utils/fonts";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../shared/services/firebaseConfig";
import useLoginHooks from "../hooks/useLoginHooks";
import Colors from "../../../utils/colors";



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function LoginTheme() {
    const context = useLoginHooks();
    if (!context) {
        return null;
    }
    const { email, getPasswordStrength, password, cpassword, isSignupDisabled, success, navigation, action, visible, loginOption, fonts, emailError, cpasswordError, passwordError, submitLogin,
        RequestSignUp, setEmail, setPassword, setcPassword, setAction, setVisible, setLoginOption, setemailError, setcpasswordError, setpasswordError,
        RequestLogin, passwordStrength } = context;

    const TextAnim1 = useRef(new Animated.Value(.4)).current;
    const ViewAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        ViewAnim.setValue(0);
        Animated.timing(ViewAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }, [action])
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(TextAnim1, { toValue: 1, duration: 3000, useNativeDriver: true }),
                Animated.delay(1000)
            ])
        ).start();
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1" style={{ width: width }}>
                <LinearGradient
                    colors={['white', 'white']}
                    start={{ x: 0, y: .35 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >

                    {/*FORM FOR SIGNUP & LOGIN */}
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, justifyContent: 'center' }} keyboardVerticalOffset={10}>
                        <View className="flex-1 gap-[10] justify-center relative" style={{ width: width / 1.15 }}>
                            <View className="w-[100%] flex-row items-center justify-center gap-[5] mb-[10px]">
                                <Animated.Text className="text-[40px] font-[Poppins-SemiBold] text-red-500" style={{ opacity: TextAnim1 }}>L</Animated.Text>
                                <Text className="text-[32px] font-[Poppins-SemiBold]" >o</Text>
                                <Text className="text-[32px] font-[Poppins-SemiBold]" >o</Text>
                                <Text className="text-[32px] font-[Poppins-SemiBold]" >p</Text>
                                <Text className="text-[32px] font-[Poppins-SemiBold]" >i</Text>
                                <Text className="text-[32px] font-[Poppins-SemiBold]" >n</Text>
                                <Text className="text-[32px] font-[Poppins-SemiBold]" >s</Text>
                            </View>
                            <Animated.View className="w-full relative border border-gray-200 h-[55px] rounded-[10px] flex flex-row items-center justify-start gap-[10] pl-[10]" style={{ opacity: ViewAnim }}>
                                <MaterialIcons name="email" size={24} color="black" />
                                <TextInput placeholder={emailError ? emailError : "Email Address"} className="text-[17px] w-[75%]" style={{ fontFamily: 'Poppins-Medium', width: '85%', fontSize: emailError ? 13 : 15 }}
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    spellCheck={false}
                                    textContentType="emailAddress"
                                    underlineColorAndroid="transparent"
                                />
                                {
                                    emailError && (
                                        <View className="absolute top-['50%'] right-2.5 translate-y-['-50%']">
                                            <MaterialIcons name="error" size={24} color={'red'} />
                                        </View>
                                    )
                                }
                            </Animated.View>
                            <Animated.View className="w-full relative border border-gray-200 h-[55px] rounded-[10px] flex flex-row items-center justify-start gap-[10] pl-[10]" style={{ opacity: ViewAnim }}>
                                <MaterialIcons name="password" size={24} color={'black'} />
                                <TextInput placeholder={passwordError ? passwordError : "Password"} className="text-[17px] w-[75%]" style={{ fontFamily: 'Poppins-Medium', fontSize: passwordError ? 13 : 15 }} secureTextEntry={!visible}
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                />
                                {
                                    (password !== "" && passwordError === "") && (
                                        <TouchableOpacity className="absolute top-['50%'] right-2.5 translate-y-['-50%']" onPress={() => setVisible((prev) => prev === true ? false : true)}>
                                            <Ionicons name={visible ? "eye-off" : "eye"} size={20} color={'black'} />
                                        </TouchableOpacity>
                                    )
                                }
                                {
                                    passwordError && (
                                        <View className="absolute top-['50%'] right-2.5 translate-y-['-50%']">
                                            <MaterialIcons name="error" size={24} color={'red'} />
                                        </View>
                                    )
                                }
                            </Animated.View>
                            {(passwordStrength && action === 'signup') && (
                                <Text
                                    style={{
                                        marginTop: 4,
                                        marginLeft: 5,
                                        fontFamily: 'Poppins-Medium',
                                        fontSize: 12,
                                        color: passwordStrength.color
                                    }}
                                >
                                    Password strength: {passwordStrength.label}
                                </Text>
                            )}

                            {
                                action === 'signup' && (
                                    <Animated.View className="w-full relative border border-gray-200 h-[55px] rounded-[10px] flex flex-row items-center justify-start gap-[10] pl-[10]" style={{ opacity: ViewAnim }}>
                                        <MaterialIcons name="password" size={24} color={'black'} />
                                        <TextInput placeholder={cpasswordError ? cpasswordError : 'Confirm Password'} className="text-[17px] w-[75%]" style={{ fontFamily: 'Poppins-Medium', fontSize: passwordError ? 13 : 15 }} secureTextEntry={!visible}
                                            onChangeText={(text) => setcPassword(text)}
                                            value={cpassword}
                                        />

                                        {
                                            (cpassword !== "" && cpasswordError === "") && (
                                                <TouchableOpacity className="absolute top-['50%'] right-2.5 translate-y-['-50%']" onPress={() => setVisible((prev) => prev === true ? false : true)}>
                                                    <Ionicons name={visible ? "eye-off" : "eye"} size={20} color={'black'} />
                                                </TouchableOpacity>
                                            )
                                        }
                                        {
                                            cpasswordError && (
                                                <View className="absolute top-['50%'] right-2.5 translate-y-['-50%']">
                                                    <MaterialIcons name="error" size={24} color={'red'} />
                                                </View>
                                            )
                                        }
                                    </Animated.View>

                                )
                            }

                            {/*FORGOT PASSWORD*/}
                            {
                                action === 'login' && (
                                    <View className="justify-end items-end mb-[5px]">
                                        <Animated.Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, opacity: ViewAnim }}>Forgot password?</Animated.Text>
                                    </View>
                                )
                            }

                            {/*BUTTON LOGIN SIGNUP*/}
                            <TouchableOpacity className="h-[50px] mt-[10px] bg-black rounded-[30px] flex justify-center items-center" style={{ width: width / 1.15, opacity: (action === 'signup' && isSignupDisabled) ? .5 : 1 }} activeOpacity={.7}
                                onPress={() => {
                                    if (action === 'signup') {
                                        Keyboard.dismiss()
                                        RequestSignUp();
                                    }
                                    if (action === 'login') {
                                        Keyboard.dismiss();
                                        RequestLogin();
                                    }
                                }}
                                disabled={isSignupDisabled}
                            >
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: 'white' }}>{action === 'login' ? 'Login' : 'Signup'}</Text>
                            </TouchableOpacity>
                            {
                                action === 'login' ? (
                                    <TouchableOpacity className="items-center" activeOpacity={.6} onPress={() => { Keyboard.dismiss(); setAction('signup'); setPassword(""); setcPassword("") }}>
                                        <Animated.Text className="text-[14px] font-[Poppins-Medium]">Don't have an account? <Text className="font-[Poppins-SemiBold]">Sign up</Text></Animated.Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity className="items-center" onPress={() => { Keyboard.dismiss(); setAction('login'); setPassword(""); setcPassword("") }}>
                                        <Animated.Text className="text-[14px] font-[Poppins-Medium]">Already have an account? <Text className="font-[Poppins-SemiBold]">Sign in</Text></Animated.Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </KeyboardAvoidingView>
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    )
}

