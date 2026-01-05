import { Image, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ProfileTitle } from "../../../../shared/components/ProfileTitle";
import { useContext } from "react";
import { GlobalContextApi } from "../../../../context/GlobalContext";
import { FlatList } from "react-native-gesture-handler";

export default function NotificationScreen() {
    const context = useContext(GlobalContextApi);
    if (!context) {
        return undefined;
    }
    const { notification, darkMode } = context
    return (
        <SafeAreaProvider>
            <SafeAreaView className={darkMode ? "flex-1 bg-[rgb(18,18,18)]" : "flex-1 bg-white"}>
                <View className={darkMode ? "flex-1 bg-[rgb(18,18,18)]" : "flex-1 bg-white"}>
                    <ProfileTitle />
                    {
                        notification.length === 0 && (
                            <View className="flex-1 justify-center items-center">
                                <Text className="font-[Poppins-Medium] text-[14px]">No notification available</Text>
                            </View>
                        )
                    }
                    {
                        notification.length > 0 && (
                            <View className="flex-1 justify-start items-start px-[10]">
                                <FlatList
                                    data={notification}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => {
                                        return (
                                            <View className="flex-row items-center gap-[10] pb-[15px]">
                                                <Image source={{ uri: item.image }} style={{ height: 40, width: 40, borderRadius: 40 }} />
                                                <Text className={darkMode ? "font-[Poppins-Medium] text-[white]" : "font-[Poppins-Medium]"}><Text className="font-[Poppins-SemiBold]">{item.name}</Text>  {item.type === 'LIKE' ? 'liked your post' : 'started following you'}</Text>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        )
                    }
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}