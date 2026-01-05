import { signOut } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../../../../shared/services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { GlobalContextApi } from "../../../../context/GlobalContext";

export default function useSettingScreenHook() {
    const navigation = useNavigation();
    const context = useContext(GlobalContextApi);
    if (!context) {
        return;
    }
    const { toggleAction } = context;
    const { darkMode } = context;
    const HandleLogOut = async () => {
        Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Log Out",
                style: "default",
                onPress: async () => {
                    try {
                        await signOut(auth);
                        toggleAction("");
                    } catch (error) {
                        console.error("Logout error:", error);
                        Alert.alert("Error", "Could not log out. Please try again.");
                    }
                },
            },
        ]);
    }
    return { HandleLogOut, darkMode }
}