import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image, KeyboardAvoidingView, Modal, Text, TouchableOpacity, View } from "react-native";
import { Bubble, GiftedChat, IMessage, InputToolbar, Send, Time } from "react-native-gifted-chat";
import { NewUserModel } from "../../type/typeCast";
type Props = {
    visible: boolean;
    ChatScreenModalPopOut: () => void;
    otherUser: any;
    handleSend: (messages: IMessage[]) => Promise<void>;
    currentUser: NewUserModel | undefined;
    user: any;
    inputWidth: number;
    messages: IMessage[];
}
export const ChatScreenModal = ({ visible, ChatScreenModalPopOut, otherUser, handleSend, currentUser, user, messages, inputWidth }: Props) => {
    return (
        <View>
            <Modal
                visible={visible}
                animationType="slide"
                statusBarTranslucent
                onRequestClose={ChatScreenModalPopOut}
            >

                <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'flex-start' }} behavior="padding">
                    <View className={" w-[100%] bg-white  z-40 bottom-0 pt-[20px] h-[100%] "} >
                        <View className="relative h-[60px] px-[10px] w-full justify-center mb-[20px]">
                            <TouchableOpacity className="absolute left-4 z-10 px-[10px]" onPress={() => ChatScreenModalPopOut()}>
                                <Ionicons name="chevron-back" size={24} color="black" />
                            </TouchableOpacity>
                            <View className="w-full items-center">
                                <Text className="text-[17px] font-[Poppins-SemiBold]">
                                    {otherUser?.firstName} {otherUser?.lastName}
                                </Text>
                            </View>
                        </View>
                        <View className="gap-[10] items-center">
                            <Image source={{ uri: otherUser?.image }} style={{ height: 100, width: 100, borderRadius: 80 }} />
                            <View className="flex-row gap-[5] items-center">
                                <Text className="text-[17px] font-[Poppins-SemiBold]">{otherUser?.firstName} {otherUser?.lastName}</Text>
                                <MaterialIcons name="verified" size={16} color="blue" />
                            </View>
                        </View>
                        <GiftedChat
                            messages={messages}
                            isScrollToBottomEnabled={false}
                            onSend={(msgs) => handleSend(msgs)}
                            user={{
                                _id: user?.uid!,
                                name: `${currentUser?.firstName} ${currentUser?.lastName}`,
                                avatar: currentUser?.image,
                            }}

                            renderInputToolbar={(props) => (
                                <InputToolbar
                                    {...props}
                                    containerStyle={{
                                        backgroundColor: "white",
                                        marginLeft: 20,
                                        marginRight: 20,
                                        marginBottom: 20,
                                        borderTopWidth: 0,
                                        borderRadius: 12,
                                    }}
                                    primaryStyle={{
                                        alignItems: "center",
                                        paddingVertical: 6,
                                    }}
                                />
                            )}

                            textInputProps={{
                                style: {
                                    height: 44,
                                    width: inputWidth * 1.1,
                                    borderRadius: 10,
                                    paddingHorizontal: 15,
                                    fontSize: 16,
                                    backgroundColor: "#f0f0f0",
                                    textAlignVertical: "center",
                                },
                                placeholder: "Type a message...",
                            }}

                            renderSend={(props) => (
                                <Send
                                    {...props}
                                    containerStyle={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    <MaterialIcons name="send" size={26} color="#4e9af1" />
                                </Send>
                            )}
                            renderBubble={(props) => (
                                <Bubble
                                    {...props}
                                    wrapperStyle={{
                                        right: { backgroundColor: 'black' }, // Sent messages
                                        left: { backgroundColor: '#e5e5e5' },   // Received messages
                                    }}
                                    textStyle={{
                                        right: { color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: 15 },
                                        left: { color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 15 },
                                    }}
                                />
                            )}
                            renderTime={(props) => (
                                <View
                                    style={{
                                        marginTop: 1,
                                        marginLeft: props.position === 'left' ? 10 : 0,
                                        marginRight: props.position === 'right' ? 5 : 0,
                                        alignSelf: props.position === 'right' ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    <Time
                                        {...props}
                                        timeTextStyle={{
                                            left: {
                                                fontSize: 10,
                                                color: '#6b7280',
                                                fontFamily: 'Poppins-SemiBold'
                                            },
                                            right: {
                                                fontSize: 10,
                                                color: '#9ca3af',
                                                fontFamily: 'Poppins-SemiBold'
                                            },
                                        }}
                                    />
                                </View>
                            )}
                        />

                    </View>
                </KeyboardAvoidingView>

            </Modal>
        </View>
    )
}