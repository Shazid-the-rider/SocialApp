import { useContext } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { GlobalContextApi } from "../../../../context/GlobalContext";
import { AntDesign, EvilIcons, FontAwesome, Foundation, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Timestamp } from "firebase/firestore";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function HomeComponents({ setVisible }: { setVisible: (val: boolean) => void }) {
    const context = useContext(GlobalContextApi);
    if (!context) {
        return undefined;
    }
    const navigation = useNavigation();
    const { Allposts, refreshPost, loading, LikePosts, likedPost, setSearchUserUid, setOwner, owner } = context
    const { user } = useContext(AuthContext);
    return (
        <View className="h-[100%] w-[95%]">
            <FlatList
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={refreshPost}
                data={Allposts}
                renderItem={({ item }) => {
                    const jsDate = item.createdAt ? item.createdAt instanceof Timestamp ? item.createdAt.toDate() : item.createdAt : undefined;
                    return (
                        <View className="h-[auto] w-[100%] mb-[20px] bg-white shadow-md shadow-gray-300 pt-[15px] pb-[20px] rounded-2xl">
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
                                        <Text className="font-[Poppins-SemiBold] text-[14px]">{item.firstName} {item.lastName}</Text>
                                        <MaterialIcons name="verified" size={15} color="blue" />
                                    </View>
                                    <View className="flex-row gap-[10]">
                                        <Text className="font-[Poppins-SemiBold] text-[12px]">{jsDate?.toLocaleDateString([], { weekday: 'short', month: 'short', year: '2-digit', day: '2-digit' }).replace(/,/g, '')}</Text>
                                        <Text className="font-[Poppins-Medium] text-[12px]">{jsDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                        <Text className="font-[Poppins-Medium] text-[12px]">Public</Text>
                                        <FontAwesome name="globe" size={15} color="grey" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {item.des && <View className="px-[10px] pb-[10px]">
                                <Text className={item?.des ? (item.des && item.des.length > 100 && item.post === 'status') ? "font-[Poppins-Medium] text-[16px]" : (item.post === 'photo') ? "font-[Poppins-Medium] text-[14px]" : "font-[Poppins-Medium] text-[18px]" : "font-[Poppins-Medium] text-[18px]"}>{item.des}</Text>
                            </View>}
                            {item.imgurl && <Image source={{ uri: item.imgurl }} className="h-[250px] w-[100%]" />}
                            <View className="flex-row gap-[30] mt-[20px] px-[10px]">
                                <TouchableOpacity className="flex-row gap-[10] items-center" activeOpacity={1} onPress={() => LikePosts(item.id)}>
                                    <MaterialCommunityIcons name="cards-heart" size={24} color={likedPost.includes(item.id) ? "red" : 'black'} />
                                    <Text className="font-[Poppins-SemiBold] text-[16px]">{item.like}</Text>
                                </TouchableOpacity>
                                <View className="flex-row gap-[10] items-center">
                                    <MaterialCommunityIcons name="comment-multiple" size={24} color="black" />
                                    <Text className="font-[Poppins-SemiBold] text-[16px]">{item.comment}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => item.id.toString()}
            />
        </View>
    )
}