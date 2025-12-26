import { StyleSheet, Text, View } from "react-native";
import SettingPageComponents from "../components/SettingPageComponents";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useSettingScreenHook from "../hooks/useSettingScreenHook";

export default function SettingScreen(){
    const {HandleLogOut,darkMode} = useSettingScreenHook();

    return(
       <SafeAreaProvider>
        <SafeAreaView className={darkMode?"flex-1 bg-black":"flex-1 bg-white"}>
        <View className={darkMode?"flex-1 bg-black":"flex-1 bg-white"}>
            <SettingPageComponents HandleLogOut={HandleLogOut}/>
        </View>
        </SafeAreaView>
       </SafeAreaProvider>
    )
}
