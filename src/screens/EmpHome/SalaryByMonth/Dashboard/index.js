import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { Body, DatePicker, Header, Loading, MenuItem, MenuItemShow, TextAmount } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { styles } from './style';
import { useNavigation } from '@react-navigation/core';
import { _storeData } from '../../../../utils/Storage';
import { showToast } from '../../../../utils/toast';
import { getMonth } from '../../../../utils/Logistics';
import Toast from 'react-native-toast-message';
import { check403, getSalaryByMonthDashboard } from '../../../../api/emp';

const SalaryByMonthDashboard = (props) => {
    const navigation = useNavigation();
    const [month, setMonth] = useState(moment(new Date()).subtract(1, 'months').format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [icon, setIcon] = useState(images.none);
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
        let res = await getSalaryByMonthDashboard(month)
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
            <Header title="Lương theo tháng" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(120)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body style={{ marginTop: fontScale(27) }} showInfo={false} />
            <View style={styles.body}>
                <TextAmount text="Tổng Lương: " number={data.totalSalary} />
                <ScrollView>
                    <MenuItemShow value={data.fixedSalary} style={{ marginTop: fontScale(30) }} title="Lương cố định" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.fixedwage} width={width - fontScale(60)} />
                    <MenuItem value={data.productSalary} style={{ marginTop: fontScale(30) }} title="Lương sản phẩm" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.product} width={width - fontScale(60)} onPress={() => navigation.navigate("Product")} />
                    <MenuItemShow value={data.outcomeSalary} style={{ marginTop: fontScale(30) }} title="Chi thưởng vượt KH tháng" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.planout} width={width - fontScale(60)} />
                    <MenuItemShow value={data.sactionSalary} style={{ marginTop: fontScale(30) }} title="Chế tài vi phạm" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.sanctions} width={width - fontScale(60)} />
                    <MenuItemShow value={data.others} style={{ marginTop: fontScale(30), marginBottom: fontScale(30) }} title="Chi khác" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.others} width={width - fontScale(60)} />
                </ScrollView>
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default SalaryByMonthDashboard;