import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserprofileImageSet from "../components/UserprofileImageSet";

export default function UserprofileimageScreen(){
    return(
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <UserprofileImageSet/>
        </View>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    }
})