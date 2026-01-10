import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, increment, onSnapshot, orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { AllPostType, NewUserModel, PostType } from "../../type/typeCast";
import { db } from "./firebaseConfig";
import { FollowNotificationTrigger, LikeNotificationTrigger } from "./Notification";
import { showErrorToast, showSuccessToast } from "../utils/toast";

//snapshot attach first time if uuid exists and after all the time it will update docs (if changes) Realtime

export const userInfoFetchAndRealTimeUpdate = (user: any, setCurrentuser: (val: NewUserModel) => void) => {
  const userId = user?.uid;
  const userRef = doc(db, 'users', userId);
  const unsubscribe = onSnapshot(userRef, (snap) => {
    if (snap.exists()) {
      const data = snap.data();

      const formattedUser: NewUserModel = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        image: data.image,
        follower: data.follower ?? 0,
        following: data.following ?? 0,
        dob: data.dob ? (data.dob as Timestamp).toDate() : null,
        bio: data.bio ? data.bio : "",
        uploadpost: data.uploadpost ?? 0,
        expoPushToken: data.expoPushToken,
      };
      setCurrentuser(formattedUser);
    }
  })
  return unsubscribe;
}


//Fetch userPosts with userInformation (two table -- (posts)-->post.uid--->to (users)) and added snapshot on PostTable so that 
//if post updated then realtime user show the changes.

export const fetchPostsAndRelatedUserWIthMapping = (setPosts: (val: AllPostType[]) => void) => {
  const q = query(collection(db, "Posts"), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const postsData: AllPostType[] = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const post = docSnap.data() as PostType;
        const userRef = doc(db, "users", post.uuid);
        const userSnap = await getDoc(userRef);
        const userInfo = userSnap.data() as NewUserModel;
        return { ...post, ...userInfo } as AllPostType;
      })
    );

    setPosts(postsData); // replace the old state
  });
  return unsubscribe;
}


//Refresh NewsFeed for latestPost

export const refreshNewsFeed = async (setLoading: (val: boolean) => void, setPosts: (val: AllPostType[]) => void) => {
  try {
    setLoading(true);
    const q = query(collection(db, "Posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const PostData: AllPostType[] = await Promise.all(
      snapshot.docs.map(async (item) => {
        const post = item.data() as PostType;
        const query = doc(db, "users", post.uuid);
        const userSnap = await getDoc(query);
        return {
          ...post,
          ...userSnap.data() as NewUserModel
        } as AllPostType
      })
    )
    setPosts(PostData);

  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false);
  }
}


//Like Manupulation : (updateLike, Like)

export const User_Post_Like = async (postid: string, posterId: string, likerId: string, user: any) => {
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
        if (posterId !== likerId) {
          LikeNotificationTrigger(posterId, likerId, postid)
        }
        await updateDoc(LikeRef, { post: arrayUnion(user?.uid) });
        await updateDoc(postRef, { like: increment(1) });
      }

    }
    else {
      if (posterId !== likerId) {
        LikeNotificationTrigger(posterId, likerId, postid)
      }
      await setDoc(LikeRef, { post: arrayUnion(user?.uid) })
      await updateDoc(postRef, { like: increment(1) });
    }
  } catch (error) {
    console.log(error);
  }
}

//user Following manupulation :

export const User_doing_Follow = async (searchUserid: string, user: any, searchUserUid: string) => {
  const followRef = doc(db, 'Followers', searchUserid);
  const searchUserRef = doc(db, 'users', searchUserid);
  const currentLoginUserRef = doc(db, 'users', user.uid);
  try {
    const followsnap = await getDoc(followRef);
    if (followsnap.exists()) {
      const followingUsers = followsnap.data().following;
      if (followingUsers.includes(user.uid)) {
        await updateDoc(followRef, { following: arrayRemove(user.uid) });
        await updateDoc(currentLoginUserRef, { following: increment(-1) });
        await updateDoc(searchUserRef, { follower: increment(-1) })
      }
      else {
        await updateDoc(followRef, { following: arrayUnion(user.uid) });
        await updateDoc(currentLoginUserRef, { following: increment(1) });
        await updateDoc(searchUserRef, { follower: increment(1) })
        FollowNotificationTrigger(searchUserUid, user.uid);
      }
    }
    else {
      await setDoc(followRef, { following: [user.uid] });
      await updateDoc(currentLoginUserRef, { following: increment(1) });
      await updateDoc(searchUserRef, { follower: increment(-1) })
      FollowNotificationTrigger(searchUserUid, user.uid);
    }
  } catch (error) {
    console.log(error);
  }
}

//comment

export const User_Upload_Comment = async (text: string, selectedPost: string, currentUser: any, user: any) => {
  const commentRef = collection(db, 'comments');
  const postRef = doc(db, "Posts", selectedPost);
  const OwnerUser = {
    name: `${currentUser?.firstName} ${currentUser?.lastName}`,
    image: currentUser?.image,
    text: text,
    id: user?.uid,
    createdAt: serverTimestamp(),
    postid: selectedPost,
  }
  const docRef = await addDoc(commentRef, OwnerUser);

  await updateDoc(doc(db, "comments", docRef.id), {
    commentId: docRef.id,
  });
  await updateDoc(postRef, { comment: increment(1) });
}

