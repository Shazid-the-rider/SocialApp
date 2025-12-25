import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ProfileActions = React.memo(({ PostModalPopUp, EditProfileModalPopUp }: { PostModalPopUp: () => void, EditProfileModalPopUp: () => void }) => {

    return (
        <View>
            <View className="gap-[10] mt-[20px] mx-[15px]">
                <TouchableOpacity className=" justify-center border-2 border-gray-100 px-[10px] py-[8px] bg-gray-100 rounded-xl flex-row gap-[10] items-center" activeOpacity={.7} onPress={() => EditProfileModalPopUp()}>
                    <Entypo name="edit" size={24} color="black" />
                    <Text className="text-[15px] font-[Poppins-Medium]">Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className=" justify-center border-2 border-gray-100 px-[10px] py-[8px] bg-gray-100 rounded-xl flex-row gap-[10] items-center" onPress={() => PostModalPopUp()}>
                    <MaterialCommunityIcons name="post" size={24} color="black" />
                    <Text className="text-[15px] font-[Poppins-Medium]">Create your post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
})