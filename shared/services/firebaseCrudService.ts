import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import { AllPostType, NewUserModel, PostType } from "../../type/typeCast";
import { db } from "./firebaseConfig";

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
        uploadpost: data.uploadpost ?? 0
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

export const fetchPostsOfSearchUser = (setPosts: (val: PostType[]) => void, userid: string) => {
  const postRef = collection(db, "Posts");
  const q = query(postRef, where("uuid", "==", userid), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const postsData: PostType[] = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const post = docSnap.data() as PostType;
        return { ...post } as PostType;
      })
    );

    setPosts(postsData);
  });
  return unsubscribe;
}


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