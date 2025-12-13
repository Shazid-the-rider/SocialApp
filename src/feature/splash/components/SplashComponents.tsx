import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { customFonts } from "../../../utils/fonts";

export default function SplashComponent() {
    const [fonts] = useFonts(customFonts);
    const item1 = useRef(new Animated.Value(0)).current;
    const item2 = useRef(new Animated.Value(0)).current;
    const item3 = useRef(new Animated.Value(0)).current;
    const item4 = useRef(new Animated.Value(0)).current;
    const item5 = useRef(new Animated.Value(0)).current;
    const item6 = useRef(new Animated.Value(0)).current;
    const item7 = useRef(new Animated.Value(0)).current;
    const item8 = useRef(new Animated.Value(0)).current;

    const animate = (anim: any, duration: number) => {
        return Animated.timing(anim, {
            toValue: 1,
            duration,
            useNativeDriver: true
        })
    }
    useEffect(() => {
        Animated.sequence([
            animate(item1, 1000),
            animate(item2, 1000),
            animate(item3, 1000),
            animate(item4, 1000),
            animate(item5, 1000),
            animate(item6, 1000),
            animate(item7, 1000),
            animate(item8, 2000)
        ]).start()
    }, [])

    const Scale = (anim: any) => {
        return [
            {
                scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [.5, 1]
                })
            }
        ]


    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Animated.Text style={{ fontSize: 70, fontWeight: 700, color: 'red', opacity: item1, transform: Scale(item1) }}>ℓ</Animated.Text>
                <Animated.Text style={{ fontSize: 40, fontWeight: 700, color: 'green', opacity: item2, transform: Scale(item2) }}>ｏ</Animated.Text>
                <Animated.Text style={{ fontSize: 40, fontWeight: 700, color: 'yellow', opacity: item3, transform: Scale(item3) }}>ｏ</Animated.Text>
                <Animated.Text style={{ fontSize: 40, fontWeight: 700, opacity: item4, transform: Scale(item4) }}>ｐ</Animated.Text>
                <Animated.Text style={{ fontSize: 40, fontWeight: 700, opacity: item5, transform: Scale(item5) }}>ｉ</Animated.Text>
                <Animated.Text style={{ fontSize: 40, fontWeight: 700, opacity: item6, transform: Scale(item6) }}>ｎ</Animated.Text>
                <Animated.Text style={{ fontSize: 40, fontWeight: 700, color: 'blue', opacity: item7, transform: Scale(item7) }}>ｓ</Animated.Text>
            </View>
            <Animated.Text style={{ opacity: item8, fontSize: 15, fontFamily: 'Poppins-Medium', color: 'rgba(64, 64, 64, 1)' }}>Stay in the <Text style={{ fontSize: 30, fontFamily: 'none', color: 'red' }}>ℓ</Text>oop everywhere </Animated.Text>
        </View>
    )
}