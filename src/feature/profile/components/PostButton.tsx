import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const PostButton = React.memo(({ postType, setPostType, darkMode }: { postType: string, setPostType: (type: string) => void, darkMode: boolean }) => {

    return (
        <View className="w-[100%] flex-row justify-start mt-[20px] px-[10px] gap-[20]">
            <TouchableOpacity className={darkMode ? postType === 'photos' ? " w-[35%] bg-[#2525255c] flex-row justify-center items-center gap-[10]  px-[10px]  py-[7px] rounded-3xl" : "w-[35%] flex-row  justify-center items-center gap-[6]  px-[10px]  py-[7px] rounded-3xl" : postType === 'photos' ? " w-[35%] flex-row justify-center items-center gap-[10] bg-gray-100  border-gray-100 px-[10px]  py-[7px] rounded-3xl" : "w-[35%] flex-row  justify-center items-center gap-[6] border-2 border-gray-100 px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => setPostType('photos')}>
                <Ionicons name="images-sharp" size={17} color={darkMode ? 'white' : "black"} />
                <Text className={darkMode ? "text-[15px] font-[Poppins-Medium] text-[white]" : "text-[15px] font-[Poppins-Medium]"}>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity className={darkMode ? postType === 'status' ? " w-[35%] bg-[#2525255c] flex-row justify-center items-center gap-[10] px-[10px]  py-[7px] rounded-3xl" : "w-[35%] flex-row  justify-center items-center gap-[6]  px-[10px]  py-[7px] rounded-3xl" : postType === 'status' ? " w-[35%] flex-row justify-center items-center gap-[10] bg-gray-100  border-gray-100 px-[10px]  py-[7px] rounded-3xl" : "w-[35%] flex-row  justify-center items-center gap-[6] border-2 border-gray-100 px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => setPostType('status')}>
                <MaterialCommunityIcons name="post" size={17} color={darkMode ? 'white' : "black"} />
                <Text className={darkMode ? "text-[15px] font-[Poppins-Medium] text-[white]" : "text-[15px] font-[Poppins-Medium]"}>Status</Text>
            </TouchableOpacity>
        </View>
    )
})