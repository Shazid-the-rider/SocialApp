import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { AuthContext } from './context/AuthContext';
import { GlobalContext, GlobalContextApi } from './context/GlobalContext';
import { auth, db } from './shared/services/firebaseConfig';
import HomeScreen from './src/feature/home/screen/HomeScreen';
import LoginSignup from './src/feature/login/screen/LoginSignup';
import NotificationScreen from './src/feature/notificaton/screen/NotificationScreen';
import ProfileScreen from './src/feature/profile/screen/ProfileScreen';
import SettingScreen from './src/feature/setting/screen/SettingScreen';
import UserinfoSetScreen from './src/feature/setup/screen/UserinfoSetScreen';
import UserprofileimageScreen from './src/feature/setup/screen/UserprofileimageScreen';
import SplashScreen from './src/feature/splash/screen/SplashScreen';
import WaitScreen from './src/feature/wait/screen/WaitScreen';

import { doc, setDoc } from 'firebase/firestore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import ChatList from './shared/screen/ChatList';
import { registerForPushNotificationsAsync } from './shared/services/Notification';
import * as Notifications from 'expo-notifications';
import { addNotificationReceivedListener, addNotificationResponseReceivedListener } from './shared/services/Notification';
import "./global.css";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const width = Dimensions.get('window').width;
interface AuthStackProps {
  user: User | null;
}
function BottomStack() {
  const context = useContext(GlobalContextApi);
  if (!context) {
    return undefined;
  }
  const { darkMode, notification } = context;

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
        tabBarActiveTintColor: darkMode ? 'white' : 'black',
        tabBarInactiveTintColor: darkMode ? 'grey' : 'black',
        headerShown: false,
        tabBarStyle: {
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
          borderColor: darkMode ? 'none' : 'white',
          backgroundColor: darkMode ? 'rgb(19,19,19)' : 'white',
          shadowColor: "#2c2b2bff",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 6,

        },

      })}>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
      <Tab.Screen name='Notification' component={NotificationScreen}
        options={{
          tabBarBadge: notification.length > 0 ? notification.length : 0,
          tabBarBadgeStyle: {
            backgroundColor: notification.length === 0 ? 'transparent' : 'red',
            color: 'white',
            fontSize: 11,
            fontFamily: 'Poppins-Medium'
          },
        }} />
      <Tab.Screen name='Settings' component={SettingScreen} />
    </Tab.Navigator>
  )
}
function AuthStack({ user }: PropsWithChildren<AuthStackProps>) {
  const context = useContext(GlobalContextApi);
  if (!context) {
    return undefined;
  }
  const { actionlog, currentUser } = context;
  const isSetupComplete = currentUser && currentUser.firstName && currentUser.image;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={user ? ((actionlog === 'signup' || !isSetupComplete) ? 'SetupUserinfo' : 'Bottom') : 'LoginSignup'}>
      {!user ? (
        <Stack.Screen
          name="LoginSignup"
          component={LoginSignup}
          options={{ gestureEnabled: false }}
        />
      ) : (actionlog === 'signup' || !isSetupComplete) ? (
        <>
          <Stack.Screen name="SetupUserinfo" component={UserinfoSetScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="SetupImage" component={UserprofileimageScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Wait" component={WaitScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Bottom" component={BottomStack} />
          <Stack.Screen name="ChatList" component={ChatList} />
        </>
      ) : (
        <>
          <Stack.Screen name="Bottom" component={BottomStack} />
          <Stack.Screen name="ChatList" component={ChatList} />
        </>
      )}

    </Stack.Navigator>
  );
}


export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [])


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (usr) => {
      setUser(usr);
      setLoading(false);
      if (usr) {
        const token = await registerForPushNotificationsAsync();

        if (token) {
          await setDoc(
            doc(db, "users", usr.uid),
            { expoPushToken: token },
            { merge: true }
          );
        }
      }
    });

    return unsub;
  }, []);

  // Notification listeners
  useEffect(() => {
    // Handle notifications when received
    notificationListener.current = addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
      // You can add custom handling here
    });

    // Listen for notification interactions
    responseListener.current = addNotificationResponseReceivedListener(response => {
      console.log('Notification response received:', response);
      // You can add custom handling here
    });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return (

    <SafeAreaProvider>
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
          <Toast />
        </GlobalContext>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}


