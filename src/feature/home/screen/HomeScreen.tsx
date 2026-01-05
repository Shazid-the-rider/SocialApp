import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ProfileTitle } from "../../../../shared/components/ProfileTitle";
import HomeComponents from "../components/HomeComponents";
import OthersProfileComponents from "../components/OthersProfileComponents";
import useHomeHooks from "../hooks/useHomeHooks";
import CommentSheet from "../../../../shared/components/CommentSheet";

export default function HomeScreen() {
    const Hooks = useHomeHooks();
    if (!Hooks) {
        return null;
    }
    const { darkMode,setSelectedPost, commentSheetModalPopUp, commentSheetModalPopOut, searchUserUid, Following, followedUser, likedPost, LikePosts, searchUserInfo, owner, visible, setVisible, postType, setPostType, filterdata, user, Allposts, refreshPost, loading, setSearchUserUid, setOwner } = Hooks;
    return (
        <SafeAreaProvider>
            <SafeAreaView className={darkMode ? "flex-1 bg-[rgb(18,18,18)]" : "flex-1 bg-white"}>
                <View className={darkMode ? "flex-1 bg-[rgb(18,18,18)] items-center relative" : "flex-1 bg-white items-center relative"}>
                    <ProfileTitle />
                    <HomeComponents setSelectedPost={setSelectedPost} commentSheetModalPopUp={commentSheetModalPopUp} commentSheetModalPopOut={commentSheetModalPopOut} likedPost={likedPost} LikePosts={LikePosts} darkMode={darkMode} setVisible={setVisible} user={user} Allposts={Allposts} refreshPost={refreshPost} loading={loading} setSearchUserUid={setSearchUserUid} setOwner={setOwner} />
                    {
                        owner === 'other' && (
                            <OthersProfileComponents Following={Following} searchUserUid={searchUserUid} darkMode={darkMode} visible={visible} searchUserInfo={searchUserInfo}
                                setVisible={setVisible} postType={postType} setPostType={setPostType} filterdata={filterdata}
                                likedPost={likedPost} LikePosts={LikePosts} user={user} followedUser={followedUser} commentSheetModalPopUp={commentSheetModalPopUp}
                            />
                        )
                    }
                    <CommentSheet/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}