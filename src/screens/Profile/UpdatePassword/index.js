import React from 'react';
import { SafeAreaView, Text, View, StatusBar, Image, TouchableOpacity, Modal } from 'react-native';
import { colors } from '../../../utils/Colors';
import { styles } from './style';
import { Body, DatePicker, Header, MenuItem, MenuItemShow, SFTable, Button, Input, AuthTitle, Loading } from '../../../comps';
import { images } from '../../../utils/Images';
import { fontScale } from '../../../utils/Fonts';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { width } from '../../../utils/Dimenssion';
import { showToast } from '../../../utils/toast';
import { changePassword, check403 } from '../../../api/emp';
import Toast from 'react-native-toast-message';

const UpdatePassword = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)


    const onChangePassword = async () => {
        if (oldPassword.length == 0) {
            setMessage("Vui lòng nhập mật khẩu cũ!")
        } else if (newPassword.length == 0) {
            setMessage("Vui lòng nhập mật khẩu mới!")
        } else if (reNewPassword.length == 0) {
            setMessage("Vui lòng nhập lại mật khẩu mới !")
        } else if (newPassword !== reNewPassword) {
            setMessage("Mật khẩu nhập lại không khớp")
        } else {
            setMessage('')
            updatePassword(oldPassword, newPassword)
        }
    }
    const updatePassword = async (oldPass, newPass) => {
        setLoading(true)
        let res = await changePassword(oldPass, newPass)
        if (res.status == "success") {
            showToast("success", "Thành công", res?.data.message)

            setTimeout(() => {
                navigation.goBack();
            }, 2000);
            setLoading(false)

        } else {
            setLoading(false)
            showToast("error", "Lỗi hệ thống", res.message)
            check403(res.error, navigation)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar backgroundColor={colors.primary} />
            {/* <Header title="Đổi mật khẩu" /> */}
            <View style={styles.bottomShape}>
                <Image source={images.loginbg} resizeMode="stretch" style={styles.trigleShape} />
            </View>
            <View style={styles.mbfLogoContainer}>
                <Image source={images.mblogo} resizeMode="contain" style={styles.logo} />
            </View>
            <View style={styles.topShape}>
                <AuthTitle title="đổi mật khẩu" style={styles.authTitle} />
                <Input underline pwd title="Mật khẩu cũ" width={width - fontScale(70)} style={styles.ipUsn} onChangeText={(value) => setOldPassword(value)} />
                <Input underline pwd title="Mật khẩu mới" width={width - fontScale(70)} style={styles.ipUsn} onChangeText={(value) => setNewPassword(value)} />
                <Input underline pwd title="Xác nhận mật khẩu mới" width={width - fontScale(70)} style={styles.ipPwd} onChangeText={(value) => setReNewPassword(value)} />
                {/* <Input underline title="Số điện thoại" width={width - fontScale(70)} style={styles.ipPwd} onChangeText={(value) => setPhone(value)} /> */}
                <Button width={fontScale(150)} label={"Đổi mật khẩu"} center style={styles.loginButton} onPress={() => onChangePassword()} />
                <Text style={{ textAlign: "center", color: colors.white, marginTop: fontScale(30) }}>{message}</Text>

            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default UpdatePassword;