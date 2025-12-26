export type PostType = {
    id: string;
    des?: string | "";
    imgurl?: string | "";
    uuid: string | "";
    createdAt: Date | null;
    like: number | 0;
    comment: number | 0;
    post: string;
};

export type NewUserModel = {
    firstName: string;
    lastName: string;
    dob: Date | null;
    gender: string;
    image?: string;
    email: string;
    follower?: number | 0;
    following?: number | 0;
    bio?: "";
    uploadpost: number | 0;

};

export type GlobalContextType = {
    newUser: NewUserModel | undefined;
    currentUser: NewUserModel | undefined;
    setNewUser: React.Dispatch<React.SetStateAction<NewUserModel | undefined>>;
    toggleAction: (id: string) => void;
    actionlog: string;
    Allposts: any;
    refreshPost: () => Promise<void>;
    loading: boolean;
    LikePosts: (postid: string) => Promise<void>
    likedPost: string[];
    searchUserUid: string;
    setSearchUserUid: (val: string) => void;
    search_User_And_Find_its_Info: (val: string) => void;
    search_User_And_Find_its_Post: (val: string) => void;
    searchUserInfo: NewUserModel|undefined;
    searchUserpost: PostType[];
    owner:string;
    setOwner:(val:string)=>void;
    darkMode:boolean;
    setDarkMode:(val:boolean)=>void
};

export type AllPostType = {
    firstName: string;
    lastName: string;
    dob: Date | null;
    gender: string;
    image?: string;
    email: string;
    follower?: number | 0;
    following?: number | 0;
    bio?: "";
    uploadpost: number | 0;
    id: string;
    des?: string | "";
    imgurl?: string | "";
    uuid: string | "";
    createdAt: Date | null;
    like: number | 0;
    comment: number | 0;
    post: string;
}
