import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Animated, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { customFonts } from "../../../utils/fonts";
import Constants from "expo-constants";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GlobalContextApi } from "../../../../context/GlobalContext";

type Props = {
    HandleLogOut: () => Promise<void>
}
export default function SettingPageComponents({ HandleLogOut }: Props) {
    const [fonts] = useFonts(customFonts);
    const context = useContext(GlobalContextApi);
    const navigation = useNavigation();
    if (!context) {
        return null;
    }
    const { currentUser, darkMode, setDarkMode } = context;

    const Anim1 = useRef(new Animated.Value(0)).current;
    const Anim2 = useRef(new Animated.Value(0)).current;
    const Anim3 = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        useCallback(() => {
            Anim1.setValue(0);
            Anim2.setValue(0);
            Anim3.setValue(0);
            Animated.parallel([
                Animated.timing(Anim1, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(Anim2, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(Anim3, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }),
            ]).start();
        }, [])
    )
    if (!fonts) {
        return null;
    }
    return (
        <View>
            <TouchableOpacity className="flex-row items-center h-[70px] pl-[10px]" onPress={() => navigation.navigate('Home' as never)}>
                <Ionicons name="chevron-back" size={24} color={darkMode ? 'white' : "black"} />
                <Text className={darkMode ? "text-[15px] text-[white]" : "text-[15px] text-[black]"} style={{ fontFamily: 'Poppins-SemiBold' }}>Back to Home</Text>
            </TouchableOpacity>
            <ScrollView className="ml-[15px] mr-[15px]" showsVerticalScrollIndicator={false}>
                <View className="items-center mb-[25px]">
                    <Text className={darkMode ? "font-[Poppins-Semibold] text-[25px] text-[white]" : "font-[Poppins-Semibold] text-[25px] text-[black]"}>Settings</Text>
                    <Text className={darkMode ? "text-[15px] text-[rgba(186,186,186,0.53)] font-[Poppins-SemiBold]" : "text-[15px] text-[rgba(73,73,73,0.53)] font-[Poppins-SemiBold]"}>Manage your preferences</Text>
                </View>
                <Animated.View style={{ gap: 10, opacity: Anim1 }}>
                    <Text className={darkMode ? "text-[18px] text-white font-[Poppins-SemiBold]" : "text-[18px] text-black font-[Poppins-SemiBold]"}>Account</Text>
                    <View style={[styles.view, { backgroundColor: darkMode ? 'rgb(32,32,32,1)' : 'rgba(236, 235, 235, 0.29)', borderColor: darkMode ? 'black' : 'rgba(225, 225, 225, 0.88)' }]}>
                        <Text className={darkMode ? "text-[13px] text-[rgba(203,203,203,0.71)] font-[Poppins-SemiBold]" : "text-[13px] text-[rgba(73,73,73,0.53)] font-[Poppins-SemiBold]"}>Email</Text>
                        <Text className={darkMode ? "text-[13px] text-white font-[Poppins-SemiBold]" : "text-[13px] text-black font-[Poppins-SemiBold]"}>{currentUser?.email}</Text>
                    </View>
                    <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 30, alignItems: 'center', backgroundColor: darkMode ? 'rgb(32,32,32,1)' : 'black', borderColor: darkMode ? 'black' : 'rgba(225, 225, 225, 0.88)' }]} activeOpacity={.6}
                        onPress={() => navigation.navigate('Profile' as never)}
                    >
                        <Text className={darkMode ? "text-[15px] text-white font-[Poppins-SemiBold]" : "text-[15px] text-white font-[Poppins-SemiBold]"}>Edit profile</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={{ marginTop: 40, gap: 10, opacity: Anim2 }}>
                    <Text className={darkMode ? "text-[18px] text-white font-[Poppins-SemiBold]" : "text-[18px] text-black font-[Poppins-SemiBold]"}>Preferences</Text>
                    <View style={[styles.view, { paddingTop: 15, paddingBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: darkMode ? 'rgb(32,32,32,1)' : 'rgba(236, 235, 235, 0.29)', borderColor: darkMode ? 'black' : 'rgba(225, 225, 225, 0.88)' }]}>
                        <View>
                            <Text className={darkMode ? "text-[14px] text-[white] font-[Poppins-SemiBold]" : "text-[14px] text-[rgba(0,0,0,1)] font-[Poppins-SemiBold]"}>Push Notifications</Text>
                            <Text className={darkMode ? "text-[12px] text-[rgba(191,190,190,0.66)] font-[Poppins-Medium]" : "text-[12px] text-[rgba(99,98,98,0.53)] font-[Poppins-Medium]"}>Receive app notifications</Text>
                        </View>
                        <Switch />
                    </View>
                    <View style={[styles.view, { paddingTop: 15, paddingBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: darkMode ? 'rgb(32,32,32,1)' : 'rgba(236, 235, 235, 0.29)', borderColor: darkMode ? 'black' : 'rgba(225, 225, 225, 0.88)' }]}>
                        <View>
                            <Text className={darkMode ? "text-[14px] text-[white] font-[Poppins-SemiBold]" : "text-[14px] text-[rgba(0,0,0,1)] font-[Poppins-SemiBold]"}>Dark Mode</Text>
                            <Text className={darkMode ? "text-[12px] text-[rgba(191,190,190,0.66)] font-[Poppins-Medium]" : "text-[12px] text-[rgba(99,98,98,0.53)] font-[Poppins-Medium]"}>Enable dark theme</Text>
                        </View>
                        <Switch value={darkMode} onValueChange={setDarkMode} />
                    </View>
                    <View style={[styles.view, { paddingTop: 15, paddingBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: darkMode ? 'rgb(32,32,32,1)' : 'rgba(236, 235, 235, 0.29)', borderColor: darkMode ? 'black' : 'rgba(225, 225, 225, 0.88)' }]}>
                        <View>
                            <Text className={darkMode ? "text-[14px] text-[white] font-[Poppins-SemiBold]" : "text-[14px] text-[rgba(0,0,0,1)] font-[Poppins-SemiBold]"}>Email updates</Text>
                            <Text className={darkMode ? "text-[12px] text-[rgba(191,190,190,0.66)] font-[Poppins-Medium]" : "text-[12px] text-[rgba(99,98,98,0.53)] font-[Poppins-Medium]"}>Enable email notifications</Text>
                        </View>
                        <Switch />
                    </View>
                </Animated.View>
                <Animated.View style={{ marginTop: 40, gap: 8, paddingBottom: 200, opacity: Anim3 }}>
                    <Text className={darkMode ? "text-[18px] text-white font-[Poppins-SemiBold]" : "text-[18px] text-black font-[Poppins-SemiBold]"}>About</Text>
                    <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center', backgroundColor: darkMode ? 'rgb(32,32,32,1)' : 'rgba(236, 235, 235, 0.29)', borderColor: darkMode ? 'black' : 'rgba(225, 225, 225, 0.88)' }]} activeOpacity={.6}>
                        <Text className={darkMode ? "text-[14px] text-white font-[Poppins-SemiBold]" : "text-[14px] text-black font-[Poppins-SemiBold]"}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center', backgroundColor: darkMode ? 'rgb(32,32,32,1)' : 'rgba(236, 235, 235, 0.29)', borderColor: darkMode ? 'black' : 'rgba(225, 225, 225, 0.88)' }]} activeOpacity={.6}>
                        <Text className={darkMode ? "text-[14px] text-white font-[Poppins-SemiBold]" : "text-[14px] text-black font-[Poppins-SemiBold]"}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center', backgroundColor: darkMode ? 'rgb(32,32,32,1)' : 'rgba(236, 235, 235, 0.29)', borderColor: darkMode ? 'black' : 'rgba(225, 225, 225, 0.88)' }]} activeOpacity={.6}>
                        <Text className={darkMode ? "text-[14px] text-[rgba(168,168,168,0.72)] font-[Poppins-SemiBold]" : "text-[14px] text-[rgba(99,98,98,0.53)] font-[Poppins-SemiBold]"}>Version {Constants.expoConfig?.version}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.view, { marginTop: 12, padding: 12, borderRadius: 30, alignItems: 'center', backgroundColor: darkMode ? 'rgb(100,0,0)' : 'black', borderWidth: darkMode ? 0 : 1 }]} activeOpacity={.6} onPress={() => HandleLogOut()}>
                        <Text className="text-[15px] text-white font-[Poppins-SemiBold]">Log out</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({

    view: {
        gap: 1.3,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: 'rgba(225, 225, 225, 0.88)',
        backgroundColor: 'rgba(236, 235, 235, 0.29)'
    },

})