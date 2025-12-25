import { StyleSheet, Text, View } from "react-native";
import SettingPageComponents from "../components/SettingPageComponents";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useSettingScreenHook from "../hooks/useSettingScreenHook";

export default function SettingScreen(){
    const {HandleLogOut} = useSettingScreenHook();
    return(
       <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <SettingPageComponents HandleLogOut={HandleLogOut}/>
        </View>
        </SafeAreaView>
       </SafeAreaProvider>
    )
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    safeArea:{
        flex:1,
        backgroundColor:'white'
    }
})