import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashComponent from "../components/SplashComponents";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function SplashScreen(){
    const navigation = useNavigation();
    useEffect(()=>{
        const interval = setTimeout(()=>{
            navigation.navigate('LoginSignup' as never);
        },14000)

        return ()=>clearInterval(interval);
    },[])
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                <SplashComponent/>
            </View>
        </SafeAreaView>
    )
}