import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    Keyboard,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { PostType } from "../../../../type/typeCast";


type Props = {
    editViewImageModal: boolean;
    EditViewImageModalPopOut: () => void;
    viewImage: boolean;
    setViewImage: (val: boolean) => void;
    selectedPost: PostType | undefined;
    darkMode: boolean;
    HandlePostDelete: (postid: string) => Promise<void>;
    updatePost: (postid: string, status: string) => Promise<void>;
};

const height = Dimensions.get("window").height;

export const EditViewImage = React.memo(
    ({
        updatePost,
        darkMode,
        editViewImageModal,
        EditViewImageModalPopOut,
        viewImage,
        setViewImage,
        selectedPost,
        HandlePostDelete,
    }: Props) => {
        const bottomEditAnim = useRef(new Animated.Value(-height)).current;

        const [des, setdes] = useState(selectedPost?.des ?? "");
        const [editAction, setEditAction] = useState<boolean>(false);

        // ✅ store initial description (no re-render)
        const initialDesRef = useRef<string>("");

        // ✅ sync when selected post changes
        useEffect(() => {
            if (selectedPost?.des !== undefined) {
                setdes(selectedPost.des);
                initialDesRef.current = selectedPost.des;
            }
        }, [selectedPost]);

        // ✅ enable save ONLY when changed & non-empty
        const canSave =
            des.trim().length > 0 &&
            des.trim() !== initialDesRef.current.trim();

        const optionPopUp = () => {
            Animated.timing(bottomEditAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
        };

        const optionPopOut = () => {
            Animated.timing(bottomEditAnim, {
                toValue: -height,
                duration: 500,
                useNativeDriver: false,
            }).start();
        };

        return (
            <Modal
                visible={editViewImageModal}
                animationType="slide"
                statusBarTranslucent
                onRequestClose={EditViewImageModalPopOut}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                        optionPopOut();
                    }}
                >
                    <View
                        className={
                            darkMode
                                ? editAction
                                    ? "flex-1 justify-start items-center bg-[rgb(18,18,18)] absolute top-[0px] h-[100%] w-[100%]"
                                    : "flex-1 justify-center items-center bg-[rgb(18,18,18)] absolute top-[0px] h-[100%] w-[100%]"
                                : editAction
                                    ? "flex-1 justify-start items-center bg-white absolute top-[0px] h-[100%] w-[100%]"
                                    : "flex-1 justify-center items-center bg-white absolute top-[0px] h-[100%] w-[100%]"
                        }
                        style={{ zIndex: viewImage ? 1 : -1 }}
                    >
                        {/* Back */}
                        <TouchableOpacity
                            className="absolute top-[40px] left-[5px] flex-row items-center"
                            activeOpacity={0.6}
                            onPress={() => {
                                optionPopOut();
                                EditViewImageModalPopOut();
                            }}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color={darkMode ? "white" : "black"}
                            />
                            <Text
                                className={darkMode ? "text-white text-[15px]" : "text-[15px]"}
                                style={{ fontFamily: "Poppins-Medium" }}
                            >
                                Back to profile
                            </Text>
                        </TouchableOpacity>

                        {/* Options */}
                        <TouchableOpacity
                            className="absolute top-[40px] right-[15px]"
                            activeOpacity={0.6}
                            onPress={optionPopUp}
                        >
                            <MaterialCommunityIcons
                                name="dots-vertical"
                                size={24}
                                color={darkMode ? "white" : "black"}
                            />
                        </TouchableOpacity>

                        {/* Caption editor */}
                        {editAction && (
                            <View className="w-[100%] mt-[120px] mb-[20px] px-[10px] h-[50px]">
                                <TextInput
                                    multiline
                                    value={des}
                                    numberOfLines={20}
                                    placeholder="Write caption..."
                                    placeholderTextColor='rgb(190,190,190)'
                                    onChangeText={setdes}
                                    className={
                                        darkMode
                                            ? "font-[Poppins-Medium] w-[100%] h-[100%] text-white"
                                            : "font-[Poppins-Medium] w-[100%] h-[100%]"
                                    }
                                />
                            </View>
                        )}

                        {/* Image */}
                        <Image
                            resizeMode="cover"
                            source={{ uri: selectedPost?.imgurl }}
                            className="h-[250px] w-[100%]"
                        />
                        <View className="flex-row w-[100%] justify-end items-center gap-[20] mr-[20px] mt-[30px]">
                            <View className="items-center gap-[10] flex-row">
                                <MaterialCommunityIcons name="cards-heart" size={21} color={'red'} />
                                <Text className={darkMode ? "text-white text-[13px] font-[Poppins-SemiBold]" : "font-[Poppins-SemiBold] text-[12px]"}>{selectedPost?.like}</Text>
                            </View>
                            <View className="items-center gap-[10] flex-row">
                                <MaterialCommunityIcons name="comment-multiple" size={21} color={darkMode ? 'white' : "black"} />
                                <Text className={darkMode ? "text-white text-[13px] font-[Poppins-SemiBold]" : "font-[Poppins-SemiBold] text-[12px]"}>{selectedPost?.comment}</Text>
                            </View>
                        </View>
                        {/* Bottom sheet */}
                        <Animated.View
                            className={
                                darkMode
                                    ? "justify-center items-center gap-[15] absolute h-[180px] w-[100%] bg-[rgb(16,16,16)] rounded-t-3xl"
                                    : "justify-center items-center gap-[15] absolute h-[180px] w-[100%] bg-white rounded-t-3xl"
                            }
                            style={{ bottom: bottomEditAnim }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setEditAction(true);
                                    optionPopOut();
                                }}
                            >
                                <Text
                                    className={
                                        darkMode
                                            ? "font-[Poppins-Medium] text-[17px] text-white"
                                            : "font-[Poppins-Medium] text-[17px]"
                                    }
                                >
                                    Edit
                                </Text>
                            </TouchableOpacity>

                            {/* SAVE */}
                            <TouchableOpacity
                                disabled={!canSave}
                                onPress={() => {
                                    if (!selectedPost?.id) return;
                                    updatePost(selectedPost.id, des);
                                    optionPopOut();
                                    EditViewImageModalPopOut();
                                }}
                            >
                                <Text
                                    style={{ opacity: canSave ? 1 : 0.4 }}
                                    className={
                                        darkMode
                                            ? "font-[Poppins-Medium] text-[17px] text-white"
                                            : "font-[Poppins-Medium] text-[17px]"
                                    }
                                >
                                    Save
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    HandlePostDelete(selectedPost?.id!);
                                    setViewImage(false);
                                    optionPopOut();
                                    EditViewImageModalPopOut();
                                }}
                            >
                                <Text className="font-[Poppins-Medium] text-[17px] text-red-600">
                                    Delete
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={optionPopOut}>
                                <Text
                                    className={
                                        darkMode
                                            ? "font-[Poppins-Medium] text-white text-[17px]"
                                            : "font-[Poppins-Medium] text-[17px]"
                                    }
                                >
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
);
