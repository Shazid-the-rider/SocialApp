import { addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Message, UserChat } from "../../type/chat";

type UserDataType = {
    displayName?: string;
    photoUrl?: string;
}
type UserModel = {
    firstName: string;
    lastName: string;
    image: string;
}
export const getOrCreateChatRoom = async (userId1: string, userId2: string, userData1: UserDataType, userData2: UserDataType): Promise<string> => {
    const chatRoomRef = collection(db, 'chatRooms');
    const q = query(chatRoomRef, where("participants", "array-contains", userId1));
    const querySnapshot = await getDocs(q);

    const existingRoom = querySnapshot.docs.find((doc) => {
        const data = doc.data();
        return data.participants.includes(userId2);
    })

    if (existingRoom) {
        return existingRoom.id;
    }

    const newChatRoom = {
        participants: [userId1, userId2],
        createdAt: serverTimestamp(),
        lastMessage: "",
        lastMessageTime: null,
        participantDetails: {
            [userId1]: {
                displayName: userData1.displayName,
                photoUrl: userData1.photoUrl,
            },
            [userId2]: {
                displayName: userData2.displayName,
                photoUrl: userData2.photoUrl,
            },
        }
    }
    const docRef = await addDoc(chatRoomRef, newChatRoom);
    return docRef.id;
}

export const sendMessage = async (chatRoomId: string, message: Omit<Message, "_id">): Promise<void> => {
    try {
        const messageRef = collection(db, 'messages');
        const messageData = {
            text: message.text,
            createdAt: serverTimestamp(),
            user: message.user,
            chatRoomId: chatRoomId
        }

        await addDoc(messageRef, messageData);
        const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
        await updateDoc(chatRoomRef, { lastMessage: message.text, lastMessageTime: serverTimestamp() })
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
}

export const subscribeToMessage = (chatRoomId: string, callback: (messages: Message[]) => void): (() => void) => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("chatRoomId", "==", chatRoomId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        let messages: Message[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                _id: doc.id,
                text: data.text,
                createdAt: data.createdAt?.toDate() || new Date(),
                user: data.user,
                chatRoomId: data.chatRoomId,
            };
        })
        messages = messages.sort((a, b) => {
            const aTime = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
            const bTime = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
            return bTime - aTime;
        });
        callback(messages);
    })
    return unsubscribe;
}

export const subscribeToUserChats = (userId: string, setChatRooms: (chats: UserChat[]) => void): (() => void) => {
    const chatRoomsRef = collection(db, "chatRooms");
    const q = query(chatRoomsRef, where("participants", "array-contains", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        let chats: UserChat[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            const otherUserId = data.participants.find((id: string) => id !== userId) || "";
            const otherUserDetails = data.participantDetails?.[otherUserId] || {};

            return {
                chatRoomId: doc.id,
                otherUserId: otherUserId,
                otherUserName: otherUserDetails.displayName,
                otherUserPhoto: otherUserDetails.photoUrl,
                lastMessage: data.lastMessage || "",
                lastMessageTime: data.lastMessageTime?.toDate(),
            };
        });
        setChatRooms(chats);
    });
    return unsubscribe;
}

export const GetAllUSerForChat = async (currentUserId: string, setUsersForChat: (val: any[]) => void) => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const availableUser = querySnapshot.docs.map((doc) => {
        const data = doc.data() as UserModel;
        return {
            uid: doc.id,
            firstName: data.firstName,
            lastName: data.lastName,
            image: data.image
        }
    }).filter((user) => user.uid !== currentUserId);
    setUsersForChat(availableUser);
}