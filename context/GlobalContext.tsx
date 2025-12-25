import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment, onSnapshot, orderBy, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../shared/services/firebaseConfig";
import { AllPostType, GlobalContextType, NewUserModel, PostType } from "../type/typeCast";
import {fetchPostsAndRelatedUserWIthMapping, fetchPostsOfSearchUser, refreshNewsFeed, userInfoFetchAndRealTimeUpdate } from "../shared/services/firebaseCrudService";


export const GlobalContextApi =
  createContext<GlobalContextType | undefined>(undefined);

export const GlobalContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [newUser, setNewUser] = useState<NewUserModel | undefined>(undefined);
  const [currentUser, setCurrentuser] = useState<NewUserModel | undefined>(undefined); // loggedin user
  const [searchUserInfo, setSearchUserInfo] = useState<NewUserModel | undefined>(undefined);
  const [searchUserpost, setSearchUserPost] = useState<PostType[]>([]);
  const [searchUserUid, setSearchUserUid] = useState<string>("");
  const { user } = useContext(AuthContext);
  const [actionlog, setAction] = useState<string>("");
  const [Allposts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [likedPost, setLikedPost] = useState<string[]>([]);
  const [owner,setOwner]= useState<string>("");

  const unsubscribeRef = useRef<()=>void|null>(null);

  const toggleAction = (id: string) => {
    setAction(id);
  }

  //Current Logged in userInfromation when login or signup dynamic Fetching

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = userInfoFetchAndRealTimeUpdate(user, setCurrentuser);
    return unsubscribe;
  }, [user])

  // to remove signup login variable

  useEffect(() => {
    if (!user) {
      setAction("");
    }
  }, [user])

  useEffect(()=>{
    console.log(owner)
  },[owner])
  //Fetch userPosts with userInformation (two table -- (posts)-->post.uid--->to (users))

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = fetchPostsAndRelatedUserWIthMapping(setPosts);
    return unsubscribe;
  }, [user]);



  //Refresh trigger so that latest data  including userinfo also get:
  const refreshPost = async () => {
    if (!user) {
      return;
    }
    await refreshNewsFeed(setLoading, setPosts);
  }
  //For real time updating Like:

  useEffect(() => {
    if (!user) {
      return;
    }
    const likeRef = collection(db, "Likes");
    const unsubscribe = onSnapshot(likeRef, (snapshot) => {
      const liked: string[] = [];
      snapshot.docs.forEach((snap) => {
        const Data = snap.data().post;
        if (Data.includes(user?.uid)) {
          liked.push(snap.id)
        }
      })
      setLikedPost(liked);
    });

    return unsubscribe;
  }, [user]);



  //LikePosts:

  const LikePosts = async (postid: string) => {
    const LikeRef = doc(db, 'Likes', postid);
    const postRef = doc(db, "Posts", postid);
    try {
      const Likesnap = await getDoc(LikeRef);
      if (Likesnap.exists()) {
        const likedUsers = Likesnap.data().post;
        if (likedUsers.includes(user?.uid)) {
          await updateDoc(LikeRef, { post: arrayRemove(user?.uid) });
          await updateDoc(postRef, { like: increment(-1) });
        }
        else {
          await updateDoc(LikeRef, { post: arrayUnion(user?.uid) });
          await updateDoc(postRef, { like: increment(1) });
        }

      }
      else {
        await setDoc(LikeRef, { post: arrayUnion(user?.uid) })
        await updateDoc(postRef, { like: increment(1) });
      }
    } catch (error) {
      console.log(error);
    }
  }
  const search_User_And_Find_its_Info = async (userid: string) => {
    const userRef = doc(db, 'users', userid);
    const usersnap = await getDoc(userRef);
    if (usersnap) {
      const userData = usersnap.data() as NewUserModel;
      setSearchUserInfo(userData);
    }
  }
  const search_User_And_Find_its_Post = async (userid: string) => {
    /*try {
      const postRef = collection(db, "Posts");
      const q = query(postRef, where("uuid", "==", userid), orderBy("createdAt", "desc"));
      const snapshots = await getDocs(q);
      if (snapshots.docs) {
        let postList: PostType[] = [];
        snapshots.docs.forEach((snap) => {
          const post = snap.data() as PostType;
          postList.push(post);
        });
        setSearchUserPost(postList);
      }

    } catch (error) {
      console.log(error)
    }*/
   if(unsubscribeRef.current){
    return;
   }
   unsubscribeRef.current = fetchPostsOfSearchUser(setPosts,userid);

  }

  return (
    <GlobalContextApi.Provider value={{
      likedPost, LikePosts, loading, refreshPost, Allposts, newUser, setNewUser, actionlog, toggleAction, currentUser, searchUserUid, setSearchUserUid,
      search_User_And_Find_its_Info, search_User_And_Find_its_Post, searchUserInfo, searchUserpost,owner,setOwner
    }}>
      {children}
    </GlobalContextApi.Provider>
  );
};
