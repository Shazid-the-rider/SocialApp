import { FontAwesome6 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { customFonts } from "../../src/utils/fonts";
import { GlobalContextApi } from "../../context/GlobalContext";
import { useNavigation } from "@react-navigation/native";

export const ProfileTitle = React.memo(() => {
    const [fonts] = useFonts(customFonts)
    const context = useContext(GlobalContextApi);
    const navigation = useNavigation();
    if (!fonts) {
        return null;
    }
    if (!context) {
        return undefined
    }
    const { darkMode } = context;
    return (
        <View>
            <View className="w-[100%] flex-row justify-between h-[70px] items-center px-[10px]">
                <View className="flex-row gap-[0]">
                    <Text className="text-[30px] font-[Poppins-SemiBold] text-red-500">L</Text>
                    <Text className={darkMode ? "text-[30px] font-[Poppins-SemiBold] text-[white]" : "text-[30px] font-[Poppins-SemiBold]"}>o</Text>
                    <Text className={darkMode ? "text-[30px] font-[Poppins-SemiBold] text-[white]" : "text-[30px] font-[Poppins-SemiBold]"}>o</Text>
                    <Text className={darkMode ? "text-[30px] font-[Poppins-SemiBold] text-[white]" : "text-[30px] font-[Poppins-SemiBold]"}>p</Text>
                    <Text className={darkMode ? "text-[30px] font-[Poppins-SemiBold] text-[white]" : "text-[30px] font-[Poppins-SemiBold]"}>i</Text>
                    <Text className={darkMode ? "text-[30px] font-[Poppins-SemiBold] text-[white]" : "text-[30px] font-[Poppins-SemiBold]"}>n</Text>
                    <Text className={darkMode ? "text-[30px] font-[Poppins-SemiBold] text-[white]" : "text-[30px] font-[Poppins-SemiBold]"}>s</Text>
                </View>
                <TouchableOpacity className="mx-[10px]" onPress={() => { navigation.navigate('ChatList' as never) }}>
                    <FontAwesome6 name="facebook-messenger" size={24} color="blue" />
                </TouchableOpacity>
            </View>
        </View>
    )
}) 