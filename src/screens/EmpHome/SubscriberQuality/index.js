import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Body, DatePicker, Header, ListItem, Loading } from '../../../comps';
import { useNavigation } from '@react-navigation/core';
import { fontScale } from '../../../utils/Fonts';
import { width } from '../../../utils/Dimenssion';
import { colors } from '../../../utils/Colors';
import { styles } from './style';
import { images } from '../../../utils/Images';
import { showToast } from '../../../utils/toast';
import Toast from 'react-native-toast-message';
import { check403, getSubscriberQuality } from '../../../api/emp';

const SubscriberQuality = (props) => {
    const [beginMonth, setMonth] = useState('01' + '/' + moment(new Date()).format("YYYY"));
    const [sMonth, setSMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        setLoading(true)
        let res = await getSubscriberQuality()
        if (res.status == "success") {
            // showToast("success", "Thành công", "Lấy dữ liệu thành công")
            if (res.data != undefined && res.data != null) {
                if (res.data.data != null && res.data.data != undefined) {
                    setData(res.data.data)
                    setMonth(res.data.data.beginMonth)
                    setSMonth(res.data.data.endMonth)
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
    useEffect(() => {
        navigation.addListener('focus', async () => {
            await getData()
        })
    })
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title="Chất lượng tập TB phát triển" />
            <View style={styles.dateContainer}>
                <View style={{ flex: 1 / 2 }}>
                    <DatePicker disable={true} month={beginMonth} width={width / 2 - fontScale(25)} style={{ alignSelf: "center" }} />
                </View>
                <View style={{ flex: 1 / 2 }}>
                    <DatePicker disable={true} month={sMonth} width={width / 2 - fontScale(25)} style={{ alignSelf: "center" }} />
                </View>
            </View>
            <Body style={{ marginTop: fontScale(69) }} showInfo={false} />
            <View style={styles.body}>
                <View style={styles.bg}>
                    <View style={{ marginVertical: 15, marginHorizontal: 5 }}>
                        <ListItem icon={images.debtPercent} title="Tỉ lệ nợ / doanh thu" price={data.debtPercent} />
                        <View style={{ marginLeft: 20 }}>
                            <ListItem icon={images.totalDebtNinety} title="Tổng nợ >= 90 ngày" price={data.totalDebtNinety} />
                            <ListItem icon={images.totalRevenue} title="Tổng doanh thu" price={data.totalRevenue} />
                        </View>
                        <ListItem icon={images.newSubPrePaid} title="Tổng TBTS PTM" price={data.newSubPrePaid} />
                        <View style={{ marginLeft: 20 }}>
                            {/* <ListItem icon={images.revokeAmount} title="TBTS cắt hủy" price={data.revokeAmount} /> */}
                            <ListItem icon={images.denyTwoC} title="TB thoại cắt hủy sai quy định" price={data.subRegu} />
                            <ListItem icon={images.preToPostPaid} title="TB thoại cắt hủy đúng quy định" price={data.subImpro} />
                            <ListItem icon={images.denyTwoC} title="TB data cắt hủy sai quy định" price={data.subDataRegu} />
                            <ListItem icon={images.preToPostPaid} title="TB data cắt hủy đúng quy định" price={data.subDataImpro} />
                            
                        </View>
                        <ListItem icon={images.contractdebt} title="Nợ hợp đồng" price={data.contractDebt} />
                    </View>
                </View>
            </View>
            <Loading loading={loading} />

        </SafeAreaView>
    );
}

export default SubscriberQuality;