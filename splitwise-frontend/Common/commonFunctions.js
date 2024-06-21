import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('userDetails');
        console.log("aaaa" ,  JSON.parse(jsonValue));
        return JSON.parse(jsonValue);
    } catch (e) {
        console.error('Failed to fetch the data from storage', e);
        return null;
    }
};
