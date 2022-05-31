import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { Body, DatePicker, GETable, Header, ListItem, Loading, MenuItem, MenuItemShow, TextAmount } from '../../../../comps';
import { useNavigation } from '@react-navigation/core';
import { fontScale } from '../../../../utils/Fonts';
import { width } from '../../../../utils/Dimenssion';
import { colors } from '../../../../utils/Colors';
import { styles } from './style';
import { images } from '../../../../utils/Images';
import { showToast } from '../../../../utils/toast';
import { check403, getTotalProductSalary } from '../../../../api/emp';
import Toast from 'react-native-toast-message';
import { getFMonth, getTMonth } from '../../../../utils/Logistics';
import { _storeData } from '../../../../utils/Storage';

const TotalProductwage = (props) => {
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
        let res = await getTotalProductSalary(fromMonth, toMonth)
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

    const onChangeFromMonth = (date) => {
        // let fMonth = new Date(changeTime(date))
        // let tMonth = new Date(changeTime(toMonth))
        // if (tMonth.getMonth() < fMonth.getMonth()) {
        //     setFromMonth(fromMonth)
        //     showToast("error", "Lỗi", "Tháng trước được chọn không thể lớn hơn tháng sau")
        // } else {
        setData([])
        setFromMonth(date)
        getData(date, toMonth)
        // }
        _storeData("fmonth", date)
    }

    const onChangeToMonth = (date) => {
        // let fMonth = new Date(changeTime(fromMonth))
        // let tMonth = new Date(changeTime(date))
        // if (tMonth.getMonth() < fMonth.getMonth()) {
        //     showToast("error", "Lỗi", "Tháng sau được chọn không thể nhỏ hơn tháng trước")
        // } else {
        setData([])
        setToMonth(date)
        getData(fromMonth, date)
        // }
        _storeData("tmonth", date)
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
            <Header title="Bình quân lương sản phẩm" />
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
            <Body style={{ marginTop: fontScale(44) }} showInfo={false} />
            <View style={styles.body}>
                <TextAmount text="Bình quân lương Sp: " number={data.totalProductSalary} />
                <View style={styles.bg}>
                    <View style={{ marginTop: fontScale(20) }}>
                        <ListItem isFather={true} icon={images.growthenterprise} title="CP phát triển mới: " price=" " />
                        <View style={{ marginLeft: fontScale(5) }}>
                            <ListItem icon={images.none} title="Đợt 1: " price={data.newPhase1} />
                            <ListItem icon={images.none} title="Đợt 2: " price={data.newPhase2} />
                            <ListItem icon={images.none} title="Đợt 3: " price={data.newPhase3} />
                        </View>
                        <ListItem isFather={true} icon={images.dataIncentive} title="CP duy trì: " price={data.maintain} />
                        <ListItem isFather={true} icon={images.telecommunicationrevenue} title="CP dịch vụ viễn thông: " price={data.telecomService} />
                        <ListItem isFather={true} icon={images.machineSelling} title="CP khuyến khích data: " price={data.dataIncentive} />
                        <ListItem isFather={true} icon={images.maintain} title="CP bán máy: " price={data.machineSelling} />
                        <ListItem isFather={true} icon={images.change4Gsim} title="CP thay sim 4G: " price={data.change4GSim} />
                    </View>
                </View>
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default TotalProductwage;