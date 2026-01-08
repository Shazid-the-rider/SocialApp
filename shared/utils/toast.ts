import Toast from 'react-native-toast-message';

// Success toast
export function showSuccessToast(message: string, position: 'top' | 'bottom' = 'bottom') {
    Toast.show({
        type: 'success',
        text1: message,
        position,
        visibilityTime: 3000,
        autoHide: true,
        text1Style: {
            fontSize: 15,
            fontFamily: 'Poppins-Medium',
            textAlign: 'center',
        },
        bottomOffset: 0

    });
}

// Error toast
export function showErrorToast(message: string, position: 'top' | 'bottom' = 'bottom') {
    Toast.show({
        type: 'error',
        text1: message,
        position,
        text1Style: {
            fontSize: 15,
            fontFamily: 'Poppins-Medium',
            textAlign: 'center',
        },
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 0,

    });
}

// Info toast
export function showInfoToast(message: string, position: 'top' | 'bottom' = 'bottom') {
    Toast.show({
        type: 'info',
        text1: message,
        position,
        visibilityTime: 3000,
        autoHide: true,
        text1Style: {
            fontSize: 15,
            fontFamily: 'Poppins-Medium',
        },
    });
}