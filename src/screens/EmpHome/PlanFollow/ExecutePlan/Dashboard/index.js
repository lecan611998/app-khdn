import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { Body, DatePicker, Header, Loading, MenuItem, MenuItemShow, TextAmount } from '../../../../../comps';
import { useNavigation } from '@react-navigation/core';
import { fontScale } from '../../../../../utils/Fonts';
import { width } from '../../../../../utils/Dimenssion';
import { colors } from '../../../../../utils/Colors';
import { styles } from './style';
import { images } from '../../../../../utils/Images';
import { getMonth } from '../../../../../utils/Logistics';
import { _storeData } from '../../../../../utils/Storage';
import { check403, getExcutePlanDashboard } from '../../../../../api/emp';
import Toast from 'react-native-toast-message';
import { showToast } from '../../../../../utils/toast';

const ExecutePlanDashboard = (props) => {
    const navigation = useNavigation();
    const [month, setMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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
        let res = await getExcutePlanDashboard(month)
        if (res.status == "success") {
            // showToast("success", "Thành công", "Lấy dữ liệu thành công")
            if (res.data != undefined && res.data != null) {
                if (res.data.data != null && res.data.data != undefined) {
                    setData(res.data.data)
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
            <Header title="Thực hiện kế hoạch" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(120)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body style={{ marginTop: fontScale(30) }} showInfo={false} />

            <View style={styles.body}>
                <TextAmount style={{ marginBottom: fontScale(10) }} text="KPI Tổng:" number={data.sumKpi} />
                <ScrollView>
                    <MenuItemShow value={data.totalPostPaid} style={{ marginTop: fontScale(25) }} title="Tổng TBTS" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.totalpostpaid} width={width - fontScale(60)} />
                    <MenuItemShow value={data.qualitySub} style={{ marginTop: fontScale(35) }} title="TB chất lượng" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.qualitysub} width={width - fontScale(60)} />
                    <MenuItemShow value={data.incurredRevenue} style={{ marginTop: fontScale(35) }} title="Doanh thu phát sinh" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.incurredrevenue} width={width - fontScale(60)} />
                    <MenuItem value="" style={{ marginTop: fontScale(35) }} title="Doanh nghiệp phát triển mới" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.growthenterprise} width={width - fontScale(60)} onPress={() => navigation.navigate("GrowthEnterprise")} />
                    <MenuItemShow value={data.telecomRevenue} style={{ marginTop: fontScale(35) }} title="Doanh thu viễn thông" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.telecommunicationrevenue} width={width - fontScale(60)} />
                    <MenuItemShow value={data.retailRevenue} style={{ marginTop: fontScale(35) }} title="Doanh thu bán lẻ" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.retailrevenue} width={width - fontScale(60)} />
                    <MenuItemShow value={data.change4GSim} style={{ marginTop: fontScale(35), marginBottom: fontScale(20) }} title="Thay sim 4G" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.change4Gsim} width={width - fontScale(60)} />
                </ScrollView>
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default ExecutePlanDashboard;