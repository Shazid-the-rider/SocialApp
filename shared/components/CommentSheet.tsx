import { useContext, useState } from "react";
import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { GlobalContextApi } from "../../context/GlobalContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Timestamp } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { deleteComment } from "../services/firebaseCrudService";

export default function CommentSheet() {
    const context = useContext(GlobalContextApi);
    const [des, setDes] = useState("");
    const { user } = useContext(AuthContext);
    if (!user) {
        return;
    }
    if (!context) return null;

    const { commentSheet, commentLike, darkMode, UploadComment, comments, commentSheetModalPopOut, UserCommentReaction } = context;

    return (
        <View className="flex-1">
            <Modal visible={commentSheet} animationType="slide" statusBarTranslucent>
                <KeyboardAvoidingView
                    style={{ flex: 1, backgroundColor: darkMode ? 'rgb(18,18,18)' : 'white' }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View className={darkMode ? "flex-1 px-[15px] bg-[rgb(18,18,18)]" : "flex-1 px-[15px] bg-white"}>

                            {/* Header */}
                            <View className="relative h-[40px] w-full justify-center  mb-[20px] mt-[30px]">
                                <TouchableOpacity className="absolute left-4 z-10" onPress={() => commentSheetModalPopOut()}>
                                    <Ionicons
                                        name="chevron-back"
                                        size={24}
                                        color={darkMode ? "white" : "black"}
                                    />
                                </TouchableOpacity>

                                <View className="w-full items-center">
                                    <Text className={
                                        darkMode
                                            ? "text-[17px] font-[Poppins-SemiBold] text-white"
                                            : "text-[17px] font-[Poppins-SemiBold]"
                                    }>
                                        Comments
                                    </Text>
                                </View>
                            </View>

                            {/* Empty comments */}
                            {comments.length === 0 && (
                                <View className="flex-1 justify-center items-center">
                                    <Text className={darkMode ? "text-[15px] font-[Poppins-Medium] text-gray-400" : "text-[15px] font-[Poppins-Medium] text-gray-400"}>
                                        No comments available
                                    </Text>
                                </View>
                            )}

                            {
                                comments.length > 0 && (
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={comments}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => {
                                            const jsDate = item.createdAt ? item.createdAt instanceof Timestamp ? item.createdAt.toDate() : item.createdAt : undefined;
                                            return (
                                                <View className="w-[100%] mb-[20px]">
                                                    <View className="flex-row items-center gap-[10]">
                                                        <Image source={{ uri: item.image }} className="h-[30px] w-[30px] rounded-full" />
                                                        <View style={{
                                                            backgroundColor: darkMode ? 'rgb(40,40,40)' : 'white',
                                                            paddingVertical: 10,
                                                            borderRadius: 10,
                                                            width: '88%',
                                                            paddingHorizontal: 10,
                                                            shadowColor: "rgb(100,100,100)",
                                                            shadowOffset: { width: 0, height: 2 },
                                                            shadowOpacity: 0.20,
                                                            shadowRadius: 5,
                                                            elevation: 5,
                                                        }}
                                                        >
                                                            <View className="flex-row items-center gap-[5]">
                                                                <Text className={darkMode ? "font-[Poppins-Medium] text-[14px] text-[white]" : "font-[Poppins-Medium] text-[14px]"}>{item.name}</Text>
                                                                <MaterialIcons name="verified" color={'blue'} size={15} />
                                                            </View>
                                                            <View className="w-[100%] pt-[5px]">
                                                                <Text numberOfLines={5} className={darkMode ? "font-[Poppins-Medium] text-[14px] text-[white]" : "font-[Poppins-Medium] text-[14px]"}>{item.text}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View className="flex-row gap-[10] justify-between" style={{ width: '100%', paddingLeft: 45, paddingTop: 5, paddingRight: 5 }}>
                                                        <View className="flex-row gap-[20]">
                                                            <TouchableOpacity onPress={() => { UserCommentReaction(user!.uid, item.postid, item.commentId) }}>
                                                                <Text className={darkMode ? commentLike.includes(item.commentId) ? "font-[Poppins-Medium] text-[black] text-[12px]" : "font-[Poppins-Medium] text-gray-400 text-[12px]" : commentLike.includes(item.commentId) ? "text-[red] font-[Poppins-Medium] text-[12px]" : "font-[Poppins-Medium] text-[12px]"}>Like</Text>
                                                            </TouchableOpacity>
                                                            {
                                                                item.id === user?.uid && (
                                                                    <TouchableOpacity onPress={() => deleteComment(item.commentId)}>
                                                                        <Text className={darkMode ? "font-[Poppins-Medium] text-gray-400 text-[12px]" : "font-[Poppins-Medium] text-[12px]"}>Delete</Text>
                                                                    </TouchableOpacity>
                                                                )
                                                            }
                                                        </View>
                                                        <View className="flex-row gap-[10]">
                                                            <Text className={darkMode ? "font-[Poppins-Medium] text-gray-400 text-[12px]" : "font-[Poppins-Medium] text-[12px]"}>{jsDate?.toLocaleDateString([], { month: 'short', year: '2-digit', day: '2-digit' }).replace(/,/g, '')}</Text>
                                                            <Text className={darkMode ? "font-[Poppins-Medium] text-gray-400 text-[12px]" : "font-[Poppins-Medium] text-[12px]"}>{jsDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                            )
                                        }}
                                        className="flex-1"
                                    />
                                )
                            }

                            {/* Input — FLEX PUSHED TO BOTTOM */}
                            <View className="mt-auto flex-row gap-[15] items-center py-[20px]">
                                <TextInput
                                    placeholder="Type your comment"
                                    value={des}
                                    placeholderTextColor="rgb(200,200,200)"
                                    className={darkMode ? "py-[15px] font-[Poppins-Medium] text-[15px] text-[white]" : "py-[15px] font-[Poppins-Medium] text-[15px]"}
                                    style={{
                                        borderWidth: 0.5,
                                        borderColor: darkMode ? "rgb(140,140,140)" : "rgb(190,190,190)",
                                        width: '85%',
                                        paddingLeft: 10,
                                        borderRadius: 10,
                                        paddingHorizontal: 5
                                    }}
                                    onChangeText={(text) => setDes(text)}
                                />
                                <TouchableOpacity disabled={des.trim().length === 0} style={{ opacity: des.trim().length === 0 ? .3 : 1 }} onPress={() => { UploadComment(des); setDes(""); Keyboard.dismiss() }}>
                                    <Text className={darkMode ? "text-[15px] font-[Poppins-Medium] text-[white]" : "text-[15px] font-[Poppins-Medium]"} style={{ opacity: des.trim().length === 0 ? .6 : 1 }}>
                                        Send
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}
