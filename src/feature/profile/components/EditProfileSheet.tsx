import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
type Props = { editProfileModal: boolean; EditProfileModalPopOut: () => void, darkMode: boolean, userBio: (val: string) => void };
export const EditProfileSheet = React.memo(({ userBio, darkMode, editProfileModal, EditProfileModalPopOut }: Props) => {

    const [text, setText] = useState("");
    //rgba(236, 235, 235, 0.29)
    return (
        <Modal
            visible={editProfileModal}
            animationType="slide"
            statusBarTranslucent
            onRequestClose={EditProfileModalPopOut}
        >
            <View className={darkMode ? " absolute h-[100%] w-[100%] bg-[rgb(18,18,18)] pt-[20px] z-40" : " absolute h-[100%] w-[100%] bg-white pt-[20px] z-40"} >
                <TouchableOpacity className="flex-row items-center h-[70px] pl-[10px]" activeOpacity={0.6} onPress={() => EditProfileModalPopOut()}>
                    <Ionicons name="chevron-back" size={24} color={darkMode ? 'white' : "black"} />
                    <Text className={darkMode ? "text-[15px] text-[white]" : "text-[15px]"} style={{ fontFamily: 'Poppins-Medium' }}>Back to home</Text>
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} className="px-[20px]">
                    <View className="items-center mb-[25px]">
                        <Text className={darkMode ? "font-[Poppins-Semibold] text-[white] text-[25px]" : "font-[Poppins-Semibold] text-[25px]"}>Edit</Text>
                        <Text className={darkMode ? "text-[15px] text-[rgba(186,186,186,0.53)] font-[Poppins-Medium]" : "text-[15px] text-[rgba(73,73,73,0.53)] font-[Poppins-Medium]"}>Edit your information</Text>
                    </View>
                    <View className="gap-[10px] mb-[40px]">
                        <Text className={darkMode ? "text-[16px] text-[white] font-[Poppins-SemiBold]" : "text-[16px] font-[Poppins-SemiBold]"} >Edit Bio</Text>
                        <TextInput placeholder="Write your bio" placeholderTextColor={'rgb(190,190,190)'} className={darkMode ? "text-[14px] text-[white] font-[Poppins-Medium] py-[15px] bg-[rgba(42,41,41,0.53)]  px-[10px]" : "text-[14px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[10px] rounded-xl"} style={{ borderRadius: 5 }}
                            value={text} onChangeText={(q) => setText(q)}
                        />
                        <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center', borderColor: darkMode ? 'rgba(100, 100, 100, 0.88)' : 'rgba(225, 225, 225, 0.88)', borderWidth: darkMode ? 0 : 1, backgroundColor: darkMode ? 'black' : 'black' }]} activeOpacity={.6}
                            disabled={text.trim().length === 0 || text.trim().length >= 50} onPress={() => { userBio(text); setText(""); EditProfileModalPopOut() }}
                        >
                            <Text className={darkMode ? "text-[14px] text-white font-[Poppins-Medium]" : "text-[14px] text-white font-[Poppins-Medium]"}>Edit Bio</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="gap-[10px] mb-[40px]">
                        <Text className={darkMode ? "text-[16px] text-[white] font-[Poppins-SemiBold]" : "text-[16px] font-[Poppins-SemiBold]"}>Change Name</Text>
                        <TextInput placeholder="First Name" placeholderTextColor={'rgb(190,190,190)'} className={darkMode ? "text-[14px] text-[white] font-[Poppins-Medium] py-[15px] bg-[rgba(42,41,41,0.53)]  px-[10px] rounded-xl" : "text-[14px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[10px] rounded-xl"} style={{ borderRadius: 5 }} />
                        <TextInput placeholder="Last Name" placeholderTextColor={'rgb(190,190,190)'} className={darkMode ? "text-[14px] text-[white] font-[Poppins-Medium] py-[15px] bg-[rgba(42,41,41,0.53)]  px-[10px] rounded-xl" : "text-[14px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[10px] rounded-xl"} style={{ borderRadius: 5 }} />
                        <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center', borderColor: darkMode ? 'rgba(100, 100, 100, 0.88)' : 'rgba(225, 225, 225, 0.88)', borderWidth: darkMode ? 0 : 1, backgroundColor: darkMode ? 'black' : 'black' }]} activeOpacity={.6}>
                            <Text className={darkMode ? "text-[14px] text-white font-[Poppins-Medium]" : "text-[14px] text-white font-[Poppins-Medium]"}>Change Name</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="gap-[10px] mb-[40px]">
                        <Text className={darkMode ? "text-[16px] text-[white] font-[Poppins-SemiBold]" : "text-[16px] font-[Poppins-SemiBold]"}>Change Password</Text>
                        <TextInput placeholder="Current password" placeholderTextColor={'rgb(190,190,190)'} className={darkMode ? "text-[14px] text-[white] font-[Poppins-Medium] py-[15px] bg-[rgba(42,41,41,0.53)]  px-[10px] rounded-xl" : "text-[14px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[10px] rounded-xl"} style={{ borderRadius: 5 }} />
                        <TextInput placeholder="Latest password" placeholderTextColor={'rgb(190,190,190)'} className={darkMode ? "text-[14px] text-[white] font-[Poppins-Medium] py-[15px] bg-[rgba(42,41,41,0.53)]  px-[10px] rounded-xl" : "text-[14px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[10px] rounded-xl"} style={{ borderRadius: 5 }} />
                        <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center', borderColor: darkMode ? 'rgba(100, 100, 100, 0.88)' : 'rgba(225, 225, 225, 0.88)', borderWidth: darkMode ? 0 : 1, backgroundColor: darkMode ? 'black' : 'black' }]} activeOpacity={.6}>
                            <Text className={darkMode ? "text-[14px] text-white font-[Poppins-Medium]" : "text-[14px] text-white font-[Poppins-Medium]"}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="gap-[10px] mb-[40px] pb-[40px]">
                        <Text className={darkMode ? "text-[16px] text-[white] font-[Poppins-SemiBold]" : "text-[16px] font-[Poppins-SemiBold]"}>Change Email</Text>
                        <TextInput placeholder="Current Email" placeholderTextColor={'rgb(190,190,190)'} className={darkMode ? "text-[14px] text-[white] font-[Poppins-Medium] py-[15px] bg-[rgba(42,41,41,0.53)]  px-[10px] rounded-xl" : "text-[14px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[10px] rounded-xl"} />
                        <TextInput placeholder="Latest Email" placeholderTextColor={'rgb(190,190,190)'} className={darkMode ? "text-[14px] text-[white] font-[Poppins-Medium] py-[15px] bg-[rgba(42,41,41,0.53)]  px-[10px] rounded-xl" : "text-[14px] font-[Poppins-Medium] py-[15px] border-2 border-gray-200 px-[10px] rounded-xl"} />
                        <TouchableOpacity style={[styles.view, { padding: 12, borderRadius: 7, alignItems: 'center', borderColor: darkMode ? 'rgba(100, 100, 100, 0.88)' : 'rgba(225, 225, 225, 0.88)', borderWidth: darkMode ? 0 : 1, backgroundColor: darkMode ? 'black' : 'black' }]} activeOpacity={.6}>
                            <Text className={darkMode ? "text-[14px] text-white font-[Poppins-Medium]" : "text-[14px] text-white font-[Poppins-Medium]"}>Change Email</Text>
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