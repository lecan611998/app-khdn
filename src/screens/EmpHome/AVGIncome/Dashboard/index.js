import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView, Text, View, StatusBar } from 'react-native';
import { Body, DatePicker, Header, Loading, MenuItem, MenuItemShow, TextAmount } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { styles } from './style';
import { useNavigation } from '@react-navigation/core';
import { changeTime, getFMonth, getMonth, getTMonth } from '../../../../utils/Logistics';
import { check403, getAvgIncomeDashboard } from '../../../../api/emp';
import { showToast } from '../../../../utils/toast';
import Toast from 'react-native-toast-message';
import { _storeData } from '../../../../utils/Storage';

const AVGIncomeDashboard = (props) => {
    const [fromMonth, setFromMonth] = useState(moment(new Date()).subtract(1, 'months').format("MM/YYYY"));
    const [toMonth, setToMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getDatePikerValue = async () => {
        let fmonthStore = await getFMonth()
        let tmonthStore = await getTMonth()
        if (fmonthStore != undefined && tmonthStore == undefined) {
            setFromMonth(fmonthStore)
            getData(fmonthStore, toMonth)
        } else if (tmonthStore != undefined && fmonthStore == undefined) {
            setToMonth(tmonthStore)
            getData(fromMonth, tmonthStore)
        } else if (fmonthStore == undefined && tmonthStore == undefined) {
            getData(fromMonth, toMonth)
        } else {
            setFromMonth(fmonthStore)
            setToMonth(tmonthStore)
            getData(fmonthStore, tmonthStore)
        }
    }

    const getData = async (fromMonth, toMonth) => {
        setLoading(true)
        let res = await getAvgIncomeDashboard(fromMonth, toMonth)
        if (res.status == "success") {
            // showToast("success", "Th??nh c??ng", "L???y d??? li???u th??nh c??ng")
            if (res.data != undefined && res.data != null) {
                if (res.data.data != null && res.data.data != undefined) {
                    setData(res.data.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                    showToast("info", "Th??ng b??o", "Kh??ng c?? d??? li???u")
                }
            } else {
                setLoading(false)
                showToast("info", "Th??ng b??o", "Kh??ng c?? d??? li???u")
            }
        } else {
            setLoading(false)
            showToast("error", "L???i h??? th???ng", res.message)
            check403(res.error, navigation)
        }
    }

    const onChangeFromMonth = (date) => {
        let fMonth = new Date(changeTime(date))
        let tMonth = new Date(changeTime(toMonth))
        if (tMonth.getMonth() < fMonth.getMonth()) {
            setFromMonth(date)
            showToast("error", "L???i", "Th??ng tr?????c ???????c ch???n kh??ng th??? l???n h??n th??ng sau")
        } else {
            setData([])
            setFromMonth(date)
            getData(date, toMonth)
            _storeData("fmonth", date)
        }

    }
    const onChangeToMonth = (date) => {
        let fMonth = new Date(changeTime(fromMonth))
        let tMonth = new Date(changeTime(date))
        if (tMonth.getMonth() < fMonth.getMonth()) {
            setToMonth(date)
            showToast("error", "L???i", "Th??ng sau ???????c ch???n kh??ng th??? nh??? h??n th??ng tr?????c")
        } else {
            setData([])
            setToMonth(date)
            getData(fromMonth, date)
            _storeData("tmonth", date)
        }

    }

    useEffect(() => {
        navigation.addListener('focus', async () => {
            await getDatePikerValue()
        })
    })
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title="B??nh qu??n thu nh???p" />
            <View style={styles.dateContainer}>
                <View style={{ flex: 1 / 2 }}>
                    <DatePicker month={fromMonth} width={width / 2 - fontScale(20)} style={{ alignSelf: "center" }} onChangeDate={(date) => onChangeFromMonth(date)} />
                </View>
                <View style={{ flex: 1 / 2 }}>
                    <DatePicker month={toMonth} width={width / 2 - fontScale(20)} style={{ alignSelf: "center" }} onChangeDate={(date) => onChangeToMonth(date)} />
                </View>

            </View>
            <View>
                <Text style={{ textAlign: "center", top: fontScale(30), fontWeight: "bold", color: "#F8F8F8" }}>
                {data.notification}
                </Text>
            </View>
            <Body style={{ marginTop: fontScale(40) }} showInfo={false} />
            <View style={styles.body}>
                <TextAmount text="B??nh qu??n Thu: " number={data.totalIncome} />
                <MenuItemShow value={data.totalFixedSalary} style={{ marginTop: fontScale(40) }} title="B??nh qu??n l????ng c??? ?????nh" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.fixedwage} width={width - fontScale(60)} />
                <MenuItem value={data.totalProductSalary} style={{ marginTop: fontScale(50) }} title="B??nh qu??n l????ng s???n ph???m" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.product} width={width - fontScale(60)} onPress={() => navigation.navigate("TotalProductwage")} />
                <MenuItemShow value={data.totalOutcomeSalary} style={{ marginTop: fontScale(50) }} title="B??nh qu??n chi th?????ng v?????t KH th??ng" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.planout} width={width - fontScale(60)} />
                <MenuItemShow value={data.totalOther} style={{ marginTop: fontScale(50) }} title="B??nh qu??n chi kh??c" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.others} width={width - fontScale(60)} />
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default AVGIncomeDashboard;