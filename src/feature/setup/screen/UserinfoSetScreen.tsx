import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserinfoSet from "../components/UserinfoSet";

export default function UserinfoSetScreen(){
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
              <UserinfoSet/>
            </View>
        </SafeAreaView>
    )
}