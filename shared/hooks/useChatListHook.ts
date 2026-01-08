import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GlobalContextApi } from "../../context/GlobalContext";
import { useNavigation } from "@react-navigation/native";
import { IMessage } from "react-native-gifted-chat";
import { useWindowDimensions } from "react-native";
import { UserChat } from "../../type/chat";
import { GetAllUSerForChat, getOrCreateChatRoom, sendMessage, subscribeToMessage, subscribeToUserChats } from "../services/chatService";

export default function useChatListHook() {
    const navigation = useNavigation();
    const context = useContext(GlobalContextApi);
    const { user } = useContext(AuthContext);
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
    return {
        user, chatRoomId, setChatRoomId, loading, setLoading, otherUser, setOtherUser, messages, setMessages, width, inputWidth, usersForChat, setUsersForChat, currentUser, darkMode,
        chatRooms, navigation,setChatRooms, visible, setVisible, ChatScreenModalPopUp, ChatScreenModalPopOut, HandleCreateNewChatRoom, handleSend
    }
}