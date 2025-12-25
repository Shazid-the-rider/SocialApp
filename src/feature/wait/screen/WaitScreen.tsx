import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function WaitScreen() {
    const textAnim1 = useRef(new Animated.Value(0)).current;
    const textAnim2 = useRef(new Animated.Value(0)).current;
    const textAnim3 = useRef(new Animated.Value(0)).current;
    const textAnim4 = useRef(new Animated.Value(0)).current;
    const [show, setShow] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        Animated.sequence([
            Animated.timing(textAnim1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.delay(3000),
            Animated.timing(textAnim2, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.delay(3000),
            Animated.timing(textAnim3, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.delay(6000),
        ]).start(() => {
            setShow(false);
            navigation.navigate('Bottom'as never)
        });
    }, [])
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 pt-[70] pl-[15] bg-white">
                    <Animated.Text className="text-[30px] pb-2 tracking-[-0.2]" style={{ opacity: textAnim1, fontFamily: "Poppins-Bold" }}>Getting things Ready</Animated.Text>
                    <Animated.Text className="text-[24px] pb-1.5 text-[rgba(48,48,48,0.85)]" style={{ opacity: textAnim2, fontFamily: "Poppins-Medium" }}>Setting things up . . .</Animated.Text>
                    <Animated.Text className="text-[20px] text-[rgba(84,84,84,0.85)]" style={{ opacity: textAnim3, fontFamily: "Poppins-Medium" }}>Finishing . . .</Animated.Text>
                    <View className="flex-1 justify-center items-center">
                        {
                            show && (<Image source={require('../../../../assets/gif.gif')} style={{height:100,width:100}}/>)
                        }
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

