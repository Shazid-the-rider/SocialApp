import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { customFonts } from "../../../utils/fonts";

export default function SplashComponent() {
    const [fonts] = useFonts(customFonts);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: 40, fontWeight: 700, }}>L</Text>
                <Text style={{ fontSize: 40, fontWeight: 700, }}>o</Text>
                <Text style={{ fontSize: 40, fontWeight: 700, }}>o</Text>
                <Text style={{ fontSize: 40, fontWeight: 700, }}>p</Text>
                <Text style={{ fontSize: 40, fontWeight: 700, }}>i</Text>
                <Text style={{ fontSize: 40, fontWeight: 700, }}>n</Text>
                <Text style={{ fontSize: 40, fontWeight: 700, }}>s</Text>
            </View>
        </View>
    )
}