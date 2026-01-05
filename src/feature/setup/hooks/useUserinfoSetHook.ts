import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useContext, useEffect, useRef, useState } from "react";
import { customFonts } from "../../../utils/fonts";
import { Animated, Dimensions } from "react-native";
import { GlobalContextApi } from "../../../../context/GlobalContext";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function useUserinfoSetHook() {
    const context = useContext(GlobalContextApi);
    if (!context) {
        return null;
    }
    let currentValue = 0;
    const { newUser, setNewUser } = context;
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [firstnameError, setFirstNameError] = useState<string>("");
    const [lastnameError, setLastNameError] = useState<string>("");
    const [blankError, setBlankError] = useState<string>("");
    const [dob, setDob] = useState<Date | null>(null);
    const [gender, setGender] = useState<string>("");
    const [showDate, setShowDate] = useState<boolean>(false);
    const [showGender, setShowGender] = useState<boolean>(false);
    const navigation = useNavigation();
    const [fonts] = useFonts(customFonts);
    const [success, setSuccess] = useState<string>("");

    const headerAnim = useRef(new Animated.Value(0)).current;
    const notificationpopup = useRef(new Animated.Value(-height)).current;
    const bottomSheetAnim = useRef(new Animated.Value(-height)).current;
    const bottomGenderAnim = useRef(new Animated.Value(-height)).current;
    const info1 = useRef(new Animated.Value(0)).current;
    const button = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(headerAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                }),
                Animated.timing(info1, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                }),
            ]),
            Animated.timing(button, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }),
        ]).start()

    }, []);

    if (!fonts) {
        return null;
    }

    useEffect(() => {
        if (success) {
            notifypopupAnim();
            const id = notificationpopup.addListener(({ value }) => {
                currentValue = value;
            });
            setTimeout(() => {
                navigation.navigate("SetupImage" as never)
            }, 3000);
            notificationpopup.removeListener(id)
            return () => notificationpopup.removeListener(id)
        }
    }, [success]);

    const notifypopout = () => {
        return Animated.timing(notificationpopup, {
            toValue: -100,
            duration: 200,
            useNativeDriver: false
        }).start()
    }
    const notifypopupAnim = () => {
        return Animated.timing(notificationpopup, {
            toValue: 20,
            duration: 200,
            useNativeDriver: false
        }).start(() => {
            setTimeout(() => {
                notifypopout();
            }, 1000)
        })
    }

    const PopUp = () => {
        return Animated.timing(bottomSheetAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start()
    }
    const popOut = () => {
        return Animated.timing(bottomSheetAnim, {
            toValue: -height,
            duration: 300,
            useNativeDriver: false
        }).start()
    }

    const PopUpGender = () => {
        return Animated.timing(bottomGenderAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start()
    }
    const popOutGender = () => {
        return Animated.timing(bottomGenderAnim, {
            toValue: -height,
            duration: 300,
            useNativeDriver: false
        }).start()
    }
    const regex = /^[A-Za-z]+$/;

    function isValidName(name: string) {
        return regex.test(name);
    }
    const HandleSetUpInfo = () => {
        setBlankError("");
        setFirstNameError("");
        setLastNameError("");

        if (firstName.trim() === "" || lastName.trim() === "" || gender.trim() === "" || !dob) {
            setBlankError("Please fill all information");
            notifypopupAnim();
            return;
        }

        if (!isValidName(firstName)) {
            setFirstNameError("First name must contain only letters");
            notifypopupAnim();
            return;
        }

        if (!isValidName(lastName)) {
            setLastNameError("Last name must contain only letters");
            notifypopupAnim();
            return;
        }
        if (firstName.length < 2) {
            setFirstNameError("First name must be at least 2 characters");
            notifypopupAnim();
            return;
        }

        if (lastName.length < 2) {
            setLastNameError("Last name must be at least 2 characters");
            notifypopupAnim();
            return;
        }

        if (firstName.trim() !== "" && isValidName(firstName) && lastName.trim() !== "" && isValidName(lastName) && gender.trim() !== "" && dob) {
            const user = {
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                gender: gender
            }
            setNewUser((prev) => {
                if (!prev) {
                    return prev;
                }
                return {
                    ...prev,
                    firstName,
                    lastName,
                    dob,
                    gender,
                }
            });
            setSuccess("Successfully Updated");
            notifypopupAnim();
        }
    };



    return {
        success, setSuccess,
        firstName, setFirstName,
        lastName, setLastName,
        firstnameError, setFirstNameError,
        lastnameError, setLastNameError,
        blankError, setBlankError,
        dob, setDob,
        gender, setGender,
        showDate, setShowDate,
        showGender, setShowGender,
        navigation,
        fonts,
        headerAnim,
        notificationpopup,
        bottomSheetAnim,
        bottomGenderAnim,
        info1,
        button,
        PopUp,
        popOut,
        PopUpGender,
        popOutGender,
        notifypopout,
        notifypopupAnim,
        HandleSetUpInfo
    }
}