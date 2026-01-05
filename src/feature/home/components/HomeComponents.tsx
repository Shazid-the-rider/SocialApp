import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AllPostType } from "../../../../type/typeCast";
import { LikeNotificationTrigger } from "../../../../shared/services/Notification";

type Props = {
    setSelectedPost: (val: string) => void;
    Allposts: AllPostType[];
    refreshPost: () => Promise<void>;
    loading: boolean;
    setSearchUserUid: (val: string) => void;
    setOwner: (val: string) => void;
    setVisible: (val: boolean) => void;
    user: any;
    darkMode: boolean;
    LikePosts: (val: string, val1: string, val2: string) => Promise<void>
    likedPost: string[];
    commentSheetModalPopUp: () => void
    commentSheetModalPopOut: () => void
}

export default function HomeComponents({ setSelectedPost, commentSheetModalPopUp, commentSheetModalPopOut, LikePosts, likedPost, darkMode, Allposts, user, refreshPost, loading, setSearchUserUid, setOwner, setVisible }: Props) {

    const navigation = useNavigation();

    return (
        <View className={darkMode ? "h-[100%] w-[95%] bg-[rgb(18,18,18)]" : "h-[100%] w-[95%] bg-white"}>
            {
                !Allposts && (
                    <View className="h-[100%] w-[100%] justify-center items-start">
                        <ActivityIndicator size={'small'} color={darkMode ? 'white' : 'grey'} />
                    </View>
                )
            }
            <FlatList
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={refreshPost}
                data={Allposts}
                initialNumToRender={4}
                renderItem={({ item }) => {
                    const jsDate = item.createdAt ? item.createdAt instanceof Timestamp ? item.createdAt.toDate() : item.createdAt : undefined;
                    return (
                        <View className={darkMode ? "h-[auto] w-[100%] mb-[20px] bg-[rgb(17,17,17)] pt-[15px] pb-[20px] rounded-2xl" : "h-[auto] w-[100%] mb-[20px] bg-white shadow-md shadow-gray-300 pt-[15px] pb-[20px] rounded-2xl"}>
                            <View className="flex-row items-center gap-[10] pb-[20px] px-[10px] ">
                                <Image className="h-[40px] w-[40px] rounded-full" source={{ uri: item.image }} />
                                <TouchableOpacity activeOpacity={.7} onPress={() => {
                                    if (item.uuid === user?.uid) {
                                        setOwner('owner');
                                        navigation.navigate('Profile' as never);
                                    } else {
                                        setSearchUserUid(item.uuid);
                                        setOwner('other');
                                        setVisible(true);
                                    }
                                }}>
                                    <View className="flex-row gap-[5px] items-center">
                                        <Text className={darkMode ? "font-[Poppins-Medium] text-[white] text-[14px]" : "font-[Poppins-Medium] text-[14px]"}>{item.firstName} {item.lastName}</Text>
                                        <MaterialIcons name="verified" size={15} color="blue" />
                                    </View>
                                    <View className="flex-row gap-[10]">
                                        <Text className={darkMode ? "font-[Poppins-Medium] text-[white] text-[12px]" : "font-[Poppins-Medium] text-[12px]"}>{jsDate?.toLocaleDateString([], { weekday: 'short', month: 'short', year: '2-digit', day: '2-digit' }).replace(/,/g, '')}</Text>
                                        <Text className={darkMode ? "font-[Poppins-Medium] text-[white] text-[12px]" : "font-[Poppins-Medium] text-[12px]"}>{jsDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                        <Text className={darkMode ? "font-[Poppins-Medium] text-[12px] text-[white]" : "font-[Poppins-Medium] text-[12px]"}>Public</Text>
                                        <FontAwesome name="globe" size={15} color="grey" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {item.des && <View className="px-[10px] pb-[10px]">
                                <Text className={darkMode ? item?.des ? (item.des && item.des.length > 100 && item.post === 'status') ? "font-[Poppins-Medium] text-[white] text-[16px]" : (item.post === 'photo') ? "font-[Poppins-Medium] text-[white] text-[14px]" : "font-[Poppins-Medium] text-[white] text-[18px]" : "text-[white] font-[Poppins-Medium] text-[18px]" : item?.des ? (item.des && item.des.length > 100 && item.post === 'status') ? "font-[Poppins-Medium] text-[16px]" : (item.post === 'photo') ? "font-[Poppins-Medium] text-[14px]" : "font-[Poppins-Medium] text-[18px]" : "font-[Poppins-Medium] text-[18px]"}>{item.des}</Text>
                            </View>}
                            {item.imgurl && <Image source={{ uri: item.imgurl }} className="h-[250px] w-[100%]" />}
                            <View className="flex-row gap-[30] mt-[20px] px-[10px]">
                                <TouchableOpacity className="flex-row gap-[10] items-center" activeOpacity={1} onPress={() => { LikePosts(item.id, item.uuid, user.uid); }}>
                                    <MaterialCommunityIcons name="cards-heart" size={20} color={likedPost.includes(item.id) ? "red" : darkMode ? 'white' : 'black'} />
                                    <Text className={darkMode ? "font-[Poppins-Medium] text-[white] text-[16px]" : "font-[Poppins-Medium] text-[16px]"}>{item.like}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-row gap-[10] items-center" onPress={() => { setSelectedPost(item.id); commentSheetModalPopUp() }}>
                                    <MaterialCommunityIcons name="comment-multiple" size={20} color={darkMode ? 'white' : "black"} />
                                    <Text className={darkMode ? "font-[Poppins-Medium] text-[white] text-[16px]" : "font-[Poppins-Medium] text-[16px]"}>{item.comment}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}