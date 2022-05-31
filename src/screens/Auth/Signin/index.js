import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Text, View, Image, ActivityIndicator, BackHandler, TouchableOpacity } from 'react-native';
import { Input, Button, AuthTitle, Loading } from '../../../comps';
import { colors } from '../../../utils/Colors';
import { width } from '../../../utils/Dimenssion';
import { fontScale } from '../../../utils/Fonts';
import { useNavigation } from '@react-navigation/core';
import { styles } from './style';
// import { login } from '../../../api';
import { _retrieveData, _storeData } from '../../../utils/Storage';
import { text } from '../../../utils/Text';
import { images } from '../../../utils/Images';
import { checkLogin } from '../../../utils/Logistics';
import { login } from '../../../api/emp';
import { showToast } from '../../../utils/toast';
import Toast from 'react-native-toast-message';

const SignIn = (props) => {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const signIn = async (userName = "", password = "") => {
        if (userName.length == 0) {
            setMessage(text.typeUsername)
        } else if (password.length == 0) {
            setMessage(text.typePassword)
        } else {
            setMessage("")
            setLoading(true);
            await login(userName, password, navigation).then(async (res) => {
                if (res.status == "success") {
                    _storeData("isLogin", true)
                    _storeData("loginInfo", res.data)
                    _storeData("role", res.data?.roleType)
                    showToast("success", "Thành công", "Đăng nhập thành công")

                    setTimeout(() => {
                        if (res.data?.roleType == "ROLE_EMPLOYEE") {
                            navigation.navigate("EMPHome")
                        } else {
                            navigation.navigate("AdminHome")
                        }
                        setLoading(false);
                        setUsername("")
                        setPassword("")
                    }, 500);

                } else if (res.status == "failed") {
                    setLoading(false)
                    setMessage(res.message)
                    setPassword("")
                }
            });
        }
    }

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => {
            backHandler.remove();
        };

    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <StatusBar backgroundColor={colors.primary} translucent />
            <View style={styles.bottomShape}>
                <Image source={images.loginbg} resizeMode="stretch" style={styles.trigleShape} />
            </View>
            <View style={styles.mbfLogoContainer}>
                <Image source={images.mblogo} resizeMode="contain" style={styles.logo} />
            </View>
            <View style={styles.topShape}>
                <AuthTitle title={text.login} style={styles.authTitle} />
                <Input value={userName} underline title={text.username} width={width - fontScale(70)} style={styles.ipUsn}
                    onChangeText={(value) => [setUsername(value), setMessage('')]} />
                <Input value={password} underline pwd title={text.password} width={width - fontScale(70)} style={styles.ipPwd}
                    onChangeText={(value) => [setPassword(value), setMessage('')]} />
                <TouchableOpacity style={{ marginTop: fontScale(20), marginRight: fontScale(30) }}
                    onPress={() => navigation.navigate("Recovery")}
                >
                    <Text style={{ textAlign: "right", color: "#EAEEEE" }}>Quên mật khẩu ?</Text>
                </TouchableOpacity>
                <Button width={fontScale(150)} label={"Đăng nhập"} center style={styles.loginButton} onPress={() => signIn(userName, password)} />
                <Text style={{ color: colors.white, textAlign: "center", marginTop: fontScale(15) }}>{message}</Text>
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default SignIn;