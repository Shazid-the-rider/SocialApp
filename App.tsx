import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginSignup from './src/feature/login/screen/LoginSignup';
import UserinfoSetScreen from './src/feature/setup/screen/UserinfoSetScreen';
import UserprofileImageSet from './src/feature/setup/components/UserprofileImageSet';
import SplashScreen from './src/feature/splash/screen/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import UserprofileimageScreen from './src/feature/setup/screen/UserprofileimageScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack= createStackNavigator();
function StackFunction(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='SplashScreen'>
      <Stack.Screen name='LoginSignup' component={LoginSignup}/>
      <Stack.Screen name='SetupUserinfo' component={UserinfoSetScreen}/>
      <Stack.Screen name='SetupImage' component={UserprofileimageScreen}/>
      <Stack.Screen name='SplashScreen'component={SplashScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StackFunction/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
