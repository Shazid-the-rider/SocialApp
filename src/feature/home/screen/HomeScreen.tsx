import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ProfileTitle } from "../../../../shared/components/ProfileTitle";
import HomeComponents from "../components/HomeComponents";
import { useContext, useEffect, useState } from "react";
import { GlobalContextApi } from "../../../../context/GlobalContext";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { PostType } from "../../../../type/typeCast";
import { Timestamp } from "firebase/firestore";

export default function HomeScreen() {
    const [visible, setVisible] = useState(false);
    const context = useContext(GlobalContextApi);
    const [postType, setPostType] = useState('photo');
    const [filterdata, setFilterData] = useState<PostType[]>([]);
    if (!context) {
        return undefined;
    }
    const { searchUserUid, likedPost, LikePosts, search_User_And_Find_its_Info, search_User_And_Find_its_Post, searchUserInfo, searchUserpost, owner } = context;
    useEffect(() => {
        if (searchUserUid) {
            search_User_And_Find_its_Info(searchUserUid);
            search_User_And_Find_its_Post(searchUserUid);
        }
    }, [searchUserUid])
    useEffect(() => {
        if (searchUserpost?.length) {
            const filterdData = searchUserpost.filter((item) => item.post === postType);
            console.log(filterdData)
            setFilterData(filterdData);
        }
    }, [postType])
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 bg-white items-center">
                    <ProfileTitle />
                    <HomeComponents setVisible={setVisible} />
                    {
                        owner === 'other' && (
                            <Modal
                                visible={visible}
                                transparent
                            >
                                <View className="w-[100%] h-[86.5%] bg-white absolute bottom-0 justify-center items-center px-[20px] gap-[10]">
                                    <ScrollView className="w-[100%]">
                                        <View className="w-[100%] justify-center items-center">
                                            <View>
                                                <Image source={{ uri: searchUserInfo?.image }} className="h-[200px] w-[200px] rounded-full" />
                                            </View>
                                            <View className="w-[100%] flex-row gap-[3] items-center justify-center">
                                                <Text className="text-[19px] font-[Poppins-Medium]">{searchUserInfo?.firstName} {searchUserInfo?.lastName}</Text>
                                                <MaterialIcons name="verified" size={24} color="blue" />
                                            </View>
                                            <View className="w-[90%] flex-row justify-between pt-[15px]">
                                                <View className="items-center w-[100%/3]">
                                                    <Text className="text-[30px] font-[Poppins-SemiBold]">{searchUserInfo?.follower}</Text>
                                                    <Text className="text-[16px] font-[Poppins-Medium]">Followers</Text>
                                                </View>
                                                <View className="items-center w-[100%/3]">
                                                    <Text className="text-[30px] font-[Poppins-SemiBold]">{searchUserInfo?.follower}</Text>
                                                    <Text className="text-[16px] font-[Poppins-Medium]">Following</Text>
                                                </View>
                                                <View className="items-center w-[100%/3]">
                                                    <Text className="text-[30px] font-[Poppins-SemiBold]">{searchUserInfo?.uploadpost}</Text>
                                                    <Text className="text-[16px] font-[Poppins-Medium]">Posts</Text>
                                                </View>
                                            </View>
                                            <View className="w-[100%] flex-row justify-between mb-[15px] mt-[25px]">
                                                <TouchableOpacity className="w-[45%] bg-black justify-center items-center py-[10px] rounded-xl flex-row gap-[5]">
                                                    <Ionicons name="notifications" size={20} color="white" />
                                                    <Text className="text-[16px] font-[Poppins-Medium] text-[white]">Follow</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity className="w-[45%] bg-blue-600 justify-center items-center py-[10px] rounded-lg flex-row gap-[5]">
                                                    <FontAwesome5 name="facebook-messenger" size={20} color="white" />
                                                    <Text className="text-[16px] font-[Poppins-Medium] text-[white]">Message</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <View className="w-[100%] flex-row justify-between mt-[10px]">
                                                    <TouchableOpacity className={postType === 'photo' ? " w-[30%] flex-row justify-center items-center gap-[6] bg-gray-200  border-gray-100 px-[10px]  py-[7px] rounded-3xl" : "w-[30%] flex-row  justify-center items-center gap-[6] border-2 border-gray-100 px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => setPostType('photo')}>
                                                        <Ionicons name="images-sharp" size={22} color="black" />
                                                        <Text className="text-[15px] font-[Poppins-Medium]">Photos</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity className={postType === 'reel' ? "w-[30%] flex-row justify-center  items-center gap-[6] bg-gray-200  border-gray-100 px-[10px]  py-[7px] rounded-3xl" : "w-[30%] flex-row  justify-center items-center gap-[6] border-2 border-gray-100 px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => setPostType('reel')}>
                                                        <FontAwesome name="video-camera" size={22} color="black" />
                                                        <Text className="text-[15px] font-[Poppins-Medium]">Reel</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity className={postType === 'status' ? "w-[30%] flex-row justify-center  items-center gap-[6] bg-gray-200  border-gray-100 px-[10px]  py-[7px] rounded-3xl" : "w-[30%] flex-row justify-center  items-center gap-[6] border-2 border-gray-100 px-[10px]  py-[7px] rounded-3xl"} activeOpacity={.7} onPress={() => setPostType('status')}>
                                                        <MaterialCommunityIcons name="post" size={22} color="black" />
                                                        <Text className="text-[15px] font-[Poppins-Medium]">Status</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            {
                                                filterdata && (
                                                    <View className="w-[100%]">
                                                        {
                                                            filterdata.map((item, index) => {
                                                                const jsDate = item.createdAt ? item.createdAt instanceof Timestamp ? item.createdAt.toDate() : item.createdAt : undefined;
                                                                return (
                                                                    <View key={index} className="w-[100%] bg-white shadow-sm pb-[5px] pt-[20px] h-[auto] my-[10px] rounded-2xl">
                                                                        <View className="flex-row gap-[10] justify-start px-[6px] mb-[0px]">
                                                                            <View>
                                                                                <Image source={{ uri: searchUserInfo?.image }} className="h-[40px] w-[40px] rounded-full" />
                                                                            </View>
                                                                            <View>
                                                                                <View className="flex-row items-center gap-[10]">
                                                                                    <Text className="font-[Poppins-SemiBold] text-[14px]">{searchUserInfo?.firstName} {searchUserInfo?.lastName}</Text>
                                                                                    <MaterialIcons name="verified" size={15} color="blue" />
                                                                                </View>
                                                                                <View className="flex-row gap-[10] items-center pb-[15px]">
                                                                                    <Text className="font-[Poppins-SemiBold] text-[12px]">{jsDate?.toLocaleDateString([], { weekday: 'short', month: 'short', year: '2-digit', day: '2-digit' }).replace(/,/g, '')}</Text>
                                                                                    <Text className="font-[Poppins-Medium] text-[12px]">{jsDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                                                                    <FontAwesome name="globe" size={17} color="grey" />
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                        {
                                                                            item.des && (
                                                                                <View className="mb-[5px] mt-[15px]">
                                                                                    <Text className={item?.des ? (item.des && item.des.length > 100) ? "font-[Poppins-Medium] text-[16px]" : "font-[Poppins-Medium] text-[22px]" : postType === 'photo' ? "font-[Poppins-Medium] text-[13px]" : "font-[Poppins-Medium] text-[18px]"}>{item.des}</Text>
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
                                                            })

                                                        }
                                                    </View>
                                                )
                                            }
                                        </View>
                                    </ScrollView>
                                </View>

                            </Modal>
                        )
                    }
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}