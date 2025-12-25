import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const PostButton = React.memo(({ postType, setPostType }: { postType: string, setPostType: (type: string) => void }) => {
    
    return (
        <View className="w-[100%] flex-row justify-around mt-[20px] px-[10px]">
            <TouchableOpacity className={postType === 'photos' ? " w-[30%] flex-row justify-center items-center gap-[6] bg-gray-200  border-gray-100 px-[10px]  py-[7px] rounded-3xl" : "w-[30%] flex-row  justify-center items-center gap-[6] border-2 border-gray-100 px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => setPostType('photos')}>
                <Ionicons name="images-sharp" size={24} color="black" />
                <Text className="text-[15px] font-[Poppins-Medium]">Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity className={postType === 'reel' ? "w-[30%] flex-row justify-center  items-center gap-[6] bg-gray-200  border-gray-100 px-[10px]  py-[7px] rounded-3xl" : "w-[30%] flex-row  justify-center items-center gap-[6] border-2 border-gray-100 px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => setPostType('reel')}>
                <FontAwesome name="video-camera" size={24} color="black" />
                <Text className="text-[15px] font-[Poppins-Medium]">Reel</Text>
            </TouchableOpacity>
            <TouchableOpacity className={postType === 'status' ? "w-[30%] flex-row justify-center  items-center gap-[6] bg-gray-200  border-gray-100 px-[10px]  py-[7px] rounded-3xl" : "w-[30%] flex-row justify-center  items-center gap-[6] border-2 border-gray-100 px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => setPostType('status')}>
                <MaterialCommunityIcons name="post" size={24} color="black" />
                <Text className="text-[15px] font-[Poppins-Medium]">Status</Text>
            </TouchableOpacity>
        </View>
    )
})