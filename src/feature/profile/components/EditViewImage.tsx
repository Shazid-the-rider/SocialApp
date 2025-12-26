import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Animated, Dimensions, Image, Keyboard, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PostType } from "../../../../type/typeCast";

type Props = {
    editViewImageModal: boolean;
    EditViewImageModalPopOut: () => void;
    viewImage: boolean;
    setViewImage: (val: boolean) => void;
    selectedPost: PostType | undefined;
    darkMode: boolean;
    HandlePostDelete: (postid: string) => Promise<void>
}
const height = Dimensions.get('window').height;
export const EditViewImage = React.memo(({ darkMode, editViewImageModal, EditViewImageModalPopOut, viewImage, setViewImage, selectedPost, HandlePostDelete }: Props) => {
    const bottomEditAnim = useRef(new Animated.Value(-height)).current;
    const [editAction, setEditAction] = useState<boolean>(false);
    const navigation = useNavigation();
    const optionPopUp = () => {
        return (
            Animated.timing(bottomEditAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
        )
    }
    const optionPopOut = () => {
        return (
            Animated.timing(bottomEditAnim, {
                toValue: -height,
                duration: 500,
                useNativeDriver: false
            }).start()
        )
    }
    return (

        <Modal
            visible={editViewImageModal}
            animationType="slide"
            statusBarTranslucent
            onRequestClose={EditViewImageModalPopOut}
            className="h-[100%] w-[100%] bg-black"
        >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setEditAction(false); optionPopOut() }}>
                <View className={darkMode ? editAction ? "flex-1 justify-start items-center bg-black absolute top-[0px] h-[100%] w-[100%]" : "flex-1 justify-center items-center bg-black absolute top-[0px] h-[100%] w-[100%]" : editAction ? "flex-1 justify-start items-center bg-white absolute top-[0px] h-[100%] w-[100%]" : "flex-1 justify-center items-center bg-white absolute top-[0px] h-[100%] w-[100%]"} style={{ zIndex: viewImage ? 1 : -1 }}>

                    <TouchableOpacity className=" absolute top-[30px] left-[5px] flex-row items-center justify-start w-[auto]" style={{ zIndex: viewImage ? 1 : -1 }} activeOpacity={0.6} onPress={() => { EditViewImageModalPopOut() }}>
                        <Ionicons name="chevron-back" size={24} color={darkMode ? 'white' : "black"} />
                        <Text className={darkMode ? " text-[white] text-[15px]" : "text-[15px]"} style={{ fontFamily: 'Poppins-SemiBold' }}>Back to profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className=" absolute top-[30px] right-[15px] flex-row items-center justify-start w-[auto]" style={{ zIndex: viewImage ? 1 : -1 }} activeOpacity={0.6} onPress={() => { optionPopUp() }}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color={darkMode ? 'white' : "black"} />
                    </TouchableOpacity>
                    {
                        editAction && (
                            <View className="w-[100%] mt-[100px] mb-[30px] px-[10px] h-[50px]">
                                <TextInput multiline numberOfLines={20} placeholder="Write caption..." className={darkMode ? "font-[Poppins-Medium] w-[100%] h-[100%] text-[white]" : "font-[Poppins-Medium] w-[100%] h-[100%]"} />
                            </View>
                        )
                    }
                    <Image resizeMode={'cover'} source={{ uri: selectedPost?.imgurl }} className="h-[300px] w-[100%]" />
                    <Animated.View className={darkMode ? "justify-center items-center gap-[15] absolute h-[150px] w-[100%] bg-black shadow-transparent shadow-md rounded-t-3xl" : "justify-center items-center gap-[15] absolute h-[150px] w-[100%] bg-white shadow-transparent shadow-md rounded-t-3xl"} style={{ bottom: bottomEditAnim }}>
                        <TouchableOpacity onPress={() => setEditAction(true)}>
                            <Text className={darkMode ? "font-[Poppins-SemiBold] text-[17px] text-[white]" : "font-[Poppins-SemiBold] text-[17px]"}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { HandlePostDelete(selectedPost?.id!); setViewImage(false); }}>
                            <Text className="font-[Poppins-SemiBold] text-[17px] text-red-600">Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => optionPopOut()} >
                            <Text className={darkMode ? "font-[Poppins-SemiBold] text-[white] text-[17px]" : "font-[Poppins-SemiBold] text-[17px]"}>Close</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )

})