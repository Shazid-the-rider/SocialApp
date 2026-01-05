import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileActions } from "../components/ProfileActions";
import { PostButton } from "../components/PostButton";
import { PostView } from "../components/PostView";
import { EditProfileSheet } from "../components/EditProfileSheet";
import { CreatePostSheet } from "../components/CreatePostSheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { EditViewImage } from "../components/EditViewImage";
import useProfileHooks from "../Hooks/useProfileHooks";
import { Dimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ProfileTitle } from "../../../../shared/components/ProfileTitle";
import { EditPostStatusSheet } from "../components/EditPostStatusSheet";
import { PostOptionModal } from "../components/PostOptionModal";
import CommentSheet from "../../../../shared/components/CommentSheet";


const width = Dimensions.get('window').width;
export default function ProfileScreen() {

    const context = useProfileHooks();
    if (!context) {
        return null;
    }

    const { userBio, commentSheetModalPopUp, updatePost, darkMode, postType, setPostType, selectedImage, setSelectedImage, des, setDes, selectedImageUrl, setSelectedImageUrl, status,
        setType, message, focus, setFocus, posts, viewImage, setViewImage, notify,
        currentUser, likedPost, LikePosts, user,
        PickFile, UploadPost, postUid, setPostUid, selectedPost, setSelectedPost, HandlePostDelete,
        currentStatus, setCurrentStatus, PostModalPopUp, PostModalPopOut, createPostModal, EditProfileModalPopUp, EditProfileModalPopOut, editProfileModal,
        editPostModal, EditPostModalPopUp, EditPostModalPopOut, editViewImageModal, EditViewImageModalPopUp, EditViewImageModalPopOut, optionModal, OptionModalPopUp, OptionModalPopOut
    } = context
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-white">
                <View className={darkMode ? " flex-1 w-[100%] bg-[rgb(18,18,18)] items-center  relative" : " flex-1 w-[100%] bg-white items-center  relative"}>
                    <ProfileTitle />
                    <ScrollView className={darkMode ? "w-[100%] pt-[50px] bbg-[rgb(18,18,18)] " : "w-[100%] pt-[50px] bg-white "} showsVerticalScrollIndicator={false}>
                        <ProfileHeader currentUser={currentUser} darkMode={darkMode} />
                        <ProfileActions PostModalPopUp={PostModalPopUp} darkMode={darkMode} EditProfileModalPopUp={EditProfileModalPopUp} />
                        <PostButton postType={postType} setPostType={setPostType} darkMode={darkMode} />
                        <PostView user={user} commentSheetModalPopUp={commentSheetModalPopUp} darkMode={darkMode} LikePosts={LikePosts} likedPost={likedPost} OptionModalPopUp={OptionModalPopUp} EditViewImageModalPopUp={EditViewImageModalPopUp} EditPostModalPopUp={EditPostModalPopUp} setCurrentStatus={setCurrentStatus} currentUser={currentUser} HandlePostDelete={HandlePostDelete} posts={posts} setSelectedPost={setSelectedPost} setViewImage={setViewImage} selectedImageUrl={selectedImageUrl} setSelectedImageUrl={setSelectedImageUrl} setPostUid={setPostUid} />
                    </ScrollView>
                    <EditProfileSheet userBio={userBio} darkMode={darkMode} editProfileModal={editProfileModal} EditProfileModalPopOut={EditProfileModalPopOut} />
                    <CreatePostSheet darkMode={darkMode} createPostModal={createPostModal} PostModalPopOut={PostModalPopOut} currentUser={currentUser} status={status} message={message} notify={notify} focus={focus} UploadPost={UploadPost} setDes={setDes} setFocus={setFocus} selectedImage={selectedImage} setSelectedImage={setSelectedImage} postType={postType} setType={setType} PickFile={PickFile} des={des} />
                    <EditViewImage updatePost={updatePost} darkMode={darkMode} viewImage={viewImage} setViewImage={setViewImage} selectedPost={selectedPost} HandlePostDelete={HandlePostDelete} editViewImageModal={editViewImageModal} EditViewImageModalPopOut={EditViewImageModalPopOut} />
                    <EditPostStatusSheet postUid={postUid} updatePost={updatePost} darkMode={darkMode} currentUser={currentUser} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} editPostModal={editPostModal} EditPostModalPopOut={EditPostModalPopOut} />
                    <PostOptionModal darkMode={darkMode} HandlePostDelete={HandlePostDelete} postUid={postUid} optionModal={optionModal} OptionModalPopOut={OptionModalPopOut} EditPostModalPopUp={EditPostModalPopUp} />
                    <CommentSheet />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>

    )
}
