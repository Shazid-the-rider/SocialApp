import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export const PostOptionModal = React.memo(({ optionModal, OptionModalPopOut, postUid, HandlePostDelete, EditPostModalPopUp }: { optionModal: boolean, OptionModalPopOut: () => void, postUid: string, HandlePostDelete: (postid: string) => Promise<void>, EditPostModalPopUp: () => void }) => {
    return (
        <Modal visible={optionModal} transparent animationType="slide">
            <View className="h-[200px] gap-[30] w-[100%] bg-white shadow-md rounded-3xl absolute bottom-0 items-center pt-[15px] ">
                <View className="h-[2px] w-[30px] border-2"></View>
                <View className="justify-center items-center gap-[20] pt-[5px]">
                    <TouchableOpacity onPress={() => { OptionModalPopOut(); EditPostModalPopUp() }}>
                        <Text className="font-[Poppins-SemiBold] text-[17px]">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { HandlePostDelete(postUid); OptionModalPopOut() }}>
                        <Text className="font-[Poppins-SemiBold] text-[17px] text-[red]">Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => OptionModalPopOut()}>
                        <Text className="font-[Poppins-SemiBold] text-[17px]">Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
})