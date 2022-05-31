import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, Image } from 'react-native';
import { Body, DatePicker, GETable, Header, ListItem, Loading, MenuItem, MenuItemShow, TextAmount } from '../../../../../comps';
import { useNavigation } from '@react-navigation/core';
import { fontScale } from '../../../../../utils/Fonts';
import { width } from '../../../../../utils/Dimenssion';
import { colors } from '../../../../../utils/Colors';
import { styles } from './style';
import { images } from '../../../../../utils/Images';
import { changeTime, getMonth } from '../../../../../utils/Logistics';
import { check403, getKamPTRevenue } from '../../../../../api/emp';
import { showToast } from '../../../../../utils/toast';
import { _storeData } from '../../../../../utils/Storage';
import Toast from 'react-native-toast-message';

const KAMPT = (props) => {
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
        let res = await getKamPTRevenue(month)
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
            <Header title="DT TB do KAM PT thuộc tập DN giao" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(120)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body style={{ marginTop: fontScale(44) }} showInfo={false} />
            <View style={styles.body}>
                <MenuItemShow value={data.lastMonthTotal} style={{ marginTop: fontScale(25) }} title={"Doanh thu tháng " + lastMonth} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.ic_KAMPT1} width={width - fontScale(60)} />
                {/* --------------------- */}
                <View style={styles.bg}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1 / 2, fontSize: fontScale(18), fontWeight: "bold", marginBottom: fontScale(10), marginTop: fontScale(40), marginLeft: fontScale(10) }}>{"Doanh thu tháng " + currentMonth}</Text>
                        <Image source={images.ic_KAMPT2} style={{ width: fontScale(50), height: fontScale(50), position: "absolute", right: fontScale(30), top: -fontScale(23) }} resizeMode="contain" />
                        <Text style={{
                            flex: 1 / 2, fontSize: fontScale(18), fontWeight: "bold", marginBottom: fontScale(10), marginTop: fontScale(40), textAlign: "right",
                            marginRight: fontScale(30), color: "#35CBD6"
                        }}
                        >{data.curMonthTotal}</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{
                            flex: 2 / 3, fontSize: fontScale(18), fontWeight: "bold", marginBottom: fontScale(10), marginTop: fontScale(10),
                            marginLeft: fontScale(10), color: "#9E9898"
                        }}>Doanh thu từ tập TB chất lượng</Text>
                        <Text style={{
                            flex: 1 / 3, fontSize: fontScale(18), fontWeight: "bold", marginBottom: fontScale(10), marginTop: fontScale(10), textAlign: "right",
                            marginRight: fontScale(30), color: "#35CBD6"
                        }}
                        >{data.curMonthQual}</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{
                            flex: 2 / 3, fontSize: fontScale(18), fontWeight: "bold", marginBottom: fontScale(10), marginTop: fontScale(10),
                            marginLeft: fontScale(10), color: "#9E9898"
                        }}>Doanh thu từ tập TB không chất lượng (TS, TT ,Data)</Text>
                        <Text style={{
                            flex: 1 / 3, fontSize: fontScale(18), fontWeight: "bold", marginBottom: fontScale(10), marginTop: fontScale(10), textAlign: "right",
                            marginRight: fontScale(30), color: "#35CBD6"
                        }}
                        >{data.curMonthNonQual}</Text>
                    </View>
                </View>
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default KAMPT;