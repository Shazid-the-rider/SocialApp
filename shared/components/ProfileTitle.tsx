import { FontAwesome6 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React from "react";
import { Text, View } from "react-native";
import { customFonts } from "../../src/utils/fonts";

export const ProfileTitle = React.memo(() => {
    const [fonts] = useFonts(customFonts)
    if(!fonts){
        return null;
    }
    return (
        <View className="w-[100%] flex-row justify-between h-[70px] items-center px-[10px]">
            <View className="flex-row gap-[0]">
                <Text className="text-[30px] font-[Poppins-SemiBold] text-red-500">L</Text>
                <Text className="text-[30px] font-[Poppins-SemiBold]" >o</Text>
                <Text className="text-[30px] font-[Poppins-SemiBold]" >o</Text>
                <Text className="text-[30px] font-[Poppins-SemiBold]" >p</Text>
                <Text className="text-[30px] font-[Poppins-SemiBold]" >i</Text>
                <Text className="text-[30px] font-[Poppins-SemiBold]" >n</Text>
                <Text className="text-[30px] font-[Poppins-SemiBold]" >s</Text>
            </View>
            <View className="mx-[10px]">
                <FontAwesome6 name="facebook-messenger" size={24} color="blue" />
            </View>
        </View>
    )
})