import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StatusBar, View, Image, FlatList } from 'react-native';
import { Body, DatePicker, Header, Loading } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { showToast } from '../../../../utils/toast';
import { check403 } from '../../../../api/emp';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { styles } from './stytes';
import { images } from '../../../../utils/Images';
import GenaralItemAdmin from './genarailItemAdmin';
import { getProductivitySubAdmin } from '../../../../api/manager';
import { _retrieveData, _storeData } from '../../../../utils/Storage';

const ProductivitySubAdmin = (props) => {
    const navigation = useNavigation();
    const [general, setGeneral] = useState([]);
    const [data, setData] = useState([]);
    const [role, setRole] = useState('');
    const [loginInfo, setLoginInfo] = useState([]);
    const [month, setMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
    const [loading, setLoading] = useState(false);
    const checkIcon = (icon) => {
        if (icon == "EMPLOYEE") {
            return images.AM_KAM
        } else if (icon == "UNIT") {
            return images.store
        } else if (icon == "BRANCH") {
            return images.branch
        } else if (icon == "COMPANY") {
            return images.company
        } else {
            return images.none
        }
    }
    const getData = async (branchCode, month, shopCode) => {
        setLoading(true)
        let res = await getProductivitySubAdmin(branchCode, month, shopCode)
        if (res.status == "success") {
            // showToast("success", "Thành công", "Lấy dữ liệu thành công")
            if (res.data != undefined && res.data != null) {
                if (res.data.data != null && res.data.data != undefined) {
                    res.data.data.push(res.data.general)
                    setData(res.data.data)
                    setGeneral(res.data.general)
                    // console.log(res.data.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                    showToast("info", "Thông báo", "Không có dữ liệu")
                }
            } else {
                setLoading(false)
                showToast("info", "Thông báo", "Không có dữ liệu")
            }
        } else {
            setLoading(false)
            showToast("error", "Lỗi hệ thống", res.message)
            check403(res.error, navigation)
        }
    }
    const onChangeDatePicker = (date) => {
        setData([])
        setGeneral([])
        setMonth(date)
        getData("", date, "")
        // _storeData('month', date)
    }
    // const getDatePicker = async () => {
    //     setData([])
    //     setGeneral([])
    //     const date = await _retrieveData("month")
    //     console.log(date)
    //     if (date != undefined) {
    //         setMonth(date)
    //         await getData("", date, "")
    //     } else {
    //         await getData("", month, "")
    //     }
    // }
    const useEffectExec = async () => {
        setLoading(true)
        const role = await _retrieveData("role")
        setRole(role)
        const loginInfo = await _retrieveData('loginInfo')
        setLoginInfo(loginInfo)
        if (role == 'ROLE_COMPANY') {
            await getData("", month, "")
        } else if (role == "ROLE_BRANCH") {
            await getData(loginInfo.shopCode, month, "")
        } else {
            await getData(loginInfo.parentShop, month, loginInfo.shopCode)
        }

    }
    useEffect(() => {
        // navigation.addListener('focus', async () => {
        // await getDatePicker()
        useEffectExec()

        // })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar translucent={true} backgroundColor={colors.primary} />
            <Header title="Năng suất bình quân" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(140)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body />
            <View style={styles.body}>
                {
                    data.length == 0 && loading == false ?
                        <Text style={{ textAlign: "center" }}>Không có dữ liệu</Text>
                        :
                        <FlatList
                            data={data}
                            keyExtractor={(item, key) => key.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <GenaralItemAdmin icon={checkIcon(item.icon)} shopName={item.shopName} disable={index == data.length-1 ? true :false}
                                        khtb={item.khtb} tttb={item.tttb} khdt={item.khdt} ttdt={item.ttdt} role={role} item={item} month={month} screen="company" />
                                )
                            }}
                        />
                }
                {/* {
                    general.length == 0 ?
                        null :
                        <GenaralItemAdmin icon={checkIcon(general.icon)} shopName={general.shopName} disable={true}
                            khtb={general.khtb} tttb={general.tttb} khdt={general.khdt} ttdt={general.ttdt} role={role} />
                } */}

            </View>

            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default ProductivitySubAdmin;