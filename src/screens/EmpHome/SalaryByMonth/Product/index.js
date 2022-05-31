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
import { _storeData } from '../../../../utils/Storage';
import { showToast } from '../../../../utils/toast';
import { getMonth } from '../../../../utils/Logistics';
import Toast from 'react-native-toast-message';
import { check403, getProductSalary } from '../../../../api/emp';

const Product = (props) => {
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
        let res = await getProductSalary(month)
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
            <Header title="Lương sản phẩm" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(120)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body style={{ marginTop: fontScale(44) }} showInfo={false} />
            <View style={styles.body}>
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

export default Product;