import { Image, Text, View, FlatList, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ProfileTitle } from "../../../../shared/components/ProfileTitle";
import { useContext } from "react";
import { GlobalContextApi } from "../../../../context/GlobalContext";

const { width } = Dimensions.get("window"); // for full width items

export default function NotificationScreen() {
    const context = useContext(GlobalContextApi);
    if (!context) return null;

    const { notification, darkMode } = context;

    return (
        <SafeAreaProvider>
            <SafeAreaView
                className={darkMode ? "flex-1 bg-[rgb(18,18,18)]" : "flex-1 bg-white"}
            >
                <View
                    className={darkMode ? "flex-1 bg-[rgb(18,18,18)]" : "flex-1 bg-white"}
                >
                    {/* Profile Title */}
                    <ProfileTitle />

                    {/* No notifications */}
                    {notification.length === 0 && (
                        <View className="flex-1 justify-center items-center">
                            <Text
                                className={
                                    darkMode
                                        ? "font-[Poppins-Medium] text-gray-400 text-[14px]"
                                        : "font-[Poppins-Medium] text-[14px]"
                                }
                            >
                                No notification available
                            </Text>
                        </View>
                    )}

                    {/* Notifications list */}
                    {notification.length > 0 && (
                        <View style={{ width: width, display: 'flex', alignItems: 'center' }}>
                            <FlatList
                                data={notification}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View
                                        className="flex-row items-center gap-[10] pb-[15px] px-[10] rounded-md"
                                        style={{
                                            width: width * .95,
                                            backgroundColor: darkMode ? "rgb(38,38,38)" : "rgb(255,255,255)",
                                            paddingVertical: 7,
                                            marginBottom: 12,
                                            elevation: 5,
                                            shadowColor: "rgb(100,100,100)",
                                            shadowOffset: { width: 0, height: 1 },
                                            shadowOpacity: 0.10,
                                            shadowRadius: 5,

                                        }}
                                    >
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ height: 40, width: 40, borderRadius: 40 }}
                                        />
                                        <Text
                                            className={darkMode ? "font-[Poppins-Medium] text-white" : "font-[Poppins-Medium]"}
                                            style={{ flexShrink: 1 }} // ensures text wraps instead of overflowing
                                        >
                                            <Text className="font-[Poppins-SemiBold]">{item.name}</Text>{" "}
                                            {item.type === "LIKE"
                                                ? "liked your post"
                                                : "started following you"}
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
