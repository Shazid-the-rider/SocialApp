import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, deleteDoc, doc, increment, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Animated, Dimensions, Linking } from "react-native";
import { AuthContext } from "../../../../context/AuthContext";
import { GlobalContextApi } from "../../../../context/GlobalContext";
import { db } from "../../../../shared/services/firebaseConfig";
import { uploadToCloudinary } from "../../../../shared/services/uploadToCloudinary";
import { PostType } from "../../../../type/typeCast";
import { customFonts } from "../../../utils/fonts";
import { showErrorToast, showSuccessToast } from "../../../../shared/utils/toast";

const height = Dimensions.get('window').height;


export default function useProfileHooks() {


    const { user } = useContext(AuthContext); //Authnetication check 

    const [postType, setPostType] = useState<string>('photos') //conditional toogling of buttons

    const [selectedImage, setSelectedImage] = useState<string>(""); // selected image for uploading to Firebase

    const [des, setDes] = useState<string>(""); //social media Status

    const [selectedImageUrl, setSelectedImageUrl] = useState<string>(""); // for large scale view

    const [status, setStatus] = useState(false); // after uploading post success message

    const [type, setType] = useState("photo");// types that i want to acess from gallery

    const [focus, setFocus] = useState(false); // Large Scale TextInput view

    const notify = useRef(new Animated.Value(-height)).current; // Notifaction anim for any message

    const [posts, setPosts] = useState<PostType[]>([]); // firebase data structure

    const [loading, setLoading] = useState(true); // normally loading status for page

    const context = useContext(GlobalContextApi); // global context for some data

    const [viewImage, setViewImage] = useState<boolean>(false); //image large scale visible status 

    const [fonts] = useFonts(customFonts); //custom fonts

    const EditPostAnim = useRef(new Animated.Value(-height)).current; // edit post anim

    const [postUid, setPostUid] = useState<string>(""); // select post uuid for Crud operation

    const [selectedPost, setSelectedPost] = useState<PostType | undefined>(undefined); // passing selected post

    const [currentStatus, setCurrentStatus] = useState<string>(""); //For updating post 

    const [createPostModal, setCreatePostModal] = useState(false);

    const [editProfileModal, setEditProfileModal] = useState(false);

    const [editPostModal, setEditPostModal] = useState(false);

    const [editViewImageModal, setEditViewImageModal] = useState(false);

    const [optionModal, setOptionModal] = useState(false);

    // Real time data fetching by dynamic prop

    useEffect(() => {
        let q;
        if (postType === 'photos') {
            q = query(collection(db, 'Posts'), where("post", "==", "photo"), where("uuid", "==", user?.uid), orderBy("createdAt", "desc"))
        }
        if (postType === 'reel') {
            q = query(collection(db, 'Posts'), where("post", "==", "reel"), where("uuid", "==", user?.uid), orderBy("createdAt", "desc"))
        }
        if (postType === 'status') {
            q = query(collection(db, 'Posts'), where("post", "==", "status"), where("uuid", "==", user?.uid), orderBy("createdAt", "desc"))
        }

        if (!q) {
            return;
        }
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<PostType, "id">)
            }));
            setPosts(list);
            setLoading(false);
        });

        return () => unsubscribe()
    }, [postType])



    
    const PostModalPopUp = () => {
        setCreatePostModal(true);
    }
    const PostModalPopOut = () => {
        setCreatePostModal(false);
    }
    const EditPostModalPopUp = () => {
        setEditPostModal(true);
    }
    const EditPostModalPopOut = () => {
        setEditPostModal(false);
    }
    const EditProfileModalPopUp = () => {
        setEditProfileModal(true);
    }
    const EditProfileModalPopOut = () => {
        setEditProfileModal(false);
    }
    const EditViewImageModalPopUp = () => {
        setEditViewImageModal(true);
    }
    const EditViewImageModalPopOut = () => {
        setEditViewImageModal(false);
    }
    const OptionModalPopUp = () => {
        setOptionModal(true)
    }
    const OptionModalPopOut = () => {
        setOptionModal(false)
    }

    if (!fonts) {
        return null;
    }

    //select image for uploading 

    const PickFile = async () => {
        const { status, canAskAgain } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status === "denied" && !canAskAgain) {
            return Alert.alert(
                "Permission Required",
                "Camera access is blocked. Please enable it from settings.",
                [
                    { text: 'Cancel' },
                    { text: 'Open Settings', onPress: () => Linking.openSettings() }
                ]
            )
        }
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted === false) {
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: type === 'photo' ? ['images'] : ['videos'],
            allowsEditing: true,
            quality: .7
        })
        console.log(result);
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    }

    // upload post to social media via Firbase

    const UploadPost = async () => {
        if (!user) {
            return;
        }
        const net = await NetInfo.fetch()
        if (!net.isConnected) {
            setStatus(false);
            showErrorToast('No internet connection')
            return;
        }
        try {
            let imageUrl = "";
            if (selectedImage) {
                imageUrl = await uploadToCloudinary(selectedImage);
            }
            const newPost: PostType = {
                id: "",
                des: des.trim() !== "" ? des : "",
                imgurl: imageUrl,
                uuid: user.uid,
                createdAt: new Date(),
                like: 0,
                comment: 0,
                post: selectedImage ? type === 'photo' ? 'photo' : 'reel' : 'status'
            }
            setStatus(true);
            const docRef = await addDoc(collection(db, 'Posts'), newPost);
            await updateDoc(doc(db, "Posts", docRef.id), {
                id: docRef.id
            });
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                uploadpost: increment(1)
            });
            setDes("");
            setSelectedImage("");
            imageUrl = "";
            showSuccessToast('Post successfuly uploaded')

        } catch (e: any) {
            showErrorToast(e.message);
        }
    }


    if (!context) {
        return null;
    }
    const { currentUser, likedPost, LikePosts, darkMode, updatePost,commentSheetModalPopUp ,userBio} = context;

    //Delete post from social Media 

    const HandlePostDelete = async (postid: string) => {
        if (!user) {
            return;
        }
        const net = await NetInfo.fetch()
        if (!net.isConnected) {
            setStatus(false);
            showErrorToast('No internet connection')
            return;
        }
        const postRef = doc(db, "Posts", postid);
        await deleteDoc(postRef);
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            uploadpost: increment(-1)
        });
        showSuccessToast('Successfully post deleted')
    }

    return {

        commentSheetModalPopUp, updatePost, darkMode, user, postType, setPostType, selectedImage, setSelectedImage, des, setDes, selectedImageUrl, setSelectedImageUrl, status, setStatus,
        type, setType, focus, setFocus, posts, setPosts, viewImage, setViewImage, fonts, notify,
        currentUser, PickFile, UploadPost, postUid, setPostUid, selectedPost, setSelectedPost, HandlePostDelete, EditPostAnim,
        currentStatus, setCurrentStatus, PostModalPopUp, PostModalPopOut, createPostModal, EditProfileModalPopUp, EditProfileModalPopOut,
        editProfileModal, editPostModal, EditPostModalPopUp, EditPostModalPopOut, editViewImageModal, EditViewImageModalPopOut, EditViewImageModalPopUp,
        optionModal, OptionModalPopUp, OptionModalPopOut, likedPost, LikePosts,userBio
    }

}