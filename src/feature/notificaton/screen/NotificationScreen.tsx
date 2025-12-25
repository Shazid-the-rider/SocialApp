import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ProfileTitle } from "../../../../shared/components/ProfileTitle";

export default function NotificationScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 bg-white items-center">
                    <ProfileTitle/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}