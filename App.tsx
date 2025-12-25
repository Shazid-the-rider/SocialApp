import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import LoginSignup from './src/feature/login/screen/LoginSignup';
import UserinfoSetScreen from './src/feature/setup/screen/UserinfoSetScreen';
import UserprofileImageSet from './src/feature/setup/components/UserprofileImageSet';
import SplashScreen from './src/feature/splash/screen/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import UserprofileimageScreen from './src/feature/setup/screen/UserprofileimageScreen';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalContext } from './context/GlobalContext';
import { AuthContext } from './context/AuthContext';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './shared/services/firebaseConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/feature/home/screen/HomeScreen';
import ProfileScreen from './src/feature/profile/screen/ProfileScreen';
import NotificationScreen from './src/feature/notificaton/screen/NotificationScreen';
import SettingScreen from './src/feature/setting/screen/SettingScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from './src/utils/colors';
import WaitScreen from './src/feature/wait/screen/WaitScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import "./global.css";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
interface AuthStackProps {
  user: User | null;
}
function BottomStack() {
  const context = Colors();
  const { blue } = context;
  
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: blue,
        tabBarInactiveTintColor: 'black',
        headerShown: false,
        tabBarStyle:{
          position: 'absolute',
          bottom: 20,
          height: 60,
          width: width - 40,
          marginRight: 20,
          marginLeft: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          borderWidth: 0,
          borderColor: 'white',
          backgroundColor: 'white',

          shadowColor: "#2c2b2bff",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 6,

        },

      })}>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
      <Tab.Screen name='Notification' component={NotificationScreen} />
      <Tab.Screen name='Settings' component={SettingScreen} />
    </Tab.Navigator>
  )
}
function AuthStack({ user }: PropsWithChildren<AuthStackProps>) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={!user ? 'LoginSignup' : 'Bottom'}>
      <Stack.Screen name="LoginSignup" component={LoginSignup} options={{ gestureEnabled: false }} />
      <Stack.Screen name="SetupUserinfo" component={UserinfoSetScreen} />
      <Stack.Screen name="SetupImage" component={UserprofileimageScreen} />
      <Stack.Screen name='Wait' component={WaitScreen} />

      <Stack.Screen name='Bottom' component={BottomStack}/>

    </Stack.Navigator>
  );
}


export default function App() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    });
    return () => clearTimeout(timer);
  }, [])
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return null;
  }
  return (

    <AuthContext.Provider value={{ user }}>
      <GlobalContext>
        <NavigationContainer>
          {showSplash ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
          ) : (
            <AuthStack user={user} />
          )}
        </NavigationContainer>
      </GlobalContext>
    </AuthContext.Provider>
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
