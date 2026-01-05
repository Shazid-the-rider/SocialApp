import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Animated, Dimensions, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import useUserinfoSetHook from "../hooks/useUserinfoSetHook";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function UserinfoSet() {
    const context = useUserinfoSetHook();
    if (!context) {
        return null;
    }
    const { setFirstName,
        setLastName,
        firstnameError, 
        lastnameError, 
        blankError, 
        dob, setDob,
        gender, setGender,
        showDate, setShowDate,
        showGender, setShowGender,
        success, 
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
        HandleSetUpInfo } = context

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); popOut(), popOutGender() }}>
            <View className="flex-1 w-full bg-white items-center gap-[30px]">
                <View className="gap-[20px] px-[20px]">

                    {/*HEADER*/}

                    <Animated.View style={{ opacity: headerAnim }} className="pt-[50px] pb-[10px]">
                        <Text style={{ fontFamily: 'Poppins-Bold' }} className="text-[32px]">Let's setup</Text>
                        <Text style={{ fontFamily: 'Poppins-Bold' }} className="text-[32px]">some information</Text>
                    </Animated.View>

                    {/*FORM FIELD*/}

                    <View className="w-full flex-row justify-between">
                        <Animated.View style={{ opacity: info1 }} className="w-[47%] gap-[7px]">
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15 }}>First name</Text>
                            <TextInput placeholder="First Name" className="w-full border-[0.3px] border-[rgba(187,186,186,0.88)] rounded-[5px] p-[10px] text-[16px] font-['Poppins-Regular']" style={{ borderColor: 'rgba(187, 186, 186, 0.88)' }}
                                onChangeText={(text) => setFirstName(text)}
                                onFocus={() => popOut()}
                            />
                        </Animated.View>
                        <Animated.View style={{ opacity: info1 }} className="w-[47%] gap-[7px]">
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15 }}>Last name</Text>
                            <TextInput placeholder="Last Name" className="w-full border-[0.3px] border-[rgba(187,186,186,0.88)] rounded-[5px] p-[10px] text-[16px] font-['Poppins-Regular']" style={{ borderColor: 'rgba(187, 186, 186, 0.88)' }}
                                onChangeText={(text) => setLastName(text)}
                                onFocus={() => popOut()}
                            />
                        </Animated.View>
                    </View>
                    <View className="w-full flex-row justify-between">
                        <Animated.View style={{ opacity: info1 }} className="w-[47%] gap-[7px]">
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15 }}>Date of Birth</Text>
                            <TouchableOpacity className="w-full border-[0.3px] border-[rgba(187,186,186,0.88)] rounded-[5px] p-[10px] text-[16px] font-['Poppins-Regular']"
                                style={{ borderColor: 'rgba(187, 186, 186, 0.88)' }}
                                onPress={() => { setShowDate(true); Keyboard.dismiss(); popOutGender(); PopUp() }}
                            >
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16 }}>
                                    {dob ? dob.toDateString() : "Select Date"}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View style={{ opacity: info1 }} className="w-[47%] gap-[7px]">
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15 }}>Gender</Text>
                            <TouchableOpacity className="w-full border-[0.3px] border-[rgba(187,186,186,0.88)] rounded-[5px] p-[10px] text-[16px] font-['Poppins-Regular']"
                                style={{ borderColor: 'rgba(187, 186, 186, 0.88)' }}
                                onPress={() => { setShowGender(true); Keyboard.dismiss(); popOut(); PopUpGender() }}
                            >
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16 }}>
                                    {gender ? gender : "Select Gender"}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>

                {/*NEXT BUTTON*/}

                <Animated.View style={{ opacity: button }}>
                    <TouchableOpacity className="mt-[20px] p-[14px] bg-[black] rounded-[30px] items-center" style={{ width: width / 1.1 }} activeOpacity={0.7}
                        onPress={() => HandleSetUpInfo()}
                    >
                        <Text style={{ fontFamily: 'Poppins-Medium', color: 'white', fontSize: 17 }}>Next</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/*BOTTOM CALENDER FIELD*/}

                {
                    showDate && (<Animated.View className="absolute bg-white rounded-tl-[30px] rounded-tr-[30px] justify-center items-center flex shadow-[0px_4px_6px_rgba(0,0,0,0.25)] elevation-[5]" style={{ height: height / 1.8, width: width / 1.05, bottom: bottomSheetAnim }}>

                        <TouchableOpacity className="h-[2px] w-[50px] bg-black"
                            onPress={() => popOut()}
                        >
                        </TouchableOpacity>

                        <DateTimePicker
                            value={dob || new Date()}
                            mode="date"
                            display="inline"
                            maximumDate={new Date()}
                            style={{ height: '100%', width: '100%' }}
                            onChange={(event, selectedDate) => setDob(selectedDate || dob)}
                        />

                    </Animated.View>)
                }
                {/*BOTTOM GENDER FIELD*/}
                {
                    showGender && (<Animated.View className="bg-white pb-[60px] absoulte rounded-tl-[30px] rounded-tr-[30px] flex justify-center items-center shadow-[0px_4px_6px_rgba(0,0,0,0.25)] elevation-[5]" style={{ height: height / 3, width: width / 1.05, bottom: bottomGenderAnim, gap: 30 }}>

                        <TouchableOpacity className="h-[2px] w-[50px] bg-black"
                            onPress={() => popOutGender()}
                        >
                        </TouchableOpacity>
                        <View style={{ height: '60%', width: '100%', gap: 10 }}>
                            <TouchableOpacity className="h-[30%] flex-row mx-[40px] justify-between items-center px-[10px]" onPress={() => setGender('Male')}>
                                <Text className="text-[18px] font-['Poppins-Medium']">Male</Text>
                                <View className="h-[17px] w-[17px] bg-white border border-black rounded-full" style={{ backgroundColor: gender === 'Male' ? 'black' : 'white' }}></View>
                            </TouchableOpacity>
                            <TouchableOpacity className="h-[30%] flex-row mx-[40px] justify-between items-center px-[10px]" onPress={() => setGender('Female')}>
                                <Text className="text-[18px] font-['Poppins-Medium']">Female</Text>
                                <View className="h-[17px] w-[17px] bg-white border border-black rounded-full" style={{ backgroundColor: gender === 'Female' ? 'black' : 'white' }}></View>
                            </TouchableOpacity>
                            <TouchableOpacity className="h-[30%] flex-row mx-[40px] justify-between items-center px-[10px]" onPress={() => setGender('None')}>
                                <Text className="text-[18px] font-['Poppins-Medium']">None</Text>
                                <View className="h-[17px] w-[17px] bg-white border border-black rounded-full" style={{ backgroundColor: gender === 'None' ? 'black' : 'white' }}></View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>)
                }
                <Animated.View className="absolute bottom-0 h-[60px] bg-white rounded-[12px] flex-row items-center justify-center gap-[10px] shadow-lg" style={{ bottom: notificationpopup, width: width / 1.07 }}>
                    {(blankError || firstnameError || lastnameError) && <MaterialIcons name="error" size={24} color="red" />}
                    {success && <FontAwesome5 name="check-circle" size={24} color="green" />}
                    {success && <Text numberOfLines={2} style={{ fontFamily: 'Poppins-Medium', fontSize: 14, }}>{success}</Text>}
                    {blankError && <Text numberOfLines={2} style={{ fontFamily: 'Poppins-Medium', fontSize: 14, }}>{blankError}</Text>}
                    {firstnameError && <Text numberOfLines={2} style={{ fontFamily: 'Poppins-Medium', fontSize: 14, }}>{firstnameError}</Text>}
                    {lastnameError && <Text numberOfLines={2} style={{ fontFamily: 'Poppins-Medium', fontSize: 14, }}>{lastnameError}</Text>}
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

