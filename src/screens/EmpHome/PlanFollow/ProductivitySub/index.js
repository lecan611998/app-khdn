import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, Image, FlatList } from 'react-native';
import { Body, DatePicker, GenaralItem, Header, Loading } from '../../../../comps';
import { useNavigation } from '@react-navigation/core';
import { fontScale } from '../../../../utils/Fonts';
import { width } from '../../../../utils/Dimenssion';
import { colors } from '../../../../utils/Colors';
import { styles } from './style';
import { images } from '../../../../utils/Images';
import { getMonth } from '../../../../utils/Logistics';
import { _storeData } from '../../../../utils/Storage';
import { showToast } from '../../../../utils/toast';
import Toast from 'react-native-toast-message';
import { check403, getProductivitySub } from '../../../../api/emp';

const ProductivitySub = (props) => {
    const navigation = useNavigation();
    const [month, setMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
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
        let res = await getProductivitySub(month)
        if (res.status == "success") {
            // showToast("success", "Thành công", "Lấy dữ liệu thành công")
            if (res.data != undefined && res.data != null) {
                if (res.data.data != null && res.data.data != undefined) {
                    setData(res.data.data)
                    // console.log(res.data.data)
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
    const checkIcon = (icon) => {
        if (icon == "AM/KAM") {
            return images.AM_KAM
        } else if (icon == "CH") {
            return images.store
        } else if (icon == "CN") {
            return images.branch
        } else if (icon == "CTY") {
            return images.company
        } else {
            return images.none
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title="Năng suất bình quân" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(120)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body style={{ marginTop: fontScale(44) }} showInfo={false} />
            <View style={styles.body}>
                <FlatList
                    data={data}
                    keyExtractor={(item, key) => key.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <GenaralItem shopName={item.shopName}
                                icon={checkIcon(item.shopType)}
                                standardSub={item.standardSub} realSub={item.realSub}
                                standardRevenue={item.standardRevenue} realRevenue={item.realRevenue} />
                        )
                    }}
                />
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default ProductivitySub;