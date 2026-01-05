import {IMessage} from 'react-native-gifted-chat'

export interface Message extends IMessage{
   chatRoomId:string;
}

export interface ChatRoom {
    id:string;
    participants:string[];
    lastMessage?:string;
    lastMessageTime?:Date;
    createdAt:Date;
    participantsDetails?:{
        [userId:string]:{
            displayName?:string;
            photoUrl?:string;
        }
    }
}

export interface UserChat{
    chatRoomId:string;
    otherUserId:string;
    otherUserName:string;
    otherUserPhoto?:string;
    lastMessage?:string;
    lastMessageTime?:Date;
}