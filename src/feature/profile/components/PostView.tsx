import { AntDesign, FontAwesome, Foundation, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { PostType } from "../../../../type/typeCast";



type PostViewProps = {
    posts: PostType[];
    setViewImage: (val: boolean) => void;
    selectedImageUrl: string;
    setSelectedImageUrl: (val: string) => void
    setPostUid: (val: string) => void
    setSelectedPost: (val: PostType | undefined) => void,
    HandlePostDelete: (postid: string) => Promise<void>
    currentUser: any,
    setCurrentStatus: (val: string) => void
    EditPostModalPopUp: () => void
    EditViewImageModalPopUp: () => void
    OptionModalPopUp: () => void
    likedPost: string[]
    LikePosts: (id: string) => Promise<void>
}

export const PostView = React.memo(({ LikePosts, likedPost, OptionModalPopUp, EditViewImageModalPopUp, setCurrentStatus, EditPostModalPopUp, currentUser, posts, setViewImage, HandlePostDelete, setSelectedImageUrl, setPostUid, setSelectedPost }: PostViewProps) => {

    return (
        <View className="flex-1 relative">
            <View className="flex-1 px-[10px] mt-[25px]">
                {
                    (posts && posts.length > 0 && posts[0].post === 'photo') && (
                        <View className="flex-row flex-wrap justify-between mx-[10px]">
                            {
                                posts.map((item, index) => {
                                    const jsDate = item.createdAt ? item.createdAt instanceof Timestamp ? item.createdAt.toDate() : item.createdAt : undefined;
                                    return (
                                        <TouchableOpacity key={index} className="w-[100%] bg-white shadow-sm pb-[0px] pt-[20px] h-[auto] my-[10px] rounded-2xl" activeOpacity={.9} onPress={() => { setSelectedPost(item); setPostUid(item.id); setSelectedImageUrl(item.imgurl!); EditViewImageModalPopUp() }}>
                                            <View className="flex-row gap-[10] justify-start px-[6px] mb-[15px]">
                                                <View>
                                                    <Image source={{ uri: currentUser?.image }} className="h-[40px] w-[40px] rounded-full" />
                                                </View>
                                                <View>
                                                    <View className="flex-row items-center gap-[10]">
                                                        <Text className="font-[Poppins-SemiBold] text-[14px]">{currentUser?.firstName} {currentUser?.lastName}</Text>
                                                        <MaterialIcons name="verified" size={15} color="blue" />
                                                    </View>
                                                    <View className="flex-row gap-[10] items-center pb-[15px]">
                                                        <Text className="font-[Poppins-SemiBold] text-[12px]">{jsDate?.toLocaleDateString([], { weekday: 'short', month: 'short', year: '2-digit', day: '2-digit' }).replace(/,/g, '')}</Text>
                                                        <Text className="font-[Poppins-Medium] text-[12px]">{jsDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                                        <FontAwesome name="globe" size={17} color="grey" />
                                                    </View>
                                                </View>
                                            </View>
                                            <View className="h-[250px] w-[100%]">
                                                <Image resizeMode={"cover"} source={{ uri: item.imgurl }} className=" h-[100%] w-[100%]" />
                                            </View>
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
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    )


                }
                {
                    (posts.length === 0) && (
                        <View className="items-center pb-[120px] mt-[20px]">
                            <Text className="font-[Poppins-Medium] text-[15px]">No post available</Text>
                        </View>
                    )
                }
                {
                    (posts && posts.length > 0 && posts[0].post === 'status') && (
                        <View className="flex-1 pb-[100px]">
                            {
                                posts.map((item, index) => {
                                    const jsDate = item.createdAt ? item.createdAt instanceof Timestamp ? item.createdAt.toDate() : item.createdAt : undefined;
                                    return (
                                        <TouchableOpacity key={index} className="px-[15px] h-[auto] bg-white  my-[10px] rounded-3xl mt-[20px] pb-[20px] pt-[30px] shadow-sm" activeOpacity={.9} onLongPress={() => { setCurrentStatus(item?.des!); setPostUid(item.id); OptionModalPopUp() }}>
                                            <View className="flex-row gap-[10] justify-start">
                                                <View>
                                                    <Image source={{ uri: currentUser?.image }} className="h-[40px] w-[40px] rounded-full" />
                                                </View>
                                                <View>
                                                    <View className="flex-row items-center gap-[10]">
                                                        <Text className="font-[Poppins-SemiBold] text-[14px]">{currentUser?.firstName} {currentUser?.lastName}</Text>
                                                        <MaterialIcons name="verified" size={15} color="blue" />
                                                    </View>
                                                    <View className="flex-row gap-[10] items-center pb-[15px]">
                                                        <Text className="font-[Poppins-SemiBold] text-[12px]">{jsDate?.toLocaleDateString([], { weekday: 'short', month: 'short', year: '2-digit', day: '2-digit' }).replace(/,/g, '')}</Text>
                                                        <Text className="font-[Poppins-Medium] text-[12px]">{jsDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                                        <FontAwesome name="globe" size={17} color="grey" />
                                                    </View>
                                                </View>
                                            </View>
                                            <View className="mb-[20px] mt-[15px]">
                                                <Text className={item?.des ? (item.des && item.des.length > 100) ? "font-[Poppins-Medium] text-[16px]" : "font-[Poppins-Medium] text-[22px]" : "font-[Poppins-Medium] text-[18px]"}>{item.des}</Text>
                                            </View>
                                            <View className="flex-row gap-[30] mt-[10px]">
                                                <TouchableOpacity className="flex-row gap-[10] items-center" activeOpacity={1} onPress={() => LikePosts(item.id)}>
                                                    <MaterialCommunityIcons name="cards-heart" size={24} color={likedPost.includes(item.id) ? "red" : 'black'} />
                                                    <Text className="font-[Poppins-SemiBold] text-[16px]">{item.like}</Text>
                                                </TouchableOpacity>
                                                <View className="flex-row gap-[10] items-center">
                                                    <MaterialCommunityIcons name="comment-multiple" size={24} color="black" />
                                                    <Text className="font-[Poppins-SemiBold] text-[16px]">{item.comment}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    )
                }
            </View>

        </View>
    )
})