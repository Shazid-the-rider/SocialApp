import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useContext, useEffect, useRef, useState } from "react";
import { customFonts } from "../../../utils/fonts";
import { Animated, Dimensions } from "react-native";
import { GlobalContextApi } from "../../../../context/GlobalContext";
import { showErrorToast, showSuccessToast } from "../../../../shared/utils/toast";

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


    if (!fonts) {
        return null;
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
            showErrorToast('Please fill all information')
            return;
        }

        if (!isValidName(firstName)) {
            showErrorToast("First name must contain only letters")
            return;
        }

        if (!isValidName(lastName)) {
            showErrorToast("Last name must contain only letters")
            return;
        }
        if (firstName.length < 2) {
            showErrorToast("First name must be at least 2 characters")
            return;
        }

        if (lastName.length < 2) {
            showErrorToast("Last name must be at least 2 characters");
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
            showSuccessToast('Successfully updated information. Further proceeding');
            navigation.navigate('SetupImage' as never)
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
        HandleSetUpInfo
    }
}