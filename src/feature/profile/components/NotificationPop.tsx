import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
const width = Dimensions.get('window').width;
type Props = { status: boolean; message: string; notify: Animated.Value };

export const NotificationPop = React.memo(({ status, message, notify }: Props) => {

    return (
        <Animated.View className="w-[100%] justify-center items-center" style={{ bottom: notify }}>
            <View style={styles.notify}>
                {status ? <FontAwesome5 name="check-circle" size={24} color="green" /> : <MaterialIcons name="error" size={24} color="red" />}
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14 }}>{message}</Text>
            </View>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    notify: {
        position: 'absolute',
        bottom: 20,
        width: width / 1.07,
        height: 60,
        backgroundColor: 'white',
        shadowColor: "#2c2b2bff",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10
    }
});
