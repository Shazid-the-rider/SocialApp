import { useContext, useEffect, useState } from "react";
import { GlobalContextApi } from "../../../../context/GlobalContext";
import { PostType } from "../../../../type/typeCast";
import { AuthContext } from "../../../../context/AuthContext";

export default function useHomeHooks() {
    const [visible, setVisible] = useState(false);
    const context = useContext(GlobalContextApi);
    const [postType, setPostType] = useState('photo');
    const [filterdata, setFilterData] = useState<PostType[]>([]);
    const { user } = useContext(AuthContext);
    if (!context) {
        return undefined;
    }
    const { darkMode, Following, followedUser,setSelectedPost, commentSheetModalPopUp, commentSheetModalPopOut, searchUserUid, likedPost, Allposts, refreshPost, loading, LikePosts, setSearchUserUid, setOwner, search_User_And_Find_its_Info, search_User_And_Find_its_Post, searchUserInfo, searchUserpost, owner } = context;
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
    }, [searchUserpost, postType])
    return {
        darkMode, Following, searchUserUid, likedPost, LikePosts, search_User_And_Find_its_Info, search_User_And_Find_its_Post, searchUserInfo, searchUserpost, owner,
        visible, setVisible, postType, setPostType, filterdata, setFilterData, user, Allposts, refreshPost, loading, setSearchUserUid, setOwner, followedUser,
        commentSheetModalPopUp, commentSheetModalPopOut,setSelectedPost
    }
}