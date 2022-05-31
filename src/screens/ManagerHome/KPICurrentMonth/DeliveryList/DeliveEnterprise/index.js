import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StatusBar, View, FlatList } from 'react-native';
import { Body, DatePicker, Header, Loading } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import { showToast } from '../../../../../utils/toast';
import { check403 } from '../../../../../api/emp';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { styles } from './stytes';
import { changeTime } from '../../../../../utils/Logistics';
import DEItem from './DeItem';
import { getListDeliveEnterprise } from '../../../../../api/manager';
import { _storeData } from '../../../../../utils/Storage';

const DeliveEnterprise = (props) => {
    const navigation = useNavigation();
    const [month, setMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [lastMonth, setLastMonth] = useState(new Date().getMonth());
    const onChangeDatePicker = (date) => {
        var d = new Date(changeTime(date))
        setCurrentMonth(d.getMonth() + 1)
        d.setMonth(d.getMonth() - 1);
        setLastMonth(d.getMonth() + 1)

        setData([])
        setMonth(date)
        getData(date)
    }
    const getData = async (month) => {
        setLoading(true)
        let res = await getListDeliveEnterprise(month)
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
    const onPressItem = async (code) => {
        // console.log(code)
        await _storeData("code", code)
        await _storeData("monthDetail", month)
        navigation.navigate("DeliveEnterpriseDetail")
    }
    useEffect(() => {
        navigation.addListener('focus', async () => {
            await getData(month)
        }, [])
    })
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar translucent={true} backgroundColor={colors.primary} />
            <Header title="Doanh nghiệp giao" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(140)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body />
            <View style={styles.body}>
                {
                    data.length == 0 && loading == false ?
                        <Text style={{ textAlign: "center" }}>Không có dữ liệu</Text>
                        :
                        <View >
                            {
                                loading == true ? null :
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ flex: 3 / 10 }}></Text>
                                        <Text style={{ flex: 2 / 10, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17), textAlign: "center" }}>Tháng {lastMonth}</Text>
                                        <Text style={{ flex: 2 / 10, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17), textAlign: "center" }}>Tháng {currentMonth}</Text>
                                        <Text style={{ flex: 2 / 10, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17), textAlign: "center" }}>Biến động</Text>
                                        <Text style={{ flex: 1 / 10, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17), textAlign: "center" }}></Text>
                                    </View>
                            }

                            <FlatList
                                data={data}
                                style={{ marginTop: fontScale(10), marginBottom: fontScale(30) }}
                                keyExtractor={(item, key) => key.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <DEItem name={item.name} preMonth={item.preMonth} curMonth={item.curMonth} difference={item.difference} type={item.type} onPress={onPressItem} code={item.code} />
                                    )

                                }}
                            />

                        </View>
                }
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default DeliveEnterprise;