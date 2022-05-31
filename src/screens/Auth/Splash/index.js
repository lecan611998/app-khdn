import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, Image, ActivityIndicator } from 'react-native';
import { _removeData, _retrieveData } from '../../../utils/Storage';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { colors } from '../../../utils/Colors';
import { images } from '../../../utils/Images';
import { styles } from './style';
import { text } from '../../../utils/Text';
import { checkLogin, checkUserRole } from '../../../utils/Logistics';
import { fontScale } from '../../../utils/Fonts';
import { check403, checkToken, getUserInfo } from '../../../api/emp';

const Splash = () => {
    const navigation = useNavigation();
    const isFocus = useIsFocused();
    const checkTokenEx = async () => {
        let res = await checkToken()
        if (res.status == "success") {
            setTimeout(async () => {
                let isLogin = await _retrieveData("isLogin")
                let role = await _retrieveData("role")
                if (isLogin == true) {
                    if (role == "ROLE_EMPLOYEE") {
                        navigation.navigate("EMPHome")
                    } else {
                        navigation.navigate("AdminHome")
                    }
                } else {
                    navigation.navigate("SignIn")
                }

            }, 3000);
        } else {
            // setLoading(false)
            // showToast("error", "Lỗi hệ thống", res.message)
            check403(res.error, navigation)
        }
    }
    useEffect(() => {
        checkTokenEx()

    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primary} />
            <Image source={images.logo} style={styles.logo} />
            <View style={{ flex: 3, justifyContent: "center", top: fontScale(20) }}>
                <Image source={images.splashshape} resizeMode="cover" style={styles.shape} />
            </View>
            <View style={{ flex: 2, top: fontScale(50) }}>
                <Text style={styles.appName}>KAM/AM Salary</Text>
                <ActivityIndicator size="small" color={colors.white} style={styles.loadingIcon} />
            </View>
        </SafeAreaView>
    );
}

export default Splash;