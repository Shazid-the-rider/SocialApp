import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IMessage } from "react-native-gifted-chat";
import { AuthContext } from "../../context/AuthContext";
import { GlobalContextApi } from "../../context/GlobalContext";
import { UserChat } from "../../type/chat";
import { ChatScreenModal } from "../components/ChatScreen";
import { GetAllUSerForChat, getOrCreateChatRoom, sendMessage, subscribeToMessage, subscribeToUserChats } from "../services/chatService";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export default function ChatList() {
    const context = useContext(GlobalContextApi);
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [chatRoomId, setChatRoomId] = useState("");
    const [loading, setLoading] = useState(true);
    const [otherUser, setOtherUser] = useState<any>("");
    const [messages, setMessages] = useState<IMessage[]>([]);
    if (!context) return null;
    const { width } = useWindowDimensions();
    const inputWidth = width / 1.5;
    const { usersForChat, setUsersForChat, currentUser, darkMode } = context;
    const [chatRooms, setChatRooms] = useState<UserChat[]>([]);
    const [visible, setVisible] = useState(false);
    const ChatScreenModalPopUp = () => {
        setVisible(true);
    }
    const ChatScreenModalPopOut = () => {
        setVisible(false);
    }
    useEffect(() => {
        if (!user?.uid) return;

        GetAllUSerForChat(user.uid, setUsersForChat);
    }, [user]);

    useEffect(() => {
        if (!user?.uid) return;
        const unsub = subscribeToUserChats(user.uid, setChatRooms);
        return () => unsub();
    }, [user])
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])

    const HandleCreateNewChatRoom = async (otherUser: any) => {
        if (!user?.uid) {
            return;
        }
        const user1 = {
            displayName: `${currentUser?.firstName} ${currentUser?.lastName}`,
            photoUrl: currentUser?.image
        }
        const user2 = {
            displayName: `${otherUser?.firstName} ${otherUser?.lastName}`,
            photoUrl: otherUser?.image
        }
        const Id = await getOrCreateChatRoom(user.uid, otherUser.uid, user1, user2);
        setChatRoomId(Id);
    }

    useEffect(() => {
        if (!chatRoomId) return;

        const unsubscribe = subscribeToMessage(chatRoomId, (msgs) => {
            const formattedMessages: IMessage[] = msgs.map((msg) => ({
                _id: msg._id,
                text: msg.text,
                createdAt: msg.createdAt,
                user: {
                    _id: msg.user._id,
                    name: msg.user.name,
                    avatar: msg.user.avatar,
                },
            }));
            setMessages(formattedMessages);
        });

        return () => unsubscribe();
    }, [chatRoomId]);
    const handleSend = useCallback(
        async (newMessages: IMessage[] = []) => {
            const msg = newMessages[0];
            if (!msg) return;
            if (!user?.uid) {
                return;
            }
            try {
                await sendMessage(chatRoomId, {
                    text: msg.text,
                    createdAt: new Date(),
                    user: {
                        _id: user?.uid,
                        name: `${currentUser?.firstName} ${currentUser?.lastName}`,
                        avatar: currentUser?.image,
                    },
                    chatRoomId: chatRoomId,
                });
            } catch (error) {
                console.error("Failed to send message", error);
            }
        },
        [chatRoomId, user, currentUser]
    );

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
                            <View className="relative h-[60px] w-full justify-center mb-[20px]">
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
                                <FlatList
                                    data={usersForChat}
                                    keyExtractor={(item, index) => item.uid.toString() + index}
                                    horizontal
                                    renderItem={({ item }) => (
                                        <TouchableOpacity className="mb-4 mr-[10px] justify-center items-center gap-[10]" onPress={() => { setOtherUser(item); HandleCreateNewChatRoom(item); ChatScreenModalPopUp() }}>
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
                                        <View className="mt-[20px]">
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
                                                                        uid: item.otherUserId, // optional, if you need it
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
                            <ChatScreenModal visible={visible} inputWidth={inputWidth} messages={messages} ChatScreenModalPopOut={ChatScreenModalPopOut} otherUser={otherUser} handleSend={handleSend} currentUser={currentUser} user={user} />

                        </View>
                    )
                }
            </View>

        </SafeAreaView>
    );
}
