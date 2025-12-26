import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Animated, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { NotificationPop } from "./NotificationPop";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../../context/AuthContext";

type Props = {

    UploadPost: () => Promise<void>;
    setDes: (text: string) => void;
    setFocus: (val: boolean) => void;
    selectedImage: string;
    setSelectedImage: (uri: string) => void;
    postType: string;
    setType: (val: string) => void;
    PickFile: () => Promise<void>
    des: string;
    focus: boolean,
    status: boolean,
    message: string,
    notify: Animated.Value;
    currentUser: any;
    PostModalPopOut: () => void;
    createPostModal: boolean
    darkMode: boolean
}
export const CreatePostSheet = React.memo(({ darkMode, createPostModal, PostModalPopOut, currentUser, status, message, notify, focus, UploadPost, setDes, setFocus, selectedImage, setSelectedImage, postType, setType, PickFile, des }: Props) => {
    return (
        <Modal
            visible={createPostModal}
            animationType="slide"
            statusBarTranslucent
            onRequestClose={PostModalPopOut}
            className="h-[100%] w-[100%] bg-black"
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className={darkMode ? " absolute h-[100%] w-[100%] bg-black  z-40 " : " absolute h-[100%] w-[100%] bg-white  z-40 "}  >
                    <View className="flex-row items-center h-[70px] px-[10px] justify-between">
                        <TouchableOpacity className="flex-row items-center" activeOpacity={0.6} onPress={() => { Keyboard.dismiss(); PostModalPopOut() }}>
                            <Ionicons name="chevron-back" size={24} color={darkMode ? 'white' : "black"} />
                            <Text className={darkMode ? "text-[15px] text-[white]" : "text-[15px]"} style={{ fontFamily: 'Poppins-SemiBold' }}>Back</Text>
                        </TouchableOpacity>
                        {
                            (des.trim() !== "" || selectedImage) && (
                                <TouchableOpacity className="flex-row items-center mr-[10px]" activeOpacity={0.6} onPress={() => {
                                    Keyboard.dismiss();
                                    UploadPost();
                                }}>
                                    <Text className="text-[15px] text-blue-700" style={{ fontFamily: 'Poppins-SemiBold' }}>Done</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, justifyContent: 'flex-start' }} keyboardVerticalOffset={10}>
                        <View className="items-center mb-[25px] gap-[10]">
                            <Text className={darkMode ? "font-[Poppins-Semibold] text-[white] text-[25px]" : "font-[Poppins-Semibold] text-[25px]"}>Create Your Post</Text>
                            <Text className={darkMode ? "text-[15px] text-[rgba(186,186,186,0.53)] font-[Poppins-SemiBold]" : "text-[15px] text-[rgba(73,73,73,0.53)] font-[Poppins-SemiBold]"}> Moments & Thoughts share with everyone</Text>
                        </View>
                        <View className="flex-row items-center gap-[10] mx-[20px] mb-[10px] ">
                            <Image className="h-[30px] w-[30px] rounded-full" source={{ uri: currentUser.image }} />
                            <View>
                                <View className="flex-row gap-[5px] items-center">
                                    <Text className={darkMode ? "font-[Poppins-SemiBold] text-[white] text-[14px]" : "font-[Poppins-SemiBold] text-[14px]"}>{currentUser.firstName} {currentUser.lastName}</Text>
                                    <MaterialIcons name="verified" size={15} color="blue" />
                                </View>
                                <View className="flex-row gap-[10]">
                                    <Text className={darkMode ? "font-[Poppins-Medium] text-[white] text-[12px]" : "font-[Poppins-Medium] text-[12px]"}>Public</Text>
                                    <FontAwesome name="globe" size={15} color="grey" />
                                </View>
                            </View>
                        </View>
                        <View className={focus ? "flex-[.8]" : selectedImage ? "h-[20%]" : "h-[60%]"}>
                            <TextInput
                                placeholder="What's on your mind"
                                multiline
                                textAlignVertical="top"
                                value={des}
                                onChangeText={(text) => setDes(text)}
                                numberOfLines={50}
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                                className={darkMode ? "flex-1 px-[10] py-[10] mx-[10] font-[Poppins-Medium] text-[white] text-[15px] leading-[20px]" : "flex-1 px-[10] py-[10] mx-[10] font-[Poppins-Medium] text-[15px] leading-[20px]"}
                            />
                        </View>
                        {
                            focus === false && (
                                <>
                                    {
                                        selectedImage && (
                                            <View className="flex-[.7] justify-center items-center relative">
                                                <TouchableOpacity className="absolute right-[10px] top-[3px] z-[100] h-[32] w-[32] rounded-full bg-white" activeOpacity={.7} onPress={() => setSelectedImage("")}>
                                                    <MaterialIcons name="cancel" size={32} color="black" />
                                                </TouchableOpacity>
                                                <Image resizeMode="cover" source={{ uri: selectedImage }} className="h-[90%] w-[90%] " />
                                            </View>
                                        )
                                    }
                                    <View className="absolute w-[100%] bottom-[40]  flex-row justify-center gap-[20]">
                                        <TouchableOpacity className={postType === 'photos' ? " w-[40%] flex-row justify-center items-center gap-[6]  py-[7px] rounded-3xl" : "w-[40%] flex-row  justify-center items-center gap-[6] px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => { setType('photo'); PickFile() }}>
                                            <Ionicons name="images-sharp" size={24} color={darkMode ? 'white' : "black"} />
                                            <Text className={darkMode ? "text-[15px] text-[white] font-[Poppins-Medium]" : "text-[15px] font-[Poppins-Medium]"}>Add Photos</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className={postType === 'reel' ? "w-[40%] flex-row justify-center  items-center gap-[6]  py-[7px] rounded-3xl" : "w-[40%] flex-row  justify-center items-center gap-[6]  px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => { setType('video'), PickFile() }}>
                                            <FontAwesome name="video-camera" size={24} color={darkMode ? 'white' : "black"} />
                                            <Text className={darkMode ? "text-[15px] text-[white] font-[Poppins-Medium]" : "text-[15px] font-[Poppins-Medium]"}>Add Videos</Text>
                                        </TouchableOpacity>
                                    </View></>
                            )
                        }
                    </KeyboardAvoidingView>
                    <NotificationPop status={status} message={message} notify={notify} />
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
})