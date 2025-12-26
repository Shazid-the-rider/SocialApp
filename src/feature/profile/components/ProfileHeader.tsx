import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

export const ProfileHeader = React.memo(({ currentUser,darkMode }: { currentUser: any, darkMode:boolean }) => {

    return (
        <View>
            <View className="flex-row justify-center ">
                <Image className="h-[180px] w-[180px] bg-black rounded-[100px]" source={{ uri: currentUser?.image && currentUser.image !== "" ? currentUser.image : undefined }}
                />
            </View>
            <View className="flex-row gap-[5px] items-center justify-center pt-[20px]">
                <View className="flex-row gap-[3]">
                    <Text className={darkMode?"text-[19px] font-[Poppins-Medium] text-[white]":"text-[19px] font-[Poppins-Medium]"}>{currentUser?.firstName} {currentUser?.lastName}</Text>
                </View>
                <MaterialIcons name="verified" size={24} color="blue" />
            </View>
            <View className="flex-row justify-between pt-[15px] mx-[40px]">
                <View className="items-center w-[100%/3]">
                    <Text className={darkMode?"text-[30px] text-[white] font-[Poppins-SemiBold]":"text-[30px] font-[Poppins-SemiBold]"}>{currentUser?.follower}</Text>
                    <Text className={darkMode?"text-[16px] font-[Poppins-Medium] text-[white]":"text-[16px] font-[Poppins-Medium]"}>Followers</Text>
                </View>
                <View className="items-center w-[100%/3]">
                    <Text className={darkMode?"text-[30px] text-[white] font-[Poppins-SemiBold]":"text-[30px] font-[Poppins-SemiBold]"}>{currentUser?.follower}</Text>
                    <Text className={darkMode?"text-[16px] font-[Poppins-Medium] text-[white]":"text-[16px] font-[Poppins-Medium]"}>Following</Text>
                </View>
                <View className="items-center w-[100%/3]">
                    <Text className={darkMode?"text-[30px] text-[white] font-[Poppins-SemiBold]":"text-[30px] font-[Poppins-SemiBold]"}>{currentUser?.uploadpost}</Text>
                    <Text className={darkMode?"text-[16px] font-[Poppins-Medium] text-[white]":"text-[16px] font-[Poppins-Medium]"}>Posts</Text>
                </View>
            </View>

        </View>
    )
})