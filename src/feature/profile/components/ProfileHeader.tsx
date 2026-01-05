import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

export const ProfileHeader = React.memo(({ currentUser, darkMode }: { currentUser: any, darkMode: boolean }) => {

    return (
        <View>
            <View className="flex-row justify-center ">
                <Image className="h-[150px] w-[150px] bg-black rounded-[100px]" source={{ uri: currentUser?.image && currentUser.image !== "" ? currentUser.image : undefined }}
                />
            </View>
            <View className="flex-row gap-[5px] items-center justify-center pt-[20px]">
                <View className="flex-row gap-[3]">
                    <Text className={darkMode ? "text-[19px] font-[Poppins-Medium] text-[white]" : "text-[19px] font-[Poppins-Medium]"}>{currentUser?.firstName} {currentUser?.lastName}</Text>
                </View>
                <MaterialIcons name="verified" size={18} color="blue" />
            </View>
            {
                currentUser.bio && (
                    <View className="flex-1 justify-center items-center mt-[10px]">
                        <Text className={darkMode ? "font-[Poppins-Medium] text-[15px] text-[white]" : "font-[Poppins-Medium] text-[15px]"}>{currentUser.bio}</Text>
                    </View>
                )
            }
            <View className="flex-row justify-between pt-[15px] mx-[40px]">
                <View className="items-center w-[100%/3]">
                    <Text className={darkMode ? "text-[30px] text-[white] font-[Poppins-SemiBold]" : "text-[30px] font-[Poppins-SemiBold]"}>{currentUser?.follower > 1000 ? `${(currentUser.follower / 1000).toFixed(1)} k` : currentUser.follower}</Text>
                    <Text className={darkMode ? "text-[16px] font-[Poppins-Medium] text-[white]" : "text-[16px] font-[Poppins-Medium]"}>Followers</Text>
                </View>
                <View className="items-center w-[100%/3]">
                    <Text className={darkMode ? "text-[30px] text-[white] font-[Poppins-SemiBold]" : "text-[30px] font-[Poppins-SemiBold]"}>{currentUser?.following}</Text>
                    <Text className={darkMode ? "text-[16px] font-[Poppins-Medium] text-[white]" : "text-[16px] font-[Poppins-Medium]"}>Following</Text>
                </View>
                <View className="items-center w-[100%/3]">
                    <Text className={darkMode ? "text-[30px] text-[white] font-[Poppins-SemiBold]" : "text-[30px] font-[Poppins-SemiBold]"}>{currentUser?.uploadpost}</Text>
                    <Text className={darkMode ? "text-[16px] font-[Poppins-Medium] text-[white]" : "text-[16px] font-[Poppins-Medium]"}>Posts</Text>
                </View>
            </View>

        </View>
    )
})