//Real time Updating comment:

export const Real_time_updating_comment = (setComments: (val: any[]) => void, selectedPost: string) => {
  const q = query(collection(db, "comments"), where("postid", "==", selectedPost), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const liveComments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setComments(liveComments);
  });
  return unsubscribe;
}

//Fetch Notification from db Real time:

export const Real_time_Notification = (user: any, setNotification: (val: any[]) => void) => {
  const notificationRef = collection(db, "notifications");
  const unsubNotification = onSnapshot(notificationRef, (snapshot) => {
    const notified: any[] = [];
    snapshot.docs.forEach(async (snap) => {
      if (snap.data()?.toUserId === user.uid) {
        const userRef = doc(db, 'users', snap.data()?.fromUserId);
        const userSnap = await getDoc(userRef);
        const userSnapData = userSnap.data()
        const Model = {
          name: `${userSnapData?.firstName} ${userSnapData?.lastName}`,
          image: userSnapData?.image,
          type: snap.data().type
        }
        notified.push(Model);
      }
    });
    setNotification(notified);
  })

  return unsubNotification;
}


//Real Time Like listening:

export const Real_time_Like = (user: any, setLikedPost: (val: any[]) => void) => {
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
}

//Real time updating following:

export const Real_time_Following = (user: any, setFollowedUser: (val: any[]) => void) => {
  const followingRef = collection(db, "Followers");
  const unsubscribe = onSnapshot(followingRef, (snapshot) => {
    const followed: string[] = [];
    snapshot.docs.forEach((snap) => {
      const Data = snap.data().following;
      if (Data.includes(user?.uid)) {
        followed.push(snap.id)
      }
    })
    setFollowedUser(followed);
  });
  return unsubscribe;
}

//search USER:

export const Search_User_Query = (userid: any, unsubscribeRef: any, setSearchUserPost: (val: PostType[]) => void) => {
  if (unsubscribeRef.current) {
    unsubscribeRef.current();
    unsubscribeRef.current = null;
  }
  const postRef = collection(db, "Posts");
  const q = query(postRef, where("uuid", "==", userid), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    let postList: PostType[] = [];
    snapshot.docs.forEach((snap) => {
      const post = snap.data() as PostType;
      postList.push(post);
    });
    setSearchUserPost(postList);
  });
  unsubscribeRef.current = unsubscribe;
}

export const Search_UserInfo_Query = (userid: any, unsubscribeUserRef: any, setSearchUserInfo: (val: NewUserModel) => void) => {
  if (unsubscribeUserRef.current) {
    unsubscribeUserRef.current();
    unsubscribeUserRef.current = null;
  }
  const userRef = doc(db, "users", userid);
  const unsubscribe = onSnapshot(userRef, (userSnap) => {
    if (userSnap.exists()) {
      const userData = userSnap.data() as NewUserModel;
      setSearchUserInfo(userData);
    }
  });
  unsubscribeUserRef.current = unsubscribe;
}


//Current User Update BIO:


export const Update_Bio = async (text: string, user: any) => {
  const UserRef = doc(db, 'users', user.uid);
  await updateDoc(UserRef, { bio: text });
  showSuccessToast('Bio successfully updated')
}

//Like Person's comment:

export const Like_User_comment = async (userId: string, postId: string, commentId: string) => {
  try {
    const commentRef = doc(db, "comment", commentId);
    const commentSnap = await getDoc(commentRef);

    if (!commentSnap.exists()) {
      await setDoc(commentRef, {
        commentid: commentId,
        postid: postId,
        userid: [userId],
        createdAt: serverTimestamp(),
      });
      return;
    }

    const data = commentSnap.data();
    const likedUsers: string[] = data.userid || [];

    if (likedUsers.includes(userId)) {
      await updateDoc(commentRef, { userid: arrayRemove(userId) });
    }
    else {
      await updateDoc(commentRef, { userid: arrayUnion(userId) });
    }
  } catch (error) {
    console.error("Like comment error:", error);
  }
};

//Real time comment of like listening:

export const Real_time_Comment_Like = (user: any, postId: string, setCommentLikedPost: (val: string[]) => void) => {
  if (!user?.uid || !postId) return;

  const commentRef = collection(db, "comment");
  const q = query(commentRef, where("postid", "==", postId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const likedComments: string[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const likedUsers: string[] = data.userid || [];

      if (likedUsers.includes(user.uid)) {
        likedComments.push(doc.id);
      }
    });
    setCommentLikedPost(likedComments);
  });
  return unsubscribe;
};

//Delete comment:

export const deleteComment = async (id: string) => {
  try {
    const commentRef = doc(db, "comments", id);
    await deleteDoc(commentRef);
    showSuccessToast('Comment successfully deleted')
  } catch (error: any) {
    showErrorToast(error)
  }
}
