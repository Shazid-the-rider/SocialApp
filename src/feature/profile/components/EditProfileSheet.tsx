import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
type Props = { editProfileModal: boolean; EditProfileModalPopOut: () => void };
export const EditProfileSheet = React.memo(({ editProfileModal, EditProfileModalPopOut }: Props) => {

    return (
        <Modal
            visible={editProfileModal}
            animationType="slide"
            statusBarTranslucent
            onRequestClose={EditProfileModalPopOut}
            className="h-[100%] w-[100%] bg-black"
        >
            <View className=" absolute h-[100%] w-[100%] bg-white  z-40" >
                <TouchableOpacity className="flex-row items-center h-[70px] pl-[10px]" activeOpacity={0.6} onPress={() => EditProfileModalPopOut()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                    <Text className="text-[15px]" style={{ fontFamily: 'Poppins-SemiBold' }}>Back to home</Text>
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} className="px-[20px]">
                    <View className="items-center mb-[25px]">
                        <Text className="font-[Poppins-Semibold] text-[25px]">Edit</Text>
                        <Text className="text-[15px] text-[rgba(73,73,73,0.53)] font-[Poppins-SemiBold]">Edit your information</Text>
                    </View>
                    <View className="gap-[10px] mb-[40px]">
                        <Text className="text-[16px] font-[Poppins-SemiBold]" >Edit Bio</Text>
                        <TextInput placeholder="Write your bio" className="text-[16px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[5] rounded-xl" />
                        <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center' }]} activeOpacity={.6}>
                            <Text className="text-[16px] text-black font-[Poppins-SemiBold]">Edit Bio</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="gap-[10px] mb-[40px]">
                        <Text className="text-[16px] font-[Poppins-SemiBold]">Change Name</Text>
                        <TextInput placeholder="First Name" className=" text-[16px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[5] rounded-xl" />
                        <TextInput placeholder="Last Name" className="text-[16px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[5] rounded-xl" />
                        <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center' }]} activeOpacity={.6}>
                            <Text className="text-[16px] text-black font-[Poppins-SemiBold]">Change Name</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="gap-[10px] mb-[40px]">
                        <Text className="text-[16px] font-[Poppins-SemiBold] ">Change Password</Text>
                        <TextInput placeholder="Current password" className="text-[16px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[5] rounded-xl" />
                        <TextInput placeholder="Latest password" className="text-[16px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[5] rounded-xl" />
                        <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center' }]} activeOpacity={.6}>
                            <Text className="text-[16px] text-black font-[Poppins-SemiBold]">Change Password</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="gap-[10px] mb-[40px] pb-[40px]">
                        <Text className="text-[16px] font-[Poppins-SemiBold]">Change Email</Text>
                        <TextInput placeholder="Current Email" className="text-[16px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[5] rounded-xl" />
                        <TextInput placeholder="Latest Email" className="text-[16px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[5] rounded-xl" />
                        <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center' }]} activeOpacity={.6}>
                            <Text className="text-[16px] text-black font-[Poppins-SemiBold]">Change Email</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
})
const styles = StyleSheet.create({
    view: {
        gap: 1.3,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: 'rgba(225, 225, 225, 0.88)',
        backgroundColor: 'rgba(236, 235, 235, 0.29)'
    }
})