import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export const PostOptionModal = React.memo(({ darkMode, optionModal, OptionModalPopOut, postUid, HandlePostDelete, EditPostModalPopUp }: { darkMode: boolean, optionModal: boolean, OptionModalPopOut: () => void, postUid: string, HandlePostDelete: (postid: string) => Promise<void>, EditPostModalPopUp: () => void }) => {
    return (
        <Modal visible={optionModal} transparent animationType="slide">
            <View className={darkMode ? "h-[200px] gap-[30] w-[100%] bg-black shadow-md rounded-t-3xl absolute bottom-0 items-center pt-[15px] " : "h-[200px] gap-[30] w-[100%] bg-white shadow-md rounded-3xl absolute bottom-0 items-center pt-[15px] "}>
                <View className={darkMode ? "h-[2px] w-[30px] border-white border-2" : "h-[2px] w-[30px] border-2"}></View>
                <View className="justify-center items-center gap-[20] pt-[5px]">
                    <TouchableOpacity onPress={() => { OptionModalPopOut(); EditPostModalPopUp() }}>
                        <Text className={darkMode ? "font-[Poppins-SemiBold] text-[white] text-[17px]" : "font-[Poppins-SemiBold] text-[17px]"}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { HandlePostDelete(postUid); OptionModalPopOut() }}>
                        <Text className="font-[Poppins-SemiBold] text-[17px] text-[red]">Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => OptionModalPopOut()}>
                        <Text className={darkMode ? "font-[Poppins-SemiBold] text-[17px] text-[white]" : "font-[Poppins-SemiBold] text-[17px]"}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
})