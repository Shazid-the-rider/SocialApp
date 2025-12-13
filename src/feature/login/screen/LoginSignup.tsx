import { View } from "react-native";
import LoginTheme from "../components/LoginTheme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginSignup() {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{ flex: 1 }}>
                <LoginTheme />
            </View>
        </SafeAreaView>
    )
}