import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashComponent from "../components/SplashComponents";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function SplashScreen() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
   
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <SplashComponent />
            </View>
        </SafeAreaView>
    )
}