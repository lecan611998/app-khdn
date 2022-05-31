import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Body, DatePicker, Header, Loading, MenuItem, MenuItemShow } from '../../../../comps';
import { useNavigation } from '@react-navigation/core';
import { fontScale } from '../../../../utils/Fonts';
import { width } from '../../../../utils/Dimenssion';
import { colors } from '../../../../utils/Colors';
import { styles } from './style';
import { images } from '../../../../utils/Images';
import { _storeData } from '../../../../utils/Storage';
import { getMonth } from '../../../../utils/Logistics';
import { showToast } from '../../../../utils/toast';
import Toast from 'react-native-toast-message';
import { check403, getWarningDashboard } from '../../../../api/emp';

const WarningDashboard = (props) => {
    const navigation = useNavigation();
    const [month, setMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [icon, setIcon] = useState(images.none);
    const [enterpriseEvolve, setEnterpriseEvolve] = useState(data.enterpriseEvolve == undefined || data.enterpriseEvolve == null ? 0 : data.enterpriseEvolve);
    const getDatePikerValue = async () => {
        let monthStore = await getMonth()
        if (monthStore != undefined) {
            setMonth(monthStore)
            getData(monthStore)
        } else {
            getData(month)
        }
    }

    const getData = async (month) => {
        setLoading(true)
        let res = await getWarningDashboard(month)
        if (res.status == "success") {
            // showToast("success", "Thành công", "Lấy dữ liệu thành công")
            if (res.data != undefined && res.data != null) {
                if (res.data.data != null && res.data.data != undefined) {
                    setData(res.data.data)
                    setEnterpriseEvolve(res.data.data.enterpriseEvolve)
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
        setMonth(date)
        getData(date)
        _storeData("month", date)
    }
    useEffect(() => {
        navigation.addListener('focus', async () => {
            await getDatePikerValue()
        })
    })
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title="Cảnh báo" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(120)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body style={{ marginTop: fontScale(44) }} showInfo={false} />
            <View style={styles.body}>
                <MenuItem value=" " style={{ marginTop: fontScale(30) }} title="Biến động thuê bao" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.subfluct} width={width - fontScale(60)} onPress={() => navigation.navigate("SubFluct")} />
                <MenuItem value=" " style={{ marginTop: fontScale(50) }} title="Biến động doanh thu" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.incomefluct} width={width - fontScale(60)} onPress={() => navigation.navigate("IncomeFluct")} />
                <MenuItemShow value={enterpriseEvolve} style={{ marginTop: fontScale(50) }} title="Biến động DN trong tập DS giao" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.enterprisefluct} width={width - fontScale(60)} />
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default WarningDashboard;