import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StatusBar, Image, TouchableOpacity, Modal } from 'react-native';
import { colors } from '../../../utils/Colors';
import { styles } from './style';
import { Body, DatePicker, Header, MenuItem, MenuItemShow, SFTable, Button, Loading } from '../../../comps';
import { images } from '../../../utils/Images';
import { fontScale } from '../../../utils/Fonts';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { check403, getUserInfo, updateImage } from '../../../api/emp';
import { showToast } from '../../../utils/toast';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { imgUrl } from '../../../api/utils';
import mime from "mime";

const UpdateProfile = (props) => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false)
    const [user, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState(new FormData());
    useEffect(() => {
        navigation.addListener('focus', async () => {
            await getData()
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
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
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        // console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
            let localUri = "file:///" + result.uri.split("file:/").join("");
            let filename = localUri.split("/").pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let fData = new FormData();
            fData.append("multipartFile", {
                uri: localUri,
                type: mime.getType(localUri),
                name: filename,
            });

            updateImages(fData)
        }
    };
    const updateImages = async (image) => {
        setLoading(true)
        let res = await updateImage(image)
        if (res.status == "success") {
            // showToast("success", "Thành công", "Lấy dữ liệu thành công")
            if (res.data != undefined && res.data != null) {
                if (res.data.data != null && res.data.data != undefined) {
                    setUserData(res.data.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                    // showToast("info", "Thông báo", "Không có dữ liệu user")
                }
            } else {
                setLoading(false)
                // showToast("info", "Thông báo", "Không có dữ liệu user")
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
                <View style={{ flex: 1 / 2 }}>


                    <Header title="Chỉnh sửa thông tin cá nhân" />

                    <Image source={images.profileHeader} resizeMode="stretch" style={styles.headerShape} />
                    <View style={styles.personInfo}>
                        <Text style={styles.staffCode}>{user.empName}</Text>
                        <Text style={styles.staffName}>{user.shopName}</Text>
                        <TouchableOpacity onPress={() => pickImage()} style={styles.upload}>
                            {
                                image == null ?
                                    <Image style={styles.avatar}
                                        source={user.linkImg != "" && user.linkImg != undefined ? { uri: imgUrl + user.linkImg } : images.avatar}
                                    />
                                    :
                                    <Image style={styles.avatar}
                                        source={{ uri: image }}
                                    />
                            }
                        </TouchableOpacity>

                    </View>
                    <Text style={{ marginTop: fontScale(30), marginLeft: fontScale(30), fontWeight: "bold", fontSize: fontScale(18), color: "#707070" }}>THÔNG TIN CÁ NHÂN</Text>
                </View>
                <View style={{ flex: 1 / 2, justifyContent: "flex-end", marginBottom: fontScale(20) }}>
                    <Button
                        style={styles.button}
                        label="Lưu thay đổi"
                        onPress={() => { navigation.goBack() }} />
                </View>

            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default UpdateProfile;