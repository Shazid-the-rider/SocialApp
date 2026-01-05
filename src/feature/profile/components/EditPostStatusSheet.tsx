import React, { useEffect, useState } from "react";
import { Image, Keyboard, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

type Props = {
    editPostModal: boolean;
    EditPostModalPopOut: () => void;
    currentStatus: string;
    setCurrentStatus: (val: string) => void;
    currentUser: any;
    postUid: string;
    updatePost: (postid: string, status: string) => Promise<void>
}
export const EditPostStatusSheet = React.memo(({updatePost, postUid, currentUser, currentStatus, setCurrentStatus, editPostModal, EditPostModalPopOut }: Props) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", () =>
            setKeyboardVisible(true)
        );
        const hideSub = Keyboard.addListener("keyboardDidHide", () =>
            setKeyboardVisible(false)
        );

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);
    return (
        <Modal
            visible={editPostModal}
            animationType="slide"
            statusBarTranslucent
            onRequestClose={EditPostModalPopOut}
        >
            <View className="h-[100%] w-[100%] absolute bg-white z-40 px-[20px] shadow-md">
                <View className="flex-row justify-between h-[50px] items-center mt-[20px] mb-[20px]">
                    <TouchableOpacity onPress={() => { Keyboard.dismiss(); setUpdate(false); EditPostModalPopOut() }}>
                        <Text className="font-[Poppins-Medium] text-[14px]">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { updatePost(postUid, currentStatus); EditPostModalPopOut() }}>
                        <Text className={(update && currentStatus.length > 0) ? "font-[Poppins-Medium] text-[14px] text-sky-700" : "font-[Poppins-Medium] text-[14px] text-gray-400"}>Update</Text>
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1">
                        <View className="flex-row items-center gap-[10] ">
                            <Image className="h-[30px] w-[30px] rounded-full" source={{ uri: currentUser.image }} />
                            <View>
                                <View className="flex-row gap-[5px] items-center">
                                    <Text className="font-[Poppins-Medium] text-[14px]">{currentUser.firstName} {currentUser.lastName}</Text>
                                    <MaterialIcons name="verified" size={15} color="blue" />
                                </View>
                                <View className="flex-row gap-[10]">
                                    <Text className="font-[Poppins-Medium] text-[12px]">Public</Text>
                                    <FontAwesome name="globe" size={15} color="grey" />
                                </View>
                            </View>
                        </View>
                        <View className={keyboardVisible ? "flex-[.5] mt-[20px]" : "flex-[.95] mt-[20px]"}>
                            <TextInput value={currentStatus} multiline className={currentStatus.length > 100 ? "font-[Poppins-Medium] text-[16px]" : "font-[Poppins-Medium] text-[22px]"}
                                onChangeText={(text) => { setUpdate(true); setCurrentStatus(text) }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </Modal>
    );
})