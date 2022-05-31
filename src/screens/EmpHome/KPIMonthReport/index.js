import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { Body, DatePicker, Header, ListItem, Loading } from '../../../comps';
import { useNavigation } from '@react-navigation/core';
import { fontScale } from '../../../utils/Fonts';
import { width } from '../../../utils/Dimenssion';
import { colors } from '../../../utils/Colors';
import { styles } from './style';
import { images } from '../../../utils/Images';
import { getKPIMonthReport, check403 } from '../../../api/emp';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { _storeData } from '../../../utils/Storage';
import { showToast } from '../../../utils/toast';
import { changeTime } from '../../../utils/Logistics';

const KPIMonthReport = (props) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [month, setMonth] = useState(moment(new Date()).subtract(1, 'months').format("MM/YYYY"));
    const [loading, setLoading] = useState(true);
    const [curMonth, setCurMonth] = useState(new Date(changeTime(month)).getMonth() + 1)
    const [befMonth, setBefMonth] = useState(new Date(changeTime(month)).getMonth())


    const getData = async (month) => {
        setLoading(true)
        let res = await getKPIMonthReport(month)
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
        setCurMonth(new Date(changeTime(date)).getMonth() + 1)
        if (new Date(changeTime(date)).getMonth() == 0) {
            setBefMonth(12)
        } else {
            setBefMonth(new Date(changeTime(date)).getMonth())
        }

        _storeData("month", date)
    }

    useEffect(() => {
        navigation.addListener('focus', async () => {
            await getData(month)
        })
    })
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title="Báo cáo KPI tháng" />

            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(120)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>

            <Body style={{ marginTop: fontScale(30) }} showInfo={false} />

            <ScrollView style={styles.body}>
                <View style={styles.bg}>
                    <ListItem isFather={true} icon={images.newSubTotal} title="Chỉ tiêu phát triển mới TB: " price={data.newSubTotal} />
                    <View style={{ marginLeft: 10 }}>
                        <ListItem isChild={true} icon={images.none} title="Kế hoạch giao" price={data.newSubTarget} />
                        <ListItem isChild={true} icon={images.none} title="SLTB chất lượng thực hiện" price={data.newSubAmount} />
                        <ListItem isChild={true} icon={images.none} title="% hoàn thành kế hoạch" price={data.newSubCompletePercent} />
                    </View>
                    <ListItem isFather={true} icon={images.growthTotal} title="Chỉ tiêu tăng trưởng doanh thu:" price={data.growthTotal} />
                    <View style={{ marginLeft: 10 }}>
                        <ListItem isChild={true} icon={images.none} title="Kế hoạch giao" price={data.growthTarget} />
                        <ListItem isChild={true} icon={images.none} title={"Doanh thu tháng " + befMonth} price={data.growthMonth} />
                        <ListItem isChild={true} icon={images.none} title={"Doanh thu tháng " + curMonth} price={data.growthIncome} />
                        <ListItem isChild={true} icon={images.none} title={"Tỉ lệ doanh thu tháng " + curMonth + " & " + befMonth} price={data.growthMonthRatio} />
                        <ListItem isChild={true} icon={images.none} title="% hoàn thành kế hoạch" price={data.growthCompletePercent} />
                    </View>
                    <ListItem isFather={true} icon={images.totalOTarget} title="Chỉ tiêu điều hành_CTĐH:" price={data.totalOTarget} />
                    <View style={{ marginLeft: 10 }}>
                        <ListItem icon={images.none} title="Chỉ tiêu PTM doanh nghiệp:" price={data.totalOTnewSub} />
                        <View style={{ marginLeft: 15 }}>
                            <ListItem isChild={true} icon={images.none} title="Kế hoạch giao" price={data.totalOTtarget} />
                            <ListItem isChild={true} icon={images.none} title="DNPTM có 1 TB phát sinh cước" price={data.totalNewEnterpriseSub} />
                            <ListItem isChild={true} icon={images.none} title="% hoàn thành kế hoạch" price={data.totalOTcompletePercent} />
                        </View>
                        <ListItem icon={images.none} title="Chỉ tiêu tăng trưởng DTVT:" price={data.growthTeleTotal} />
                        <View style={{ marginLeft: 15 }}>
                            <ListItem isChild={true} icon={images.none} title="Kế hoạch giao" price={data.growthTeleTotalTarget} />
                            <ListItem isChild={true} icon={images.none} title={"Doanh thu tháng " + befMonth} price={data.growthTeleMonth} />
                            <ListItem isChild={true} icon={images.none} title={"Doanh thu tháng " + curMonth} price={data.growthTeleTotalIncome} />
                            <ListItem isChild={true} icon={images.none} title={"Tăng trưởng DT tháng " + curMonth + " & " + befMonth} price={data.growthTeleMonthRatio} />
                            <ListItem isChild={true} icon={images.none} title="% hoàn thành kế hoạch" price={data.growthTeleTotalCompletePercent} />
                        </View>
                        <ListItem icon={images.none} title="BQ % HT chỉ tiêu điều hành:" price={data.avgTarget} />
                    </View>
                    <ListItem isFather={true} icon={images.totalKPI} title="Tổng KPI khoán sản phẩm:" price={data.totalKPI} />
                </View>
            </ScrollView>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default KPIMonthReport;