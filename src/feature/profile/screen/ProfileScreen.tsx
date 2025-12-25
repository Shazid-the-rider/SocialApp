
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileActions } from "../components/ProfileActions";
import { PostButton } from "../components/PostButton";
import { PostView } from "../components/PostView";
import { EditProfileSheet } from "../components/EditProfileSheet";
import { CreatePostSheet } from "../components/CreatePostSheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { EditViewImage } from "../components/EditViewImage";
import useProfileHooks from "../Hooks/useProfileHooks";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ProfileTitle } from "../../../../shared/components/ProfileTitle";
import { EditPostStatusSheet } from "../components/EditPostStatusSheet";
import { PostOptionModal } from "../components/PostOptionModal";

const width = Dimensions.get('window').width;
export default function ProfileScreen() {

    const context = useProfileHooks();
    if (!context) {
        return null;
    }

    const { postType, setPostType, selectedImage, setSelectedImage, des, setDes, selectedImageUrl, setSelectedImageUrl, status, setStatus,
        type, setType, message, setMessage, focus, setFocus, posts, setPosts, viewImage, setViewImage, fonts, notify,
        currentUser, notifyPopUp, notifyPopOut,likedPost,LikePosts,
        PickFile, UploadPost, postUid, setPostUid, selectedPost, setSelectedPost, HandlePostDelete, EditPostAnim,
        currentStatus, setCurrentStatus, PostModalPopUp, PostModalPopOut, createPostModal, EditProfileModalPopUp, EditProfileModalPopOut, editProfileModal,
        editPostModal, EditPostModalPopUp, EditPostModalPopOut, editViewImageModal, EditViewImageModalPopUp, EditViewImageModalPopOut, optionModal,  OptionModalPopUp, OptionModalPopOut
    } = context

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-white">
                <View className=" flex-1 w-[100%] bg-white items-center  relative">
                    <ProfileTitle />
                    <ScrollView className="w-[100%] pt-[50px] bg-white " showsVerticalScrollIndicator={false}>
                        <ProfileHeader currentUser={currentUser} />
                        <ProfileActions PostModalPopUp={PostModalPopUp} EditProfileModalPopUp={EditProfileModalPopUp} />
                        <PostButton postType={postType} setPostType={setPostType} />
                        <PostView LikePosts={LikePosts} likedPost={likedPost} OptionModalPopUp={OptionModalPopUp}EditViewImageModalPopUp={EditViewImageModalPopUp} EditPostModalPopUp={EditPostModalPopUp} setCurrentStatus={setCurrentStatus} currentUser={currentUser} HandlePostDelete={HandlePostDelete} posts={posts} setSelectedPost={setSelectedPost} setViewImage={setViewImage} selectedImageUrl={selectedImageUrl} setSelectedImageUrl={setSelectedImageUrl} setPostUid={setPostUid} />
                    </ScrollView>
                    <EditProfileSheet editProfileModal={editProfileModal} EditProfileModalPopOut={EditProfileModalPopOut} />
                    <CreatePostSheet createPostModal={createPostModal} PostModalPopOut={PostModalPopOut} currentUser={currentUser} status={status} message={message} notify={notify} focus={focus} UploadPost={UploadPost} setDes={setDes} setFocus={setFocus} selectedImage={selectedImage} setSelectedImage={setSelectedImage} postType={postType} setType={setType} PickFile={PickFile} des={des} />
                    <EditViewImage viewImage={viewImage} setViewImage={setViewImage} selectedPost={selectedPost} HandlePostDelete={HandlePostDelete} editViewImageModal={editViewImageModal} EditViewImageModalPopOut={EditViewImageModalPopOut} />
                    <EditPostStatusSheet currentUser={currentUser} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} editPostModal={editPostModal} EditPostModalPopOut={EditPostModalPopOut} />
                    <PostOptionModal HandlePostDelete={HandlePostDelete} postUid={postUid} optionModal={optionModal} OptionModalPopOut={OptionModalPopOut} EditPostModalPopUp={EditPostModalPopUp}/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>

    )
}
const styles = StyleSheet.create({
    view: {
        gap: 1.3,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: 'rgba(225, 225, 225, 0.88)',
        backgroundColor: 'rgba(236, 235, 235, 0.29)'
    },
    notify: {
        position: 'absolute',
        bottom: 20,
        width: width / 1.07,
        height: 60,
        backgroundColor: 'white',
        shadowColor: "#2c2b2bff",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10
    }
})