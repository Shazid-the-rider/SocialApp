import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ChatScreenModal } from "../components/ChatScreen";
import useChatListHook from "../hooks/useChatListHook";


export default function ChatList() {
    const hooks = useChatListHook();
    if (!hooks) {
        return;
    }
    const { user, chatRoomId, navigation, setChatRoomId, loading, setLoading, otherUser, setOtherUser, messages, setMessages, width, inputWidth, usersForChat, setUsersForChat, currentUser, darkMode,
        chatRooms, setChatRooms, visible, setVisible, ChatScreenModalPopUp, ChatScreenModalPopOut, HandleCreateNewChatRoom, handleSend } = hooks

    return (
        <SafeAreaView className={darkMode ? "flex-1 bg-[rgb(18,18,18)]" : "flex-1 bg-white"}>
            <View className={darkMode ? "flex-1 bg-[rgb(18,18,18)] px-[10px]" : "flex-1 bg-white px-[10px]"}>
                {
                    loading ? (
                        <View className="h-[100%] w-[100%] justify-center items-center">
                            <ActivityIndicator size={'small'} color={darkMode ? "white" : 'gray'} />
                        </View>
                    ) : (
                        <View>
                            <View className="relative h-[70px] w-full justify-center ">
                                <TouchableOpacity className="absolute left-4 z-10 px-[5px]" onPress={() => navigation.goBack()}>
                                    <Ionicons name="chevron-back" size={24} color={darkMode ? 'white' : "black"} />
                                </TouchableOpacity>
                                <View className="w-full items-center">
                                    <Text className={darkMode ? "text-[17px] font-[Poppins-SemiBold] text-[white]" : "text-[17px] font-[Poppins-SemiBold]"}>
                                        Chats
                                    </Text>
                                </View>
                            </View>
                            <ScrollView className="h-[100%]" showsVerticalScrollIndicator={false}>
                                <Text className={darkMode ? "font-[Poppins-SemiBold] text-[white] text-[18px] py-[15px] px-[5px]" : "font-[Poppins-SemiBold] text-[18px] py-[15px] px-[5px]"}>Available User</Text>
                                <FlatList
                                    data={usersForChat}
                                    keyExtractor={(item, index) => item.uid.toString() + index}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity className="mb-4 mr-[10px] justify-center items-center gap-[10] px-[5px]" onPress={() => { setOtherUser(item); HandleCreateNewChatRoom(item); ChatScreenModalPopUp() }}>
                                            <Image
                                                source={{ uri: item.image }}
                                                resizeMode="cover"
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 100,
                                                    backgroundColor: "#e5e7eb",
                                                }}
                                            />
                                            <Text className={darkMode ? "text-[12px] font-[Poppins-Medium] text-[white]" : "text-[12px] font-[Poppins-Medium]"}>{item.firstName} {item.lastName}</Text>
                                        </TouchableOpacity>
                                    )}
                                />

                                {
                                    chatRooms.length === 0 ? (
                                        <View className=" mt-[100px] items-center">
                                            <Text className={darkMode ? "text-[14px] font-[Poppins-Medium] text-[white]" : "text-[14px] font-[Poppins-Medium]"}>No chat available</Text>
                                        </View>
                                    ) : (
                                        <View className="mt-[0px] px-[5px]">
                                            <Text className={darkMode ? "font-[Poppins-SemiBold] text-[white] text-[18px] py-[15px]" : "font-[Poppins-SemiBold] text-[18px] pt-[15px] pb-[20px]"}>Your messages</Text>
                                            {
                                                chatRooms.map((item, index) => {
                                                    return (
                                                        <View key={index} className="pb-[15px]">
                                                            <TouchableOpacity
                                                                className="flex-row items-center p-2 mb-5 gap-[10] border-b border-gray-200"
                                                                onPress={() => {

                                                                    setOtherUser({
                                                                        firstName: item.otherUserName.split(' ')[0],
                                                                        lastName: item.otherUserName.split(' ')[1] || '',
                                                                        image: item.otherUserPhoto,
                                                                        uid: item.otherUserId,
                                                                    });
                                                                    HandleCreateNewChatRoom({
                                                                        uid: item.otherUserId,
                                                                        firstName: item.otherUserName.split(' ')[0],
                                                                        lastName: item.otherUserName.split(' ')[1] || '',
                                                                        image: item.otherUserPhoto
                                                                    });
                                                                    ChatScreenModalPopUp();
                                                                }}
                                                            >
                                                                <Image
                                                                    source={{ uri: item.otherUserPhoto }}
                                                                    style={{
                                                                        width: 60,
                                                                        height: 60,
                                                                        borderRadius: 60,
                                                                    }}
                                                                />
                                                                <View className="ml-3 flex-1 gap-[5]">
                                                                    <Text className={darkMode ? "text-[15px] font-[Poppins-Medium] text-[white]" : "text-[15px] font-[Poppins-Medium]"}>
                                                                        {item.otherUserName}
                                                                    </Text>
                                                                    <Text className={darkMode ? "text-gray-400 text-[13px] font-[Poppins-Medium]" : "text-black text-[13px] font-[Poppins-Medium]"} numberOfLines={1}>
                                                                        {item.lastMessage || "No messages yet"}
                                                                    </Text>
                                                                </View>
                                                                {item.lastMessageTime && (
                                                                    <Text className={darkMode ? "text-white text-[13px] font-[Poppins-Medium]" : "text-black text-[13px] font-[Poppins-Medium]"}>
                                                                        {new Date(item.lastMessageTime).toLocaleTimeString([], {
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                        })}
                                                                    </Text>
                                                                )}
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                }
                            </ScrollView>
                            <ChatScreenModal darkMode={darkMode} visible={visible} inputWidth={inputWidth} messages={messages} ChatScreenModalPopOut={ChatScreenModalPopOut} otherUser={otherUser} handleSend={handleSend} currentUser={currentUser} user={user} />

                        </View>
                    )
                }
            </View>

        </SafeAreaView>
    );
}
