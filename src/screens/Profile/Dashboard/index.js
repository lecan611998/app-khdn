import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StatusBar, Image, TouchableOpacity, Modal } from 'react-native';
import { colors } from '../../../utils/Colors';
import { styles } from './style';
import { Body, DatePicker, Header, Loading, MenuItem, MenuItemShow, SFTable } from '../../../comps';
import { images } from '../../../utils/Images';
import { fontScale } from '../../../utils/Fonts';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { showToast } from '../../../utils/toast';
import Toast from 'react-native-toast-message';
import { check403, getUserInfo } from '../../../api/emp';
import { imgUrl } from '../../../api/utils';

const ProfileDashboard = (props) => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false)
    const [user, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        navigation.addListener('focus', async () => {
            await getData()
        })
    })

    const getData = async () => {
        setLoading(true)
        let res = await getUserInfo()
        if (res.status == "success") {
            // showToast("success", "Thành công", "Lấy dữ liệu thành công")
            if (res.data != undefined && res.data != null) {
                if (res.data.data != null && res.data.data != undefined) {
                    setUserData(res.data.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                    showToast("info", "Thông báo", "Không có dữ liệu user")
                }
            } else {
                setLoading(false)
                showToast("info", "Thông báo", "Không có dữ liệu user")
            }
        } else {
            setLoading(false)
            showToast("error", "Lỗi hệ thống", res.message)
            check403(res.error, navigation)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar barStyle="dark-content" translucent backgroundColor={colors.primary} />
            <View style={{ backgroundColor: colors.white, flex: 1 }}>
                <Header showBack={false} title="Thông tin cá nhân" />
                <Image source={images.profileHeader} resizeMode="stretch" style={styles.headerShape} />
                <View style={styles.personInfo}>
                    <Text style={styles.staffCode}>{user.empName}</Text>
                    <Text style={styles.staffName}>{user.shopName}</Text>
                    <Image style={styles.avatar} source={user.linkImg != "" && user.linkImg != undefined ? { uri: imgUrl + user.linkImg } : images.avatar} />
                </View>
                <Text style={{ marginTop: fontScale(30), marginLeft: fontScale(30), fontWeight: "bold", fontSize: fontScale(18), color: "#707070" }}>THÔNG TIN CÁ NHÂN</Text>

                <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: colors.primary, width: fontScale(50), height: fontScale(50), padding: fontScale(13), position: "absolute", bottom: fontScale(22), right: fontScale(22), borderRadius: fontScale(25) }}>
                    <Image source={images.pencil} resizeMode="cover" style={{ width: fontScale(25), height: fontScale(25) }} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType={'fade'}
                visible={showModal}
                transparent={true}
                onRequestClose={() => setShowModal(!showModal)}>
                <View style={{ flex: 1, backgroundColor: colors.primary }}>
                    <View style={styles.optionDialogs}>
                        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                            <Image source={images.close} style={styles.closeIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionMenu} onPress={() => [setShowModal(!showModal), navigation.navigate("UpdatePassword")]}>
                            <Text style={styles.menuTitle}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionMenu} onPress={() => [setShowModal(!showModal), navigation.navigate("UpdateProfile")]}>
                            <Text style={styles.menuTitle}>Chỉnh sửa thông tin cá nhân</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default ProfileDashboard;