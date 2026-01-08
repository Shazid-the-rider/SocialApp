import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NewUserModel, PostType } from "../../../../type/typeCast";
import { Timestamp } from "firebase/firestore";
import { FollowNotificationTrigger } from "../../../../shared/services/Notification";
import CommentSheet from "../../../../shared/components/CommentSheet";
import { useNavigation } from "@react-navigation/native";
type Props = {
    darkMode: boolean;
    visible: boolean;
    searchUserInfo: NewUserModel | undefined;
    setVisible: (val: boolean) => void;
    postType: string;
    setPostType: (val: string) => void;
    filterdata: PostType[];
    likedPost: string[];
    LikePosts: (val: string, val2: string, val3: string) => Promise<void>;
    searchUserUid: string;
    Following: (val: string) => Promise<void>;
    user: any;
    followedUser: string[];
    commentSheetModalPopUp: () => void;
    setSelectedPost: (val: string) => void
}
export default function OthersProfileComponents({ setSelectedPost, commentSheetModalPopUp, user, followedUser, Following, searchUserUid, darkMode, visible, searchUserInfo, setVisible, postType, setPostType, filterdata, likedPost, LikePosts }: Props) {
    const navigation = useNavigation();
    return (
        <View>
            <Modal
                visible={visible}
                transparent
            >
                <View className={darkMode ? "w-[100%] h-[86.5%] bg-[rgb(18,18,18)] absolute bottom-0 justify-center items-center gap-[10]" : "w-[100%] h-[86.5%] bg-white absolute bottom-0 justify-center items-center gap-[10]"}>
                    <View className={darkMode ? "w-[100%] px-[5px]" : "w-[100%] px-[5px]"}>
                        <TouchableOpacity className="flex-row items-center w-[auto]" activeOpacity={0.6} onPress={() => setVisible(false)}>
                            <Ionicons name="chevron-back" size={24} color={darkMode ? 'white' : "black"} />
                            <Text className={darkMode ? "text-[15px] text-[white]" : "text-[15px]"} style={{ fontFamily: 'Poppins-Medium' }}>Back to Home</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView className="w-[100%] px-[15px]" showsVerticalScrollIndicator={false}>
                        <View className="w-[100%] justify-center items-center">
                            <View>
                                <Image source={{ uri: searchUserInfo?.image }} className="h-[150px] w-[150px] rounded-full" />
                            </View>
                            <View className="w-[100%] flex-row gap-[3] items-center justify-center mt-[20px]">
                                <Text className={darkMode ? "text-[19px] font-[Poppins-Medium] text-[white]" : "text-[19px] font-[Poppins-Medium]"}>{searchUserInfo?.firstName} {searchUserInfo?.lastName}</Text>
                                <MaterialIcons name="verified" size={18} color="blue" />
                            </View>
                            <View className="w-[90%] flex-row justify-between pt-[15px]">
                                <View className="items-center w-[100%/3]">
                                    <Text className={darkMode ? "text-[30px] font-[Poppins-SemiBold] text-[white]" : "text-[30px] font-[Poppins-SemiBold]"}>{searchUserInfo?.follower}</Text>
                                    <Text className={darkMode ? "text-[16px] font-[Poppins-Medium] text-[white]" : "text-[16px] font-[Poppins-Medium]"}>Followers</Text>
                                </View>
                                <View className="items-center w-[100%/3]">
                                    <Text className={darkMode ? "text-[30px] font-[Poppins-SemiBold] text-[white]" : "text-[30px] font-[Poppins-SemiBold]"}>{searchUserInfo?.following}</Text>
                                    <Text className={darkMode ? "text-[16px] font-[Poppins-Medium] text-[white]" : "text-[16px] font-[Poppins-Medium]"}>Following</Text>
                                </View>
                                <View className="items-center w-[100%/3]">
                                    <Text className={darkMode ? "text-[30px] font-[Poppins-SemiBold] text-[white]" : "text-[30px] font-[Poppins-SemiBold]"}>{searchUserInfo?.uploadpost}</Text>
                                    <Text className={darkMode ? "text-[16px] font-[Poppins-Medium] text-[white]" : "text-[16px] font-[Poppins-Medium]"}>Posts</Text>
                                </View>
                            </View>
                            <View className="w-[100%] flex-row justify-between mb-[15px] mt-[25px]">
                                <TouchableOpacity className={darkMode ? "w-[45%] bg-red-500 justify-center items-center py-[10px] rounded-xl flex-row gap-[5]" : "w-[47%] bg-black justify-center items-center py-[10px] rounded-xl flex-row gap-[5]"} onPress={() => { Following(searchUserUid); }}>
                                    <Ionicons name="notifications" size={17} color="white" />
                                    <Text className="text-[16px] font-[Poppins-Medium] text-[white]">{followedUser.includes(searchUserUid) ? 'Following' : 'Follow'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="w-[47%] bg-blue-600 justify-center items-center py-[10px] rounded-xl flex-row gap-[5]" onPress={() => {
                                    setVisible(false); setTimeout(() => {
                                        navigation.navigate('ChatList' as never)
                                    }, 500)
                                }}>
                                    <FontAwesome5 name="facebook-messenger" size={17} color="white" />
                                    <Text className="text-[16px] font-[Poppins-Medium] text-[white]">Message</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="w-[100%]">
                                <View className="w-[100%] flex-row gap-[20] justify-start mt-[10px]">
                                    <TouchableOpacity className={darkMode ? postType === 'photo' ? " w-[35%] bg-[#2525255c] flex-row justify-center items-center gap-[10]  px-[10px]  py-[7px] rounded-3xl" : "w-[30%] flex-row  justify-center items-center gap-[6]  px-[10px]  py-[7px] rounded-3xl" : postType === 'photo' ? " w-[35%] flex-row justify-center items-center gap-[10] bg-gray-200  border-gray-100 px-[10px]  py-[7px] rounded-3xl" : "w-[30%] flex-row  justify-center items-center gap-[6] border-2 border-gray-100 px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => setPostType('photo')}>
                                        <Ionicons name="images-sharp" size={17} color={darkMode ? "white" : "black"} />
                                        <Text className={darkMode ? "text-[15px] font-[Poppins-Medium] text-white" : "text-[15px] font-[Poppins-Medium]"}>Photos</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className={darkMode ? postType === 'status' ? " w-[35%] bg-[#2525255c] flex-row justify-center items-center gap-[10]  px-[10px]  py-[7px] rounded-3xl" : "w-[30%] flex-row  justify-center items-center gap-[6]  px-[10px]  py-[7px] rounded-3xl" : postType === 'status' ? " w-[35%] flex-row justify-center items-center gap-[10] bg-gray-200  border-gray-100 px-[10px]  py-[7px] rounded-3xl" : "w-[30%] flex-row  justify-center items-center gap-[6] border-2 border-gray-100 px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => setPostType('status')}>
                                        <MaterialCommunityIcons name="post" size={17} color={darkMode ? "white" : "black"} />
                                        <Text className={darkMode ? "text-[15px] font-[Poppins-Medium] text-white" : "text-[15px] font-[Poppins-Medium]"}>Status</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                filterdata && (
                                    <View className={darkMode ? "w-[100%] bg-[rgb(18,18,18)]" : "w-[100%] bg-white"}>
                                        {
                                            filterdata.map((item, index) => {
                                                const jsDate = item.createdAt ? item.createdAt instanceof Timestamp ? item.createdAt.toDate() : item.createdAt : undefined;
                                                return (
                                                    <View key={index} className={darkMode ? "w-[100%] bg-[rgb(17,17,17)] shadow-sm pb-[5px] pt-[20px] h-[auto] my-[10px] rounded-2xl" : "w-[100%] bg-[white] shadow-sm pb-[5px] pt-[20px] h-[auto] my-[10px] rounded-2xl"}>
                                                        <View className={darkMode ? "flex-row gap-[10] bg-[rgb(17,17,17)] justify-start px-[6px] mb-[0px]" : "flex-row bg-[white] gap-[10] justify-start px-[6px] mb-[0px]"}>
                                                            <View>
                                                                <Image source={{ uri: searchUserInfo?.image }} className="h-[40px] w-[40px] rounded-full" />
                                                            </View>
                                                            <View>
                                                                <View className="flex-row items-center gap-[10]">
                                                                    <Text className={darkMode ? "font-[Poppins-Medium] text-[14px] text-[white]" : "font-[Poppins-Medium] text-[14px]"}>{searchUserInfo?.firstName} {searchUserInfo?.lastName}</Text>
                                                                    <MaterialIcons name="verified" size={15} color="blue" />
                                                                </View>
                                                                <View className="flex-row gap-[10] items-center pb-[15px]">
                                                                    <Text className={darkMode ? "font-[Poppins-Medium] text-[12px] text-[white]" : "font-[Poppins-Medium] text-[12px]"}>{jsDate?.toLocaleDateString([], { weekday: 'short', month: 'short', year: '2-digit', day: '2-digit' }).replace(/,/g, '')}</Text>
                                                                    <Text className={darkMode ? "font-[Poppins-Medium] text-[12px] text-[white]" : "font-[Poppins-Medium] text-[12px]"}>{jsDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                                                    <FontAwesome name="globe" size={17} color="grey" />
                                                                </View>
                                                            </View>
                                                        </View>
                                                        {
                                                            item.des && (
                                                                <View className="mb-[10px] mt-[10px] px-[10px]">
                                                                    <Text className={darkMode ? item?.des ? (item.des && item.des.length > 100 && item.post === 'status') ? "font-[Poppins-Medium] text-[white] text-[16px]" : (item.post === 'photo') ? "font-[Poppins-Medium] text-[white] text-[14px]" : "font-[Poppins-Medium] text-[white] text-[18px]" : "text-[white] font-[Poppins-Medium] text-[18px]" : item?.des ? (item.des && item.des.length > 100 && item.post === 'status') ? "font-[Poppins-Medium] text-[16px]" : (item.post === 'photo') ? "font-[Poppins-Medium] text-[14px]" : "font-[Poppins-Medium] text-[18px]" : "font-[Poppins-Medium] text-[18px]"}>{item.des}</Text>
                                                                </View>
                                                            )
                                                        }
                                                        {
                                                            item.imgurl && (
                                                                <View className="h-[250px] w-[100%]">
                                                                    <Image resizeMode={"cover"} source={{ uri: item.imgurl }} className=" h-[100%] w-[100%]" />
                                                                </View>
                                                            )
                                                        }
                                                        <View className="flex-row gap-[30]  mx-[10px] py-[20px]">
                                                            <TouchableOpacity className="flex-row gap-[10] items-center" activeOpacity={1} onPress={() => LikePosts(item.id, searchUserUid, user.uid)}>
                                                                <MaterialCommunityIcons name="cards-heart" size={20} color={likedPost.includes(item.id) ? "red" : darkMode ? 'white' : 'black'} />
                                                                <Text className={darkMode ? "font-[Poppins-Medium] text-[white] text-[16px]" : "font-[Poppins-Medium] text-[16px]"}>{item.like}</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity className="flex-row gap-[10] items-center" onPress={() => { setSelectedPost(item.id); commentSheetModalPopUp() }}>
                                                                <MaterialCommunityIcons name="comment-multiple" size={20} color={darkMode ? 'white' : "black"} />
                                                                <Text className={darkMode ? "font-[Poppins-Medium] text-[16px] text-[white]" : "font-[Poppins-Medium] text-[16px]"}>{item.comment}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            })

                                        }
                                    </View>
                                )
                            }
                        </View>
                        {
                            filterdata.length === 0 && (
                                <View className="h-[120px] w-[100%] justify-center items-center">
                                    <Text className="font-[Poppins-Medium] text-[15px]">No File available</Text>
                                </View>
                            )
                        }
                    </ScrollView>
                </View>
                <CommentSheet />
            </Modal>
        </View>
    )
}