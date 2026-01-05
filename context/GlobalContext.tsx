import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { db } from "../shared/services/firebaseConfig";
import { fetchPostsAndRelatedUserWIthMapping, Real_time_Following, Real_time_Like, Real_time_Notification, Real_time_updating_comment, refreshNewsFeed, Search_User_Query, Search_UserInfo_Query, Update_Bio, User_doing_Follow, User_Post_Like, User_Upload_Comment, userInfoFetchAndRealTimeUpdate } from "../shared/services/firebaseCrudService";
import { AllPostType, chatUserModel, GlobalContextType, NewUserModel, PostType } from "../type/typeCast";
import { AuthContext } from "./AuthContext";


export const GlobalContextApi =
  createContext<GlobalContextType | undefined>(undefined);

export const GlobalContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [commentSheet, setCommentSheet] = useState(false);
  const [newUser, setNewUser] = useState<NewUserModel | undefined>(undefined);
  const [currentUser, setCurrentuser] = useState<NewUserModel | undefined>(undefined); // loggedin user
  const [searchUserInfo, setSearchUserInfo] = useState<NewUserModel | undefined>(undefined);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<string>("");
  const [searchUserpost, setSearchUserPost] = useState<PostType[]>([]);
  const [searchUserUid, setSearchUserUid] = useState<string>("");
  const [notification, setNotification] = useState<any[]>([]);
  const { user } = useContext(AuthContext);
  const [actionlog, setAction] = useState<string>("login");
  const [Allposts, setPosts] = useState<AllPostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [likedPost, setLikedPost] = useState<string[]>([]);
  const [owner, setOwner] = useState<string>("");
  const [followedUser, setFollowedUser] = useState<string[]>([]);
  const [visible, setVisible] = useState(false); //chat modal
  const unsubscribeRef = useRef<() => void | null>(null);
  const unsubscribeUserRef = useRef<() => void | null>(null);
  const [usersForChat, setUsersForChat] = useState<chatUserModel[]>([]);

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

  useEffect(() => {
    console.log(owner)
  }, [owner])




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
    const unsubscribe = Real_time_Like(user, setLikedPost);
    return unsubscribe;
  }, [user]);


  // real time updating following button :

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = Real_time_Following(user, setFollowedUser);

    return unsubscribe;
  }, [user]);


  //fetch notifications from db (follow,like)

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubNotification = Real_time_Notification(user, setNotification);
    return unsubNotification
  }, [user])



  //LikePosts:

  const LikePosts = async (postid: string, posterId: string, likerId: string) => {
    if (!user) {
      return;
    }
    await User_Post_Like(postid, posterId, likerId, user);
  }



  //search user and its info

  const search_User_And_Find_its_Info = async (userid: string) => {
    Search_UserInfo_Query(userid, unsubscribeUserRef, setSearchUserInfo);
  }




  // Real-time listener for searched user's posts

  const search_User_And_Find_its_Post = (userid: string) => {
    Search_User_Query(userid, unsubscribeRef, setSearchUserPost);
  }


  //Post Edit & update....

  const updatePost = async (postid: string, status: string) => {
    try {
      const postRef = doc(db, "Posts", postid);
      await updateDoc(postRef, {
        des: status,
      });
    }
    catch (e) {
      console.error("Error updating post:", e);
    }
  }

  //Following others

  const Following = async (searchUserid: string) => {
    if (!user || !user.uid) {
      return;
    }
    await User_doing_Follow(searchUserid, user, searchUserUid);
  }

  //CommentSheetModal

  const commentSheetModalPopUp = () => {
    setCommentSheet(true);
  }
  const commentSheetModalPopOut = () => {
    setCommentSheet(false);
  }


  //Comment of a Post :

  const UploadComment = async (text: string) => {
    if (!user) {
      return;
    }
    await User_Upload_Comment(text, selectedPost, currentUser, user);
  }

  //real time updating comment

  useEffect(() => {
    if (!selectedPost) return;

    const unsubscribe = Real_time_updating_comment(setComments, selectedPost);

    return () => unsubscribe();
  }, [selectedPost]);

  // updateBio :

  const userBio = (text: string)=>{
    if (!user) {
      return;
    }
    Update_Bio(text, user);
  }

  return (
    <GlobalContextApi.Provider value={{
      commentSheetModalPopOut, commentSheetModalPopUp, commentSheet, setSelectedPost, comments, UploadComment,
      Following, updatePost, likedPost, LikePosts, loading, darkMode, setDarkMode, refreshPost, Allposts, newUser, setNewUser, actionlog, toggleAction, currentUser, searchUserUid, setSearchUserUid,
      search_User_And_Find_its_Info, search_User_And_Find_its_Post, searchUserInfo, searchUserpost, owner, setOwner, followedUser, visible, usersForChat,
      setUsersForChat,userBio, notification, setNotification, setSearchUserInfo, setSearchUserPost, setCurrentuser, setLikedPost, setFollowedUser
    }}>
      {children}
    </GlobalContextApi.Provider>
  );
};
