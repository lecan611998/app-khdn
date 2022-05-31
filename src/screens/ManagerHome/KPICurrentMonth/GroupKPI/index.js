import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StatusBar, View, FlatList } from 'react-native';
import { Body, DatePicker, Header, Loading } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import { width } from '../../../../utils/Dimenssion';
import { styles } from './stytes';
import { fontScale } from '../../../../utils/Fonts';
import GroupKPIItem from '../../../../comps/groupKPIItem';
import { showToast } from '../../../../utils/toast';
import { check403 } from '../../../../api/emp';
import { getListGroupKPI } from '../../../../api/manager';
const GroupKPI = (props) => {
    const navigation = useNavigation();
    const [month, setMonth] = useState(moment(new Date()).subtract(0, 'months').format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const getData = async (month) => {
        setLoading(true)
        let res = await getListGroupKPI(month)
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
        // _storeData("month", date)
    }
    useEffect(() => {
        navigation.addListener('focus', async () => {
            await getData(month)
        })
    })
    return (
        <SafeAreaView style={styles.container}>
            <Toast style={{ position: "absolute", zIndex: 100 }} ref={(ref) => Toast.setRef(ref)} />
            <StatusBar translucent={true} backgroundColor={colors.primary} />
            <Header title="Nhóm KPI" />
            <View style={{ alignSelf: "center" }}>
                <DatePicker month={month} width={width - fontScale(140)} onChangeDate={(date) => onChangeDatePicker(date)} />
            </View>
            <Body />
            <View style={styles.body}>

                {
                    data.length == 0 && loading == false ?
                        <Text style={{ textAlign: "center" }}>Không có dữ liệu</Text>
                        :
                        <>
                            {
                                loading == true ? null :
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ flex: 2 / 7 }}></Text>
                                        <Text style={{ flex: 1 / 7, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17), textAlign: "center" }}>{"≥ 100%"}</Text>
                                        <Text style={{ flex: 1 / 7, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17), textAlign: "center" }}>{"≥ 90%"}</Text>
                                        <Text style={{ flex: 1 / 7, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17), textAlign: "center" }}>{"≥ 70%"}</Text>
                                        <Text style={{ flex: 1 / 7, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17), textAlign: "center" }}>{"< 70%"}</Text>
                                        <Text style={{ flex: 1 / 7, color: "#00BECC", fontWeight: "bold", fontSize: fontScale(17), textAlign: "center" }}>{"Tổng"}</Text>
                                    </View>
                            }
                            <FlatList
                                data={data}
                                style={{ marginTop: fontScale(10) }}
                                keyExtractor={(item, key) => key.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <GroupKPIItem name={item.name} kpi100={item.kpi100} kpi90={item.kpi90} kpi70={item.kpi70} kpilow={item.kpilow} total={item.total} type={item.type} />
                                    )

                                }}
                            />
                        </>
                }

            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
}

export default GroupKPI;