import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import { customFonts } from "../../../utils/fonts";
import { useFonts } from "expo-font";
import { Alert, Animated, Dimensions } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../shared/services/firebaseConfig";
import { GlobalContextApi } from "../../../../context/GlobalContext";
import { AuthContext } from "../../../../context/AuthContext";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function useLoginHooks() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpassword, setcPassword] = useState<string>("");
    const [success, setSuccess] = useState<string>("Sign up successful")
    const navigation = useNavigation();
    const [action, setAction] = useState('login');
    const [visible, setVisible] = useState(false);
    const [loginOption, setLoginOption] = useState('email');
    const [fonts] = useFonts(customFonts);
    const [emailError, setemailError] = useState<string>("");
    const [cpasswordError, setcpasswordError] = useState<string>("");
    const [passwordError, setpasswordError] = useState<string>("");
    const [submitLogin, setSubmitLogin] = useState<boolean>(false);
    const context = useContext(GlobalContextApi);
    const { user } = useContext(AuthContext);

    if (!context) {
        return null;
    }
    const { newUser, setNewUser, actionlog, toggleAction } = context;
    const popup = useRef(new Animated.Value(-height)).current;
    useEffect(() => {
        setTimeout(() => {
            if (actionlog === 'login') {
                navigation.navigate('Bottom' as never)
            }
            if (actionlog === 'signup') {
                navigation.navigate('SetupUserinfo' as never)
            }
        }, 4000)

    }, [actionlog])
    //Animation success
    const popout = () => {
        return Animated.timing(popup, {
            toValue: -height,
            duration: 500,
            useNativeDriver: false
        }).start()
    }
    const popupAnim = () => {
        return Animated.timing(popup, {
            toValue: 20,
            duration: 500,
            useNativeDriver: false
        }).start(() => {
            setTimeout(() => {
                popout();
            }, 2000)
        })
    }

    //email validation
    const CheckEmailValidation = (email: string): boolean => {
        const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegx.test(email);
    }
    //types of error while signingup
    const getErrorMessageSignup = (errorCode: string): string => {
        const errorMessage: Record<string, string> = {
            "auth/email-already-in-use": "This email is already registered",
            "auth/invalid-email": "Invalid email address",
            "auth/weak-password": "Password is too weak. Use at least 6 characters",
            "auth/network-request-failed": "Network error. Please check your connection",
            "auth/too-many-requests": "Too many attempts. Please try again later",
        }
        return errorMessage[errorCode] || "Signup failed. Please try again";
    }
    //typesof error while logging in
    function getErrorMessageLogin(errorCode: string): string {
        const errorMessages: Record<string, string> = {
            "auth/invalid-credential": "Invalid email or password",
            "auth/user-not-found": "No account found with this email",
            "auth/wrong-password": "Incorrect password",
            "auth/invalid-email": "Invalid email address",
            "auth/too-many-requests": "Too many attempts. Please try again later",
            "auth/network-request-failed":
                "Network error. Please check your connection",
        };
        return errorMessages[errorCode] || "Login failed. Please try again";
    }
    //Signup:

    const RequestSignUp = async () => {

        setSubmitLogin(true);

        if (email.trim() == "" && password.trim() === "" && cpassword.trim() === "") {
            setemailError("Email is required");
            setpasswordError("Password is required");
            setcpasswordError("Confirm password is required");
            const interval = setTimeout(() => {
                setemailError("");
                setpasswordError("");
                setcpasswordError("");
            }, 3000)
            return () => clearInterval(interval)
        }

        if (email.trim() !== "" && password.trim() !== "" && cpassword.trim() !== "" && password !== cpassword) {
            setpasswordError("Password mismatch");
            setcpasswordError("Password mismatch");
            setPassword("");
            setcPassword("");
            const interval = setTimeout(() => {
                setpasswordError("");
                setcpasswordError("");
            }, 3000)
            return () => clearInterval(interval)
        }

        if (email.trim() === "") {
            setemailError("Email is required");
            const interval = setTimeout(() => {
                setemailError("");
            }, 3000)
            return () => clearInterval(interval)
        }

        if (!CheckEmailValidation(email)) {
            setemailError("Please enter a valid email");
            setEmail("");
            const interval = setTimeout(() => {
                setemailError("");
            }, 3000)
            return () => clearInterval(interval)

        }

        if (password.trim() === "" && cpassword.trim() !== "") {
            setpasswordError("Password is required");
            setcPassword("");
            const interval = setTimeout(() => {
                setpasswordError("");
            }, 3000)
            return () => clearInterval(interval);
        }

        if (password.trim() === "" && cpassword.trim() === "") {
            setpasswordError("Password is required");
            setcpasswordError("Confirm Password is required");
            const interval = setTimeout(() => {
                setpasswordError("");
                setcpasswordError("");
            }, 3000)
            return () => clearInterval(interval);
        }

        if (cpassword.trim() === "") {
            setcpasswordError("Confirm Password is required");
            const interval = setTimeout(() => {
                setcpasswordError("");
            }, 3000)
            return () => clearInterval(interval)
        }

        if (password.length < 6) {
            setpasswordError("Password must be at least 6 characters");
            setcpasswordError("Password must be at least 6 characters");
            setcPassword("");
            setPassword("");
            const interval = setTimeout(() => {
                setpasswordError("");
                setcpasswordError("");
            }, 3000)
            return () => clearInterval(interval)

        }

        if (email.trim() !== "" && CheckEmailValidation(email) && password.trim() !== "" && cpassword.trim() !== "" && password === cpassword) {
            try {
                toggleAction('signup')
                const credential = await createUserWithEmailAndPassword(auth, email, password);
                const user = {
                    lastName: "",
                    firstName: "",
                    dob: null,
                    gender: "",
                    image: "",
                    email: email,
                    follower: 0,
                    following: 0,
                    uploadpost: 0,
                    expoPushToken: "",
                }

                setNewUser(user);


                setEmail("");
                setPassword("");
                setcPassword("");
                popupAnim();

            } catch (error: any) {
                const errorCode = error?.code || "";
                const errorMessage = getErrorMessageSignup(errorCode);
                if (errorCode === "auth/email-already-in-use" || errorCode === "auth/invalid-email") {
                    setemailError(errorCode);
                    setEmail("");
                    setPassword("");
                    setcPassword("");
                    const interval = setTimeout(() => {
                        setemailError("");
                    }, 3000)
                    return () => clearInterval(interval)
                }
                else if (errorCode === "auth/weak-password") {
                    setpasswordError(errorCode)
                    setcpasswordError(errorCode)
                    setPassword("");
                    setcPassword("");
                    const interval = setTimeout(() => {
                        setpasswordError("");
                        setcpasswordError("");
                    }, 3000)
                    return () => clearInterval(interval)
                }
                else {
                    setSuccess(errorMessage);
                    popupAnim();
                }
            }
        }

    }

    //Login:

    const RequestLogin = async () => {

        if (email.trim() !== "" && !CheckEmailValidation(email) && password.length < 6) {
            setemailError("Invalid email");
            setpasswordError("Wrong password")
            setEmail("");
            setPassword("");
            const interval = setTimeout(() => {
                setemailError("");
                setpasswordError("");
            }, 3000)
            return () => clearInterval(interval);
        }
        if (email.trim() !== "" && !CheckEmailValidation(email) && password.length >= 6) {
            setemailError("Invalid email");
            setEmail("");
            const interval = setTimeout(() => {
                setemailError("");
            }, 3000)
            return () => clearInterval(interval);
        }
        if (email.trim() === "" && password.trim() === "") {
            setemailError("Email is required");
            setpasswordError("Password is required");
            const interval = setTimeout(() => {
                setpasswordError("");
                setemailError("");
            }, 3000)
            return () => clearInterval(interval);
        }
        if (email.trim() !== "" && password.trim() === "") {
            setpasswordError("Password is required");
            const interval = setTimeout(() => {
                setpasswordError("");
            }, 3000)
            return () => clearInterval(interval);
        }
        if (email.trim() === "") {
            setemailError("Email is required");
            const interval = setTimeout(() => {
                setemailError("");
            }, 3000)
            return () => clearInterval(interval)
        }

        if (password.trim() !== "" && email.trim() !== "" && CheckEmailValidation(email)) {
            try {
                toggleAction('login');
                await signInWithEmailAndPassword(auth, email, password);
                setSuccess("Login successful")
                popupAnim();
            } catch (error: any) {
                const errorCode = error?.code || "";
                const errorMessage = getErrorMessageLogin(errorCode);
                if (errorCode === "auth/invalid-credential") {
                    setpasswordError(errorMessage);
                    setemailError(errorMessage);
                    setPassword("");
                    setEmail("");
                    const interval = setTimeout(() => {
                        setpasswordError("");
                        setemailError("");
                    }, 3000)
                    return () => clearInterval(interval)

                }
                else if (errorCode === "auth/user-not-found") {
                    setemailError(errorMessage);
                    setpasswordError(errorMessage);
                    setEmail("");
                    setPassword("");
                    const interval = setTimeout(() => {
                        setemailError("");
                    }, 3000)
                    return () => clearInterval(interval)
                }
                else if (errorCode === "auth/wrong-password") {
                    setpasswordError(errorMessage);
                    setPassword("");
                    const interval = setTimeout(() => {
                        setpasswordError("");
                    }, 3000)
                    return () => clearInterval(interval)
                }
                else if (errorCode === "auth/invalid-email") {
                    setemailError(errorMessage);
                    setEmail("");
                    const interval = setTimeout(() => {
                        setemailError("");
                    }, 3000)
                    return () => clearInterval(interval)
                }
                else {
                    Alert.alert("Login Error", errorMessage);
                }

            }
        }

    }


    return {
        email, password, cpassword, success, navigation, action, visible, loginOption, fonts, emailError, cpasswordError, passwordError, submitLogin,
        popup, RequestSignUp, setEmail, setPassword, setcPassword, setAction, setVisible, setLoginOption, setemailError, setcpasswordError, setpasswordError,
        RequestLogin
    }

}