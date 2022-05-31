import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { Body, DatePicker, GETable, Header, ListItem, Loading, MenuItem, MenuItemShow, TextAmount } from '../../../../../comps';
import { useNavigation } from '@react-navigation/core';
import { fontScale } from '../../../../../utils/Fonts';
import { width } from '../../../../../utils/Dimenssion';
import { colors } from '../../../../../utils/Colors';
import { styles } from './style';
import { images } from '../../../../../utils/Images';
import { showToast } from '../../../../../utils/toast';
import { _storeData } from '../../../../../utils/Storage';
import Toast from 'react-native-toast-message';
import { changeTime, getMonth } from '../../../../../utils/Logistics';
import { check403, getDeliverySubAmount } from '../../../../../api/emp';

const DeliveSubsciberAmount = (props) => {
    const navigation = useNavigation();
    const [month, setMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [lastMonth, setLastMonth] = useState(new Date().getMonth());

    const getDatePikerValue = async () => {
        let monthStore = await getMonth()
        if (monthStore != undefined) {
            setMonth(monthStore)
            getData(monthStore)
            var d = new Date(changeTime(monthStore))
            setCurrentMonth(d.getMonth() + 1)
            d.setMonth(d.getMonth() - 1);
            setLastMonth(d.getMonth() + 1)
        } else {
            getData(month)
            var d = new Date(changeTime(month))
            setCurrentMonth(d.getMonth() + 1)
            d.setMonth(d.getMonth() - 1);
            setLastMonth(d.getMonth() + 1)
        }
    }

    const getData = async (month) => {
        setLoading(true)
        let res = await getDeliverySubAmount(month)
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
        var d = new Date(changeTime(date))
        setCurrentMonth(d.getMonth() + 1)
        d.setMonth(d.getMonth() - 1);
        setLastMonth(d.getMonth() + 1)

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
            <Header title="Số lượng TB thuộc tập DN đang giao" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(120)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body style={{ marginTop: fontScale(30) }} showInfo={false} />
            <ScrollView style={styles.body}>
                <View style={styles.bg}>
                    <View style={{ marginTop: fontScale(20) }}>
                        <ListItem isFather={true} icon={images.icon_delivesubsciberamount1} title={"TB còn trên mạng tháng " + lastMonth + ": "} price={data.length != 0 ? data.lastMonthRemain : "0"} />
                        <View style={{ marginLeft: fontScale(5) }}>
                            <ListItem icon={images.none} title="TB chất lượng: " price={data.length != 0 ? data.lastMonthQualSub : "0"} />
                            <ListItem icon={images.none} title="TB không chất lượng: " price={data.length != 0 ? data.lastMonthNonQualSub : "0"} />
                            <View style={{ marginLeft: fontScale(20) }}>
                                <ListItem isChild={true} icon={images.none} title="TBTS: " price={data.length != 0 ? data.lastMonthPostPaid : "0"} />
                                <ListItem isChild={true} icon={images.none} title="TBTT: " price={data.length != 0 ? data.lastMonthPrePaid : "0"} />
                                <ListItem isChild={true} icon={images.none} title="TB Data: " price={data.length != 0 ? data.lastMonthDataPaid : "0"} />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: fontScale(5) }}>
                        <ListItem isFather={true} icon={images.icon_delivesubsciberamount1} title={"TB còn trên mạng tháng " + currentMonth + ": "} price={data.length != 0 ? data.currMonthRemain : "0"} />
                        <View style={{ marginLeft: fontScale(5) }}>
                            <ListItem icon={images.none} title="TB chất lượng: " price={data.length != 0 ? data.currMonthQualSub : "0"} />
                            <ListItem icon={images.none} title="TB không chất lượng: " price={data.length != 0 ? data.currMonthNonQualSub : "0"} />
                            <View style={{ marginLeft: fontScale(20) }}>
                                <ListItem isChild={true} icon={images.none} title="TBTS: " price={data.length != 0 ? data.currMonthPostPaid : "0"} />
                                <ListItem isChild={true} icon={images.none} title="TBTT: " price={data.length != 0 ? data.currMonthPrePaid : "0"} />
                                <ListItem isChild={true} icon={images.none} title="TB Data: " price={data.length != 0 ? data.currMonthDataPaid : "0"} />
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default DeliveSubsciberAmount